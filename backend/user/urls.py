from django.urls import path
from . import views

# URL configuration for the User app
urlpatterns = [
    path('login/', views.CustomLogin.as_view(), name='user-login'), # Endpoint for user login
    path('register/', views.UserRegistration.as_view(), name='user-register'), # Endpoint for user registration
    path('logout/', views.CustomLogout.as_view(), name='user-logout'), # Endpoint for user logout
]
