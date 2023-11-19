from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import IsAdminUser
from user.authenticate import CustomAuthentication

class AdminOnlyPagesAuthCheckView(APIView):
    """
    A view that checks if the requesting user has administrative privileges.

    Inherits from APIView and uses CustomAuthentication for authentication
    and IsAdminUser for permission checking.
    """
    authentication_classes = [CustomAuthentication]
    permission_classes = [IsAdminUser]

    def post(self, request):
        """
        Handles POST requests.

        Returns a response indicating if the user has admin privileges.

        Args:
        - request: The incoming HTTP request.

        Returns:
        - Response: A Response object with the appropriate status and detail.
        """
        # The code reaches here only if the user is authenticated and has admin access.
        return Response({'detail': 'You have admin privileges.'}, status=status.HTTP_200_OK)
