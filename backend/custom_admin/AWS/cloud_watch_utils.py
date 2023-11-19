import boto3
from django.conf import settings

def initialize_cloudwatch(log_group_name, intended_log_streams):
    """
    Initializes the AWS CloudWatch log group and log streams.

    Args:
        log_group_name (str): Name of the log group to create or use.
        intended_log_streams (list of str): List of log stream names to create within the log group.

    Returns:
        boto3 CloudWatch Logs client object.
    """
    # Creating a CloudWatch client using boto3 with AWS credentials from Django settings
    cloudwatch_client = boto3.client(
        'logs',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME
    )

    # Creating a log group. Ignores if the log group already exists.
    try:
        cloudwatch_client.create_log_group(logGroupName=log_group_name)
    except cloudwatch_client.exceptions.ResourceAlreadyExistsException:
        pass  # Log group already exists, no action needed

    # Creating log streams within the log group.
    for stream_name in intended_log_streams:
        try:
            cloudwatch_client.create_log_stream(
                logGroupName=log_group_name,
                logStreamName=stream_name
            )
        except cloudwatch_client.exceptions.ResourceAlreadyExistsException:
            pass  # Log stream already exists, no action needed

    return cloudwatch_client
