from rest_framework import permissions
from custom_admin.AWS.cloudwatch_error_logging import log_authentication_issue
from django.contrib.auth.models import AnonymousUser

class IsAdminUser(permissions.BasePermission):
    """
    Custom permission to only allow users with 'admin' role to access the view.

    This permission checks if the user is authenticated and if their user_role is 'admin'. 
    If the user does not have the 'admin' role, it logs an authentication issue and denies access.

    Method:
    - has_permission: Returns True if the user is authenticated and has the 'admin' role; otherwise False.
    
    """
    def has_permission(self, request, view):
        user = request.user
        
        # Check if the user is authenticated and has the 'admin' role
        if user.is_authenticated and not isinstance(user, AnonymousUser) and user.roles == 'admin':
            return True
        elif not isinstance(user, AnonymousUser):
            # Log the failed attempt for authenticated users without the 'admin' role
            log_authentication_issue(
                "Admin access denied",
                custom_tags="admin permission class",
                details={
                    'user_email': user.email,
                    'attempted_access': view.__class__.__name__,
                },
                request=request
            )
        # If user is AnonymousUser or doesn't have the 'admin' role, deny access
        return False

class IsSuperAdminUser(permissions.BasePermission):
    """
    Custom permission to only allow super admin users to access the view.

    This permission checks if the user is authenticated and if the is_super_user attribute is True.

    Method:
    - has_permission: Returns True if the user is authenticated and is marked as a super admin; otherwise False.
    
    """
    def has_permission(self, request, view):
        # Checking if the is_super_user attribute is in the token and is True
        return request.user.is_authenticated and getattr(request.user, 'is_super_user', False)
