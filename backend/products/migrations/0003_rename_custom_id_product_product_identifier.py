# Generated by Django 4.2.6 on 2023-10-17 15:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_alter_product_default_quantity'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='custom_id',
            new_name='product_identifier',
        ),
    ]