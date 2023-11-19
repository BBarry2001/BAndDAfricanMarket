from django.db import models

class Category(models.Model):
    """
    Represents a product category.

    Attributes:
    - name (CharField): The name of the category. Unique across all categories.
    - description (TextField): A brief description of the category. Optional for now. All current 
    category instances have a description.
    """
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    """
    Represents a product with various attributes.

    Attributes:
    - product_identifier (IntegerField): A unique identifier for each product.
    - image_url (URLField): URL of the product's image, which is stored in AWS. 
    - name (CharField): The name of the product. 
    - price (DecimalField): The price of the product. Written like 10.00 for example.
    - description (TextField): A detailed description of the product.
    - weight_kg (DecimalField): Weight of the product in kilograms. For customers who are not familliar with the pound system. Most customers are of African origin.
    - weight_lbs (DecimalField): Weight of the product in pounds.
    - default_quantity (IntegerField): The default quantity for ordering. All products comes as a single quantity. 
    - stock (IntegerField): The available stock quantity of the product. For admin control
    - tags (JSONField): Additional tags for the product, such as 'HOT', 'NEW'. Optional. Controlled by the admin and used by the frontend to display to the user
    - category (ForeignKey): A reference to the Category the product belongs to.
    """
    TAG_CHOICES = [
        ('HOT', 'Hot'),
        ('NEW', 'New'),
        ('NONE', 'None'),
    ]
    
    product_identifier = models.IntegerField(unique=True, primary_key=True)
    image_url = models.URLField()
    name = models.CharField(max_length=255, blank=False)
    price = models.DecimalField(max_digits=19, decimal_places=2, blank=False)
    description = models.TextField(blank=False)
    weight_kg = models.DecimalField(max_digits=19, decimal_places=2, blank=False)
    weight_lbs = models.DecimalField(max_digits=19, decimal_places=2, blank=False)
    default_quantity = models.IntegerField(blank=False)  
    stock = models.IntegerField(default=1)
    tags = models.JSONField(blank=True)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.PROTECT)

    def __str__(self):
        return self.name
