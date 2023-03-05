from .models import SpotifyToken
from authentication.models import UserProfile
from django.utils import timezone
from datetime import timedelta
from requests import post, get, put
from .credentials import *
import logging

logger = logging.getLogger(__name__)

BASE_URL = "https://api.spotify.com/v1/me/"

def get_user_token(user):
    profile = UserProfile.objects.get(user=user)
    user_token = profile.spotify_token
    if user_token:
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
        profile.save(update_fields=['spotify_token'])
    else:
        token = SpotifyToken.objects.create(access_token=access_token,
                              refresh_token=refresh_token, token_type=token_type, 
                              expires_in=expires_in)
        profile.spotify_token = token
        profile.save(update_fields=['spotify_token'])
        
def is_spotify_authenticated(user):
    tokens = get_user_token(user)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(user)
        return True
    return False

def refresh_spotify_token(user):
    refresh_token = get_user_token(user).refresh_token
    
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
    
def execute_spotify_api_request(user, endpoint, data = {}, post_=False, put_=False):
    token = get_user_token(user)
    header = {'Content-Type': 'application/json', 'Authorization': "Bearer " + token.access_token}

    if post_:
        response = post(BASE_URL + endpoint, data=data, headers=header)
    elif put_:
        response = put(BASE_URL + endpoint, data=data, headers=header)
    else:
        response = get(BASE_URL + endpoint, data=data, headers=header)

    response = get(BASE_URL + endpoint, {}, headers=header)
    
    try:
        return response.json()
    except:
        return {'Error': 'Issue with request...'}
    
def enumerate_artists(item):
    artist_string = ''
    for i, artist in enumerate(item.get('artists')):
            if i > 0:
                artist_string += ", "
            name = artist.get('name')
            artist_string += name
    return artist_string