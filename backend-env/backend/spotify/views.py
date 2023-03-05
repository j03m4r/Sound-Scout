from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView
from django.shortcuts import redirect
from requests import Request, post, get
from .credentials import *
from .utils import *
from .models import Track
from authentication.models import UserProfile
import requests
import json
        
class SpotifyToken(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, format=None):
        code = request.data['code']
        
        response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
        }).json()
        
        access_token = response.get('access_token')
        token_type = response.get('token_type')
        refresh_token = response.get('refresh_token')
        expires_in = response.get('expires_in')
        error = response.get('error')
        
        update_or_create_user_token(request.user, access_token, token_type, expires_in, refresh_token)
        
        return Response({'Success': 'Token successfully acquired', 'code': access_token}, status=status.HTTP_200_OK)
    
class IsAuthenticated(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(request.user)
        return Response({'isAuthenticated': is_authenticated}, status=status.HTTP_200_OK)
        
class GetCredentials(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, format=None):
        return Response({'clientId': CLIENT_ID, 'clientSecret': CLIENT_SECRET})
    
class GetPersonalTopTracks(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, format=None):
        profile = UserProfile.objects.get(user=request.user)
        profile.top_tracks.clear()
        endpoint = 'top/tracks?time_range=short_term&limit=10'
        # data = {'limit': 10, 'time_range': 'short_term'}
        response = execute_spotify_api_request(user=request.user, endpoint=endpoint)
        
        top_tracks = []
        for track in response.get('items'):
            name = track.get('name')
            artist = enumerate_artists(track)
            album = track.get('album').get('name')
            img_url = track.get('album').get('images')[0].get('url')
            duration = track.get('duration_ms')
            progress = track.get('progress_ms')
            song_id = track.get('id') 
            
            
            top_tracks.append({
                'name': name,
                'artist': artist,
                'album': album,
                'img_url': img_url,
                'duration': duration,
                'progress': progress,
                'song_id': song_id
            })
            if not Track.objects.filter(name=name, artist=artist, album=album).exists():
                new_track = Track.objects.create(name=name, artist=artist, album=album, img_url=img_url, 
                                     duration=duration, song_id=song_id)
                profile.top_tracks.add(new_track)
                
        return Response({'Success': 'Top tracks successfully accessed.', 'tracks': top_tracks}, status=status.HTTP_200_OK)
