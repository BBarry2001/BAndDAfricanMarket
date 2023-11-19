from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import viewsets

router = DefaultRouter()
# Registers the ProductViewSet for handling requests related to products
router.register(r'products_viewsets', viewsets.ProductViewSet)
# Registers the CategoryViewSet for handling requests related to product categories
router.register(r'categories', viewsets.CategoryViewSet)

urlpatterns = [
    # Includes the URL patterns from the registered viewsets.
    path('', include(router.urls)),
]
