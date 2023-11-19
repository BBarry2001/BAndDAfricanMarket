# ACTIVELY IMPLEMENTING THIS VIEWSET SO PLEASE KEEP THAT IN MIND.
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Product, Category  
from .serializers import ProductSerializer, CategorySerializer 
from custom_admin.AWS.ProductImageUpload import upload_to_s3
from rest_framework.decorators import action
from django.db.models import Q
from rest_framework import viewsets, status, pagination

class CustomPagination(pagination.PageNumberPagination):
    """
    Custom pagination to limit the number of products per page.
    Set to 9 products per page.
    """
    page_size = 9

class ProductViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing product instances.
    Includes functionality for listing all products with various filtering and searching capabilities,
    featuring top products, and updating product images.

    Attributes:
    - permission_classes: Specifies the permission classes that apply to all actions.
    - queryset: The initial queryset used for listing and filtering products.
    - serializer_class: The serializer class used for product instances.
    - pagination_class: The pagination class applied to list responses.
    """
    permission_classes = [AllowAny]
    queryset = Product.objects.all().order_by('name')
    serializer_class = ProductSerializer
    pagination_class = CustomPagination

    def list(self, request, *args, **kwargs):
        """
        ACTIVELY IMPLEMENTING THIS
        Custom list view to handle various filtering and searching parameters such as:
        - search_query: For text-based search.
        - category_query: To filter products based on category.
        - price range: To filter products within a specified price range.
        - tags: To filter products based on specific tags.
        """
        search_query = request.query_params.get('search', None)
        category_query = request.query_params.get('category', None)
        min_price = request.query_params.get('min_price', None)
        max_price = request.query_params.get('max_price', None)
        tags = request.query_params.getlist('tags', None)  # For tag-based filtering

        # Base queryset
        queryset = Product.objects.all()

        # Filter by search query and category
        if search_query:
            if category_query and category_query != 'all':
                queryset = queryset.filter(Q(name__icontains=search_query), Q(category__name=category_query))
            else:
                queryset = queryset.filter(name__icontains=search_query)

        # Filter by category tags
        if tags:
            queryset = queryset.filter(category__name__in=tags)

        # Filter by price range
        if min_price and max_price:
            queryset = queryset.filter(price__gte=min_price, price__lte=max_price)

        # Apply pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ProductSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        # Fallback if pagination is not applicable
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def star_eight(self, request):
        """
        Custom view to retrieve eight 'star' products.
        Used to showcase top products, typically on the homepage.
        """
        queryset = Product.objects.all().order_by('product_identifier')[:8]
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['POST'])
    def update_image(self, request, pk=None):
        """
        Custom view to update the image of a specific product.
        Uploads the new image to S3 and updates the product's image URL.
        """
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        
        image_file = request.FILES.get('image', None)
        if image_file:
            s3_url = upload_to_s3(image_file, f'products/{image_file.name}')
            product.image_url = s3_url
            product.save()
            return Response({'image_url': s3_url}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)
    
class CategoryViewSet(viewsets.ModelViewSet):
    """
    Category viewset
    """
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer

 