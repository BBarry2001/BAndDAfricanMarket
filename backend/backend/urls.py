# URL configuration for the backend project.

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Admin URL for Django's default admin interface. changed it because i wanted to use the "admin" url
    path('django-admin/', admin.site.urls), 

    # URL patterns for user-related routes
    path('user/', include('user.urls')),

    # URL patterns for custom admin functionalities
    path('admin/', include('custom_admin.urls')),

    # URL patterns for product-related routes
    path('products/', include('products.urls')),

    # URL patterns for shopping cart functionalities
    path('cart/', include('cart.urls')),
]

# Static media URL patterns
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
