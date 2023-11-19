from django.urls import path
from rest_framework.routers import DefaultRouter
from .viewsets import UserViewSet
from .views import AdminOnlyPagesAuthCheckView

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    # This URL pattern is for checking/confirming administrative privileges.
    # It maps to the AdminOnlyPagesAuthCheckView which verifies if the user has admin access.
    path('admin-only-pages-auth-check/', AdminOnlyPagesAuthCheckView.as_view(), name='admin-action-checker'),
] + router.urls
