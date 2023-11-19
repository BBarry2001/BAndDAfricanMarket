# Defines URL patterns for cart-related operations using Django Rest Framework's router.

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import viewsets

# Setting up a router for cart operations
router = DefaultRouter()
router.register(r'cart_operations', viewsets.CartAPIView)

urlpatterns = [
    # Including the router's URLs into the urlpatterns
    path('', include(router.urls)),
]
