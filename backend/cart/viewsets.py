from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import CartItem
from products.models import Product
from .serializers import CartItemSerializer  
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404 
from rest_framework.decorators import action
from django.db.models import F
from django.core.cache import cache
from django.db.utils import IntegrityError

class CartAPIView(viewsets.ModelViewSet):
    """
    ViewSet for managing user's shopping cart.

    Supports adding, removing, and updating items in the cart, as well as
    clearing the entire cart. Utilizes caching to improve performance.
    """

    queryset = CartItem.objects.all().order_by('-date_added')
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Override get_queryset to retrieve the cart items for the authenticated user.
        Uses caching to store and retrieve the user's cart.
        """
        user = self.request.user
        cache_key = f'cart_{user.id}'
        cached_cart = cache.get(cache_key)
        
        if cached_cart:
            return cached_cart
        else:
            cart = CartItem.objects.filter(user=user).order_by('-date_added')
            cache.set(cache_key, cart)
            return cart

    @action(detail=False, methods=['POST'], url_path='add-item-to-cart')
    def add_item_to_cart(self, request):
        """
        Adds an item to the user's cart. Creates a new cart item or updates the quantity
        if the item already exists in the cart.
        """
        user = self.request.user
        item_data = request.data
        quantity = item_data.get('quantity', 1)

        if 'product_identifier' not in item_data:
            return Response({'error': 'Product identifier missing'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = get_object_or_404(Product, product_identifier=item_data['product_identifier'])
        except:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            cart_item, created = CartItem.objects.get_or_create(user=user, product=product, defaults={'quantity': 0})
            cart_item.quantity = F('quantity') + quantity
            cart_item.save()
            cart_item.refresh_from_db()
        except IntegrityError:
            return Response({'error': 'Database integrity error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except:
            return Response({'error': 'Unknown error occurred while adding to cart'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Update cache after modifying the cart
        cache_key = f'cart_{user.id}'
        cache.delete(cache_key)
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['DELETE'], url_path='remove-item-from-cart')
    def remove_item_from_cart(self, request, pk=None):
        """
        Removes an item from the user's cart.

        Args:
            request (Request): The incoming HTTP request.
            pk (int): Primary key of the cart item to remove.
        """
        user = self.request.user
        product_identifier = request.data.get('product_identifier')

        try:
            product_to_remove = Product.objects.get(product_identifier=product_identifier)
            cart_item = CartItem.objects.get(user=user, product=product_to_remove)
        except (Product.DoesNotExist, CartItem.DoesNotExist):
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            quantity_removed = cart_item.quantity
            product_name_removed = product_to_remove.name
            cart_item.delete()
            cache_key = f'cart_{user.id}'
            cache.delete(cache_key)
        except:
            return Response({'error': 'Error occurred while removing item'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            'message': 'Item removed',
            'quantity_removed': quantity_removed,
            'product_name_removed': product_name_removed
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['DELETE'], url_path='clear-entire-cart')
    def clear_entire_cart(self, request):
        """
        Clears the entire cart for the authenticated user.
        """
        user = self.request.user
        CartItem.objects.filter(user=user).delete()
        cache_key = f'cart_{user.id}'
        cache.delete(cache_key)
        return Response({'message': 'Cart cleared', 'success': True}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'], url_path='merge-and-sync-carts')
    def merge_and_sync_carts(self, request):
        """
        Merges and syncs carts for the authenticated user.

        This method is a placeholder for future functionality to merge carts from different sessions.
        """
        queryset = CartItem.objects.filter(user=self.request.user).order_by('-date_added')
        serializer = CartItemSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['PATCH'], url_path='update-item-quantity')
    def update_item_quantity(self, request, pk=None):
        """
        Updates the quantity of a specific item in the user's cart.

        Args:
            request (Request): The incoming HTTP request containing the new quantity.
            pk (int): Primary key of the cart item to update.
        """
        user = self.request.user
        new_quantity = request.data.get('quantity')

        try:
            product_to_update = Product.objects.get(product_identifier=pk)
            cart_item = CartItem.objects.get(user=user, product=product_to_update)
        except (Product.DoesNotExist, CartItem.DoesNotExist):
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

        if new_quantity is None:
            return Response({'error': 'New quantity not provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cart_item.quantity = new_quantity
            cart_item.save()
            cache_key = f'cart_{user.id}'
            cache.delete(cache_key)
        except:
            return Response({'error': 'Error occurred while updating quantity'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'message': 'Quantity updated'}, status=status.HTTP_200_OK)
