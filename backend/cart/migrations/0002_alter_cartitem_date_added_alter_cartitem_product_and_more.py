# Generated by Django 4.2.7 on 2023-11-18 14:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_alter_product_image_url_alter_product_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cart', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='date_added',
            field=models.DateTimeField(auto_now_add=True, help_text='Date and time the item was added.'),
        ),
        migrations.AlterField(
            model_name='cartitem',
            name='product',
            field=models.ForeignKey(help_text='Product added to the shopping cart.', on_delete=django.db.models.deletion.CASCADE, related_name='cart_items', to='products.product'),
        ),
        migrations.AlterField(
            model_name='cartitem',
            name='quantity',
            field=models.IntegerField(default=1, help_text='Number of units of the product.'),
        ),
        migrations.AlterField(
            model_name='cartitem',
            name='user',
            field=models.ForeignKey(help_text='User who owns the cart item.', on_delete=django.db.models.deletion.CASCADE, related_name='cart_items', to=settings.AUTH_USER_MODEL),
        ),
    ]
