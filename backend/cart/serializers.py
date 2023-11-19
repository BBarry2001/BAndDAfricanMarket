from rest_framework import serializers
from .models import CartItem, Product

class CartItemSerializer(serializers.ModelSerializer):
    """
    Serializer for CartItem model.

    Extends Django Rest Framework's ModelSerializer to convert CartItem instances 
    into JSON format and vice-versa. Additional read-only fields are provided to
    include related product details in the serialization.

    Attributes:
        name (CharField): Name of the product.
        price (DecimalField): Price of the product.
        image (URLField): URL of the product image.
        product_identifier (IntegerField): Unique identifier of the product.
    """
    name = serializers.CharField(source='product.name', read_only=True)
    price = serializers.DecimalField(source='product.price', read_only=True, max_digits=19, decimal_places=2)
    image = serializers.URLField(source='product.image_url', read_only=True)
    product_identifier = serializers.IntegerField(source='product.product_identifier', read_only=True, required=False)

    class Meta:
        model = CartItem
        fields = ['name', 'price', 'image', 'quantity', 'date_added', 'product_identifier']
