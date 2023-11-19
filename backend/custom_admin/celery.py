# celery.py
# Configuration for Celery in the Django backend project.

import os
from celery import Celery
from django.conf import settings

# Setting the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Initialize Celery application with the name 'backend'.
app = Celery('backend')

# Load Celery configurations from Django settings, using the 'CELERY' namespace.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Autodiscover and load task modules from all Django applications.
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
