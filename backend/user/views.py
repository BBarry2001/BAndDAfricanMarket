from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import TokenBlacklist, User
from .serializers import UserLoginSerializer, UserRegistrationSerializer
from django_ratelimit.decorators import ratelimit
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from django.db import DatabaseError
from django.conf import settings
from .authenticate import CustomAuthentication, AllowAll
from custom_admin.utils import set_token_cookies
from django.utils.decorators import method_decorator
from custom_admin.AWS.cloudwatch_activity_logging import log_admin_actions, log_user_creation
from custom_admin.AWS.cloudwatch_error_logging import log_authentication_issue
from django.http import JsonResponse
import traceback
from rest_framework import exceptions

class CustomLogin(APIView):
    """
    Custom login view for user authentication.

    Attributes:
    -----------
    - serializer_class: Serializer used for validating user credentials.
    - permission_classes: Permissions required to access this view. Set to AllowAny to permit all users.
    - authentication_classes: Authentication classes used for this view. Set to AllowAll for this endpoint.

    Methods:
    --------
    - post(request): Handles POST requests for user authentication.
    
    Logging:
    --------
    - Logs various non-user related, system-related issues to AWS CloudWatch.
    - Logs are specifically focused on admin actions for monitoring and auditing purposes.
    """
    
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]
    authentication_classes = [AllowAll] 

    @method_decorator(ratelimit(key='ip', rate='10/m', method='POST'))
    def post(self, request):
        """
        Authenticates a user based on email and password.

        Parameters:
        -----------
        - request: The HTTP request object containing user credentials.

        Returns:
        --------
        - JsonResponse: Contains user's access and refresh tokens along with basic user information upon successful authentication.
        - Response: Error response in case of failed authentication or exceptions.
        """
        try:
            serializer = UserLoginSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            
            try:
                user = User.objects.get(email=email)
            except MultipleObjectsReturned:
                log_authentication_issue("Multiple users with the same email", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, custom_tags='user authentication views', details={'email': email}, request=request)
                return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_401_UNAUTHORIZED) 
            except DatabaseError:
                log_authentication_issue("Database Error occurred while fetching user", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, custom_tags='user authentication views', details={'email': email}, request=request)
                return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            try:
                is_correct_password = user.check_password(password)
            except AttributeError:
                log_authentication_issue("Attribute Error: check_password not found", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, custom_tags='user authentication views', details={'email': email}, request=request)
                return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            if is_correct_password:
                try:
                    token_instance = RefreshToken.for_user(user)
                    for key, value in user.token_payload.items():
                        token_instance[key] = value
                    
                    access_token_str = str(token_instance.access_token)
                    refresh_token_str = str(token_instance)
                except TypeError:
                    log_authentication_issue("Type Error occurred while generating tokens", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, custom_tags='user authentication views', details={'email': email}, request=request)
                    return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                if user.is_superuser:
                    details = {
                        'email': email,
                        'is_successful': True
                    }
                    log_admin_actions(admin_user=user, action_type='Admin Login', level='INFO', details=details, request=request)

                response_data = {
                'access_token': access_token_str,
                'refresh_token': refresh_token_str,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'is_admin': user.roles == 'admin'  
                }

                response = JsonResponse(response_data, status=status.HTTP_200_OK)
                set_token_cookies(response, access_token_str, refresh_token_str)  

                return response

            return Response(status=status.HTTP_401_UNAUTHORIZED) 

        except Exception as e:
            error_message = "An unexpected error occurred in CustomLogin."
            details = {
                "error": str(e),
                "traceback": traceback.format_exc()
            }
            log_authentication_issue(error_message, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, custom_tags='user authentication views', details=details, request=request, exc_info=e)
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CustomLogout(APIView):
    """
    Custom logout view for terminating user sessions.

    Attributes:
    -----------
    - permission_classes: Permissions required to access this view. Set to IsAuthenticated to permit only authenticated users.
    - authentication_classes: Authentication classes used for this view. Set to CustomAuthentication for this endpoint.

    Methods:
    --------
    - post(request): Handles POST requests for user logout.
    
    Logging:
    --------
    - Logs admin logout actions to AWS CloudWatch for monitoring and security purposes.
    """
    
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomAuthentication]

    def post(self, request):
        """
        Logs out a user by blacklisting their tokens.

        Parameters:
        -----------
        - request: The HTTP request object of the user.

        Returns:
        --------
        - Response: A response object indicating successful logout.
        """
        
        response = Response(status=status.HTTP_204_NO_CONTENT)
        
        custom_auth = CustomAuthentication()

        # Attempt to blacklist the access token
        access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        if access_token:
            try:
                # Verify the access token first
                validated_access_token = custom_auth.get_validated_token(access_token)
                TokenBlacklist.blacklist(validated_access_token)
            except exceptions.AuthenticationFailed:
                # Token was invalid, but we can still proceed with logout
                pass
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'], path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'])

        # Attempt to blacklist the refresh token
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['REFRESH_TOKEN_COOKIE'])
        if refresh_token:
            try:
                # Verify the refresh token first
                validated_refresh_token = custom_auth.get_validated_token(refresh_token)
                TokenBlacklist.blacklist(validated_refresh_token)
            except exceptions.AuthenticationFailed:
                # Token was invalid, but we can still proceed with logout
                pass
            response.delete_cookie(settings.SIMPLE_JWT['REFRESH_TOKEN_COOKIE'], path=settings.SIMPLE_JWT['REFRESH_COOKIE_PATH'])

        return response

class UserRegistration(APIView):
    """
    User registration view for new user sign-ups.

    Attributes:
    -----------
    - serializer_class: Serializer used for handling user registration data.
    - permission_classes: Permissions required to access this view. Set to AllowAny to permit all users to register.
    - authentication_classes: Authentication classes used for this view. Set to AllowAll as no prior authentication is needed for registration.

    Methods:
    --------
    - post(request): Handles POST requests for user registration.

    Logging:
    --------
    - Logs user creation details to AWS CloudWatch, focusing on the source of registration and user information for monitoring purposes.
    """
    
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    authentication_classes = [AllowAll] 

    @method_decorator(ratelimit(key='ip', rate='10/m', method='POST', block=True))
    def post(self, request):
        """
        Registers a new user based on the provided data.

        Parameters:
        -----------
        - request: The HTTP request object containing the new user's data.

        Returns:
        --------
        - JsonResponse: Contains newly generated JWT tokens and basic user information upon successful registration.
        - Response: Error response in case of invalid data or registration errors.
        """
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Log user creation
            details = {'email': user.email}
            log_user_creation(user=user, source='API Registration', level='INFO', details=details, request=request)
            
            # Generate JWT Refresh and Access tokens
            token_instance = RefreshToken.for_user(user)
            for key, value in user.token_payload.items():
                token_instance[key] = value
            
            access_token_str = str(token_instance.access_token)
            refresh_token_str = str(token_instance)
            
            # Set cookies for the tokens
            response_data = {
                'refresh': refresh_token_str,
                'access': access_token_str,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }

            response = JsonResponse(response_data, status=status.HTTP_201_CREATED)
            set_token_cookies(response, access_token_str, refresh_token_str)  # Use the utility function

            return response
        else:
            errors = serializer.errors

            detail_errors = {}
            if 'email' in errors:
                detail_errors['email'] = errors['email'][0]
            if 'phone_number' in errors:
                detail_errors['phone_number'] = errors['phone_number'][0]
            
            if detail_errors:
                return Response({'detail': detail_errors}, status=status.HTTP_409_CONFLICT)
            else:
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)
