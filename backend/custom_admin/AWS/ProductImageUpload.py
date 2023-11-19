from django.conf import settings
import boto3

def upload_to_s3(file, object_name):
    """
    Uploads a file to an AWS S3 bucket.

    Args:
    - file (File): The file object to upload.
    - object_name (str): The name of the object as it will appear in the S3 bucket.

    Returns:
    - str: The URL of the uploaded file in the S3 bucket.
    """
    # Initialize the S3 client using AWS credentials from Django settings
    s3_client = boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME
    )

    # Upload the file to the specified S3 bucket
    response = s3_client.upload_fileobj(file, settings.AWS_STORAGE_BUCKET_NAME, object_name)

    # Construct and return the URL of the uploaded file
    return f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{object_name}"
