from django.http import HttpResponse
from django.conf import settings
from django.core.cache import cache

def set_token_cookies(response: HttpResponse, access_token: str, refresh_token: str):
    """
    Sets secure cookies for JWT access and refresh tokens on the given HttpResponse object.

    Args:
    - response (HttpResponse): The response object to attach cookies to.
    - access_token (str): JWT access token.
    - refresh_token (str): JWT refresh token.
    """
    # Set access token cookie
    response.set_cookie(
        key=settings.SIMPLE_JWT['AUTH_COOKIE'],
        value=access_token,
        max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
        httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
        path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH']
    )

    # Set refresh token cookie
    response.set_cookie(
        key=settings.SIMPLE_JWT['REFRESH_TOKEN_COOKIE'],
        value=refresh_token,
        max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
        httponly=settings.SIMPLE_JWT['REFRESH_COOKIE_HTTP_ONLY'],
        secure=settings.SIMPLE_JWT['REFRESH_COOKIE_SECURE'],
        samesite=settings.SIMPLE_JWT['REFRESH_COOKIE_SAMESITE'],
        path=settings.SIMPLE_JWT['REFRESH_COOKIE_PATH']
    )

def build_cache_key(user_id: int) -> str:
    """
    Constructs a cache key for a given user ID.

    Args:
    - user_id (int): The ID of the user.

    Returns:
    - str: A cache key string.
    """
    return f'user_{user_id}_details'

def cache_user_details(user):
    """
    Caches details of a given user.

    Args:
    - user (User): The user whose details are to be cached.
    """
    cache_key = build_cache_key(user.pk)
    user_details = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'phone_number': user.phone_number,
        'preferred_language': user.preferred_language,
        'roles': user.roles,
        'last_updated': user.last_updated
    }
    cache.set(cache_key, user_details, timeout=60 * 60 * 24)

def get_cached_user_details(user_id: int):
    """
    Retrieves cached details of a user by their ID.

    Args:
    - user_id (int): The ID of the user.

    Returns:
    - dict or None: Cached user details or None if not found.
    """
    cache_key = build_cache_key(user_id)
    return cache.get(cache_key)

def delete_cached_user_details(user_id: int):
    """
    Deletes cached details of a user by their ID.

    Args:
    - user_id (int): The ID of the user.
    """
    cache_key = build_cache_key(user_id)
    cache.delete(cache_key)
