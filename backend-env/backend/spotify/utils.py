from .models import SpotifyToken
from authentication.models import UserProfile
from django.utils import timezone
from datetime import timedelta
from requests import post, get
from .credentials import *

BASE_URL = "https://api.spotify.com/v1/me/"

def get_user_token(user):
    profile = UserProfile.objects.get(user=user)
    user_token = profile.spotifyToken
    if not user_token:
        return user_token
    return None

def update_or_create_user_token(user, access_token, token_type, expires_in, refresh_token):
    profile = UserProfile.objects.get(user=user)
    token = get_user_token(user)
    expires_in = timezone.now() + timedelta(seconds=expires_in)
    
    if token:
        token.access_token = access_token
        token.refresh_token = refresh_token
        token.expires_in = expires_in
        token.token_type = token_type
        token.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
        profile.spotifyToken = token
        profile.save(update_fields=['spotifyToken'])
    else:
        token = SpotifyToken.objects.create(access_token=access_token,
                              refresh_token=refresh_token, token_type=token_type, 
                              expires_in=expires_in)
        profile.spotifyToken = token
        profile.save(update_fields=['spotifyToken'])
        
def is_spotify_authenticated(user):
    tokens = get_user_token(user)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(user)
        return True
    return False

def refresh_spotify_token(user):
    refresh_token = get_user_token(user)
    
    response = post("https://accounts.spotify.com/api/token", data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()
    
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    
    update_or_create_user_token(user, access_token, token_type, expires_in, refresh_token)