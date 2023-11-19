import time
import traceback
from django.conf import settings
import json
import uuid
from datetime import datetime
from .cloud_watch_utils import initialize_cloudwatch

# Initialize the cloudwatch client for logging errors
cloudwatch_client = initialize_cloudwatch(
    settings.ERROR_LOG_GROUP_NAME, 
    settings.INTENDED_ERROR_LOG_STREAMS
)

def log_to_cloudwatch(log_stream, level='ERROR', details=None, request=None, exc_info=None):
    """
    Logs errors to AWS CloudWatch.

    Parameters:
    - log_stream (str): The name of the CloudWatch log stream.
    - level (str): The severity level of the log ('ERROR' by default).
    - details (dict): Additional details of the error.
    - request (HttpRequest): The Django HttpRequest object.
    - exc_info (Exception): The exception information to log.
    """
    try:
        # Fetching the sequence token for CloudWatch logs
        sequence_token = None
        response = cloudwatch_client.describe_log_streams(
            logGroupName=settings.ERROR_LOG_GROUP_NAME,
            logStreamNamePrefix=log_stream
        )
        log_streams = response.get('logStreams', [])
        if log_streams:
            sequence_token = log_streams[0].get('uploadSequenceToken')
    except Exception as e:
        print(f"Failed to get sequence token: {e}")  # Will try to implement better logging in the future
    
    # Preparing log data
    timestamp = int(round(time.time() * 1000))
    human_readable_timestamp = datetime.now().strftime('%A %B %d %Y %I:%M:%S %p')
    event_id = str(uuid.uuid4())

    # Handling exception information if provided
    if exc_info:
        error_type = type(exc_info).__name__
        stack_trace = traceback.format_exception(type(exc_info), exc_info, exc_info.__traceback__)
    else:
        error_type = ''
        stack_trace = ''
    
    # Constructing the log data dictionary
    log_data = {
        'level': level,
        'event_id': event_id,
        'epoch_timestamp': timestamp,
        'human_readable_timestamp': human_readable_timestamp,
        'details': details,
        'path': request.path if request else '',
        'method': request.method if request else '',
        'status_code': details.get('status_code', '') if details else '',
        'error_type': error_type,
        'stack_trace': stack_trace,
        'custom_tags': details.get('custom_tags', []) if details else '',
        'session_id': request.session.session_key if request else ''
    }

    # Constructing the log event
    log_event = {
        'timestamp': timestamp,
        'message': json.dumps(log_data)
    }

    try:
        # Sending the log event to CloudWatch
        log_params = {
            'logGroupName': settings.ERROR_LOG_GROUP_NAME,
            'logStreamName': log_stream,
            'logEvents': [log_event]
        }
        if sequence_token:
            log_params['sequenceToken'] = sequence_token
        cloudwatch_client.put_log_events(**log_params)
    except Exception as e:
        print(f"Failed to put log events: {e}") # Will try to implement better logging in the future


def log_critical_error(error_message, details={}, request=None, exc_info=None, level='CRITICAL'):
    """
    Logs critical errors to CloudWatch.

    Parameters:
    - error_message (str): A descriptive message of the critical error.
    - details (dict): Additional details relevant to the error.
    - request (HttpRequest): The Django HttpRequest object, if available.
    - exc_info (Exception): Exception object for capturing stack trace.
    - level (str): Severity level of the error, default is 'CRITICAL'.
    """
    log_to_cloudwatch('Critical Errors', level=level, details={'error_message': error_message, **details}, request=request, exc_info=exc_info)

def log_database_issue(error_message, details={}, request=None, exc_info=None, level='WARN'):
    """
    Logs database related issues to CloudWatch.

    Parameters:
    - error_message (str): A descriptive message of the database issue.
    - details (dict): Additional details relevant to the database issue.
    - request (HttpRequest): The Django HttpRequest object, if available.
    - exc_info (Exception): Exception object for capturing stack trace.
    - level (str): Severity level of the error, default is 'WARN'.
    """
    log_to_cloudwatch('Database Issues', level=level, details={'error_message': error_message, **details}, request=request, exc_info=exc_info)

def log_authentication_issue(error_message, status_code=None, custom_tags=None, details={}, request=None, exc_info=None, level='INFO'):
    """
    Logs authentication related issues to CloudWatch.

    Parameters:
    - error_message (str): A descriptive message of the authentication issue.
    - status_code (int): HTTP status code associated with the issue.
    - custom_tags (list): Custom tags for categorizing the log.
    - details (dict): Additional details relevant to the issue.
    - request (HttpRequest): The Django HttpRequest object, if available.
    - exc_info (Exception): Exception object for capturing stack trace.
    - level (str): Severity level of the log, default is 'INFO'.
    """
    full_details = {
        'error_message': error_message,
        'status_code': status_code,
        'custom_tags': custom_tags,
        **details
    }
    log_to_cloudwatch('Authentication Issues', level=level, details=full_details, request=request, exc_info=exc_info)

def log_payment_failure(error_message, details={}, request=None, exc_info=None, level='ERROR'):
    """
    Logs payment failures to CloudWatch.

    Parameters:
    - error_message (str): A descriptive message of the payment failure.
    - details (dict): Additional details relevant to the payment issue.
    - request (HttpRequest): The Django HttpRequest object, if available.
    - exc_info (Exception): Exception object for capturing stack trace.
    - level (str): Severity level of the error, default is 'ERROR'.
    """
    log_to_cloudwatch('Payment Failures', level=level, details={'error_message': error_message, **details}, request=request, exc_info=exc_info)

"""
#####################################################
# BDAfricanMarketErrorLogging Module Documentation  #
#####################################################

This module is designed for error logging on BDAfricanMarket's Django application. It logs various error types, including Critical Errors, Database Issues, Authentication Issues, and Payment Failures, to AWS CloudWatch. 
The goal is to log any non user related, system and application related errors.

------------------------
AWS CloudWatch Settings:
------------------------
- Log Group Name: BDAfricanMarketErrorLogging
- Log Stream Names: 
    - Critical Errors
    - Database Issues
    - Authentication Issues
    - Payment Failures

-----------
Dependencies:
-----------
- boto3 for AWS SDK
- uuid for generating unique event IDs
- time for epoch timestamps
- json for serializing log data
- traceback for capturing stack traces
- django.conf for importing Django settings

---------------
Log Data Fields:
---------------
1. 'level': The severity of the error (CRITICAL, WARN, INFO, ERROR)
2. 'event_id': A UUID for uniquely identifying log events
3. 'epoch_timestamp': The time the event happened, in epoch milliseconds
4. 'details': Additional details about the error
5. 'user_agent': The browser's User-Agent string
6. 'path': The URL path the user was trying to access
7. 'method': The HTTP request method (GET, POST, etc.)
8. 'status_code': HTTP status code returned (if applicable)
9. 'elapsed_time': Time taken for the operation that failed
10. 'error_type': Python exception type (ValueError, KeyError, etc.)
11. 'stack_trace': Stack trace capturing the program state at the time of the error
12. 'custom_tags': Custom labels for searching and categorizing the error
13. 'session_id': Django session ID (if available)
14. 'ip_address': The IP address from which the request originated

--------------
Error Functions:
--------------
- log_critical_error: Logs critical-level errors
- log_database_issue: Logs database-related warnings
- log_authentication_issue: Logs info-level issues related to authentication
- log_payment_failure: Logs standard errors related to payment

-------
Usage:
-------
Each error function takes in the following parameters:
1. 'error_message': The primary error message to log
2. 'details': A dictionary for any additional details
3. 'request': The Django HttpRequest object to capture request data
4. 'exc_info': The Python Exception info for stack trace and error type

Simply import the function you wish to use and call it where error logging is needed.

Example:
from error_logging import log_database_issue
log_database_issue('Could not connect to DB', details={'status_code': 500}, request=request, exc_info=True)

This will log the error to the 'Database Issues' stream in CloudWatch under the log group 'BDAfricanMarketErrorLogging'.

#############################################################
"""
