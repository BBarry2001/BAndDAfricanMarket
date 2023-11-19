import os
from pathlib import Path
from decouple import config
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: Keep the secret key used in production secret!
# The key is fetched from environment variables for enhanced security.
SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: Don't run with debug turned on in production!
# Debug mode is controlled via environment variables.
DEBUG = config('DEBUG', default=False, cast=bool)

# Allowed hosts for the application
ALLOWED_HOSTS = []

# Application definition
# Here, we list all the Django apps that are enabled in this project.
INSTALLED_APPS = [
    # Custom apps
    'user',
    'custom_admin',
    'products',
    'cart',

    # Third-party apps
    'storages',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    "django_extensions",

    # Default django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

# Middleware configuration
# Middlewares are used to process requests and responses.
MIDDLEWARE = [
    'django_user_agents.middleware.UserAgentMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Root URL configuration
ROOT_URLCONF = 'backend.urls'

# Template configurations
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI application path
WSGI_APPLICATION = 'backend.wsgi.application'

# Database configuration
# Using MySQL database with credentials fetched from environment variables.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config('DATABASE_NAME'),
        'USER': config('DATABASE_USER'),
        'PASSWORD': config('DATABASE_PASSWORD'),
        'HOST': config('DATABASE_HOST'),
        'PORT': config('DATABASE_PORT'),
    }
}

# Redis cache configuration
# Used for caching purposes.
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6379/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}

# REST framework configuration
# Setting up default permission classes and authentication classes.
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'user.authenticate.AllowAll',
        'user.authenticate.CustomAuthentication',
    ),
}

# JWT token configuration
# Configuring settings for JSON Web Tokens, including their lifetime and rotation.
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'ROTATE_REFRESH_TOKENS': True,  
    'BLACKLIST_AFTER_ROTATION': True,
    'BLACKLIST_STORE': 'user.model.TokenBlacklist',  
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    # Custom token settings for cookies
    'AUTH_COOKIE': 'access_token',
    'AUTH_COOKIE_SECURE': True,
    'AUTH_COOKIE_HTTP_ONLY': True,
    'AUTH_COOKIE_SAMESITE': 'none',
    'AUTH_COOKIE_PATH': '/',
    'REFRESH_TOKEN_COOKIE': 'refresh_token',
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_COOKIE_HTTP_ONLY': True,
    'REFRESH_COOKIE_SECURE': True,
    'REFRESH_COOKIE_SAMESITE': 'none',
    'REFRESH_COOKIE_PATH': '/',
}

# Redis configuration for other purposes like session management
REDIS_CONFIG = {
    'host': 'localhost',
    'port': 6379,
    'db': 0
}

# Password validation settings
# Enforcing strong password policies.
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization settings
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'America/Chicago'
USE_I18N = True
USE_TZ = True

# Static files configuration
STATIC_URL = 'static/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')

# Default primary key field type for models
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Default user authentication model
AUTH_USER_MODEL = 'user.User'

# CORS - Cross-Origin Resource Sharing settings
# Configuring allowed origins and credentials.
CORS_ALLOWED_ORIGINS = [
    "https://localhost:3000",
    "http://localhost:3000",
]
CORS_ALLOW_CREDENTIALS = True

# Security settings
# Enforcing secure connections and other security measures.
SECURE_SSL_REDIRECT = True
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_SECONDS = 31536000 

# Session and CSRF token settings
SESSION_COOKIE_SAMESITE = None
SESSION_COOKIE_SECURE = True
CSRF_USE_SESSIONS = False
CSRF_COOKIE_HTTPONLY = True  
CSRF_COOKIE_SECURE = True     
CSRF_COOKIE_SAMESITE = 'none'  

# SSL/TLS settings for secure data transfer
SECURE_SSL_REDIRECT=True
SECURE_CONTENT_TYPE_NOSNIFF=True

# Celery configuration for periodic tasks
# These settings are for future implementation of background tasks.
CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'America/Chicago'

# Allowed hosts configuration
ALLOWED_HOSTS = ['https://localhost:3000', '127.0.0.1',  'www.yourdomain.com']

# AWS S3 Settings for media storage
AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = config('AWS_S3_REGION_NAME')

AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}
AWS_LOCATION = 'media'

# Activity and Error log settings for AWS CloudWatch
ACTIVITY_LOG_GROUP_NAME = config('ACTIVITY_LOG_GROUP_NAME')
INTENDED_ACTIVITY_LOG_STREAMS = config('INTENDED_ACTIVITY_LOG_STREAMS').split(',')
ERROR_LOG_GROUP_NAME = config('ERROR_LOG_GROUP_NAME')
INTENDED_ERROR_LOG_STREAMS = config('INTENDED_ERROR_LOG_STREAMS').split(',')

# Default file storage using AWS S3
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
MEDIA_URL = 'https://%s/%s/' % (AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION)

# Google OAuth API configuration
GOOGLE_CLIENT_ID = config('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = config('GOOGLE_CLIENT_SECRET')
