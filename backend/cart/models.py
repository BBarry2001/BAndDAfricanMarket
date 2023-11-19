# models.py
from django.db import models
from django.conf import settings
from products.models import Product

class CartItem(models.Model):
    """
    Represents a single item in a user's shopping cart.

    Attributes:
        user (ForeignKey): A reference to the user who owns the cart item.
        product (ForeignKey): The product added to the shopping cart.
        quantity (IntegerField): The number of units of the product in the cart.
        date_added (DateTimeField): The date and time the item was added to the cart.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='cart_items',
        on_delete=models.CASCADE,
        help_text="User who owns the cart item."
    )
    product = models.ForeignKey(
        Product,
        related_name='cart_items',
        on_delete=models.CASCADE,
        to_field='product_identifier',
        help_text="Product added to the shopping cart."
    )
    quantity = models.IntegerField(
        default=1,
        help_text="Number of units of the product."
    )
    date_added = models.DateTimeField(
        auto_now_add=True,
        help_text="Date and time the item was added."
    )

    def __str__(self):
        """String representation of the CartItem model."""
        return f'{self.quantity} of {self.product.name}'
