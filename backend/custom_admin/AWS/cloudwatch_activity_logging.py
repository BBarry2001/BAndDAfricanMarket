import time
from django.conf import settings
import json
import uuid
from datetime import datetime
from .cloud_watch_utils import initialize_cloudwatch

cloudwatch_client = initialize_cloudwatch(
    settings.ACTIVITY_LOG_GROUP_NAME, 
    settings.INTENDED_ACTIVITY_LOG_STREAMS
)

def log_to_cloudwatch(log_group, log_stream, level='INFO', action_type=None, details=None, request=None):
    """
    Main function to log to CloudWatch. 
    
    Parameters:
    -----------
    - log_group: str
      CloudWatch log group name.
      
    - log_stream: str
      Log stream name within the group.
      
    - level: str, optional
      Log level. Default is 'INFO'.
      
    - action_type: str, optional
      Describes the type of action. For example, 'Order Placed'.
      
    - details: dict, optional
      Additional details for the log as key-value pairs.
      
    """
    
    try:
        sequence_token = None
        response = cloudwatch_client.describe_log_streams(
            logGroupName=log_group,
            logStreamNamePrefix=log_stream
        )
        log_streams = response.get('logStreams', [])
        if log_streams:
            sequence_token = log_streams[0].get('uploadSequenceToken')
    except Exception as e:
        print(f"Failed to get sequence token: {e}")

    timestamp = int(round(time.time() * 1000))  # Current time in milliseconds
    human_readable_timestamp = datetime.now().strftime('%A %B %d %Y %I:%M:%S %p')
    event_id = str(uuid.uuid4())

    log_data = {
        'level': level,
        'action_type': action_type,
        'event_id': event_id,
        'human_readable_timestamp': human_readable_timestamp,
        'epoch_timestamp': timestamp,
        'details': details
    }
    
    log_event = {
        'timestamp': timestamp,
        'message': json.dumps(log_data)
    }

    try:
        log_params = {
            'logGroupName': log_group,
            'logStreamName': log_stream,
            'logEvents': [log_event]
        }
        if sequence_token:
            log_params['sequenceToken'] = sequence_token
        cloudwatch_client.put_log_events(**log_params)
    except Exception as e:
        print(f"Failed to put log events: {e}")

# Log admin actions
def log_admin_actions(admin_user, action_type, level='INFO', details={}, request=None):
    admin_identifier = f"{admin_user.first_name} {admin_user.last_name}" if admin_user else "Unknown"
    log_to_cloudwatch(settings.ACTIVITY_LOG_GROUP_NAME, 'Admin Actions', level=level, action_type=action_type, details={'admin': admin_identifier, **details}, request=request)

# Log new user creation
def log_user_creation(user, source, level='INFO', details={}, request=None):
    log_to_cloudwatch(settings.ACTIVITY_LOG_GROUP_NAME, 'User Creation', level=level, action_type='User Created', details={'user': user.email, 'source': source, **details}, request=request)

# Log order transactions
def log_order_transactions(order_id, action, level='INFO', details={}, request=None):
    log_to_cloudwatch(settings.ACTIVITY_LOG_GROUP_NAME, 'Order Transactions', level=level, action_type=action, details={'order_id': order_id, **details}, request=request)

"""
BDAfricanMarketActivityLogging: CloudWatch Logger

Purpose:
-------
This script is designed to log various types of activities in an e-commerce platform to AWS CloudWatch. The logs are organized by activity type, making it easier to monitor, audit, and debug. 

Components:
----------
- AWS CloudWatch: Used for logging
- boto3: AWS SDK for Python
- Django settings: To pull AWS configuration
- Python Standard Libraries: `json`, `uuid`, `datetime` and `time` for data formatting and manipulation

Log Levels:
-----------
The log levels defined are:
- INFO: General information
- ERROR: Errors that need attention
- WARNING: Warnings that are not errors but need attention
- DEBUG: Debug-level messages

Parameters for log_to_cloudwatch:
---------------------------------
- log_group: The CloudWatch log group to which logs will be sent.
- log_stream: The specific log stream within the log group.
- level: The severity level of the log. Default is 'INFO'.
- action_type: Type of action performed, e.g., 'User Created', 'Order Placed'.
- details: Additional details about the log event as key-value pairs.

Functions:
----------
- log_admin_actions: Logs actions taken by admin users.
- log_user_creation: Logs when a new user is created.
- log_order_transactions: Logs order-related actions.
- log_payment_processing: Logs payment-related activities.
- log_inventory_updates: Logs inventory changes.

Usage:
-----
- For admin actions: log_admin_actions(admin_user=request.user, action_type='Delete User', details={'target_user': 'john_doe'})
- For user creations: log_user_creation(user=new_user, source='Web Signup')
- For order transactions: log_order_transactions(order_id=123, action='Order Placed', details={'total_price': 59.99})
- For payment processing: log_payment_processing(payment_id=456, status='Success', details={'amount': 59.99})
- For inventory updates: log_inventory_updates(product_id=789, change_type='Stock Increase', details={'amount': 10})

Log Retention:
-------------
For retention, it's common practice to keep logs for 30 days in e-commerce platforms, but you can adjust this period based on your requirements.
"""
