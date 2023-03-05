from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView
from django.shortcuts import redirect
from requests import Request, post, get
from .credentials import *
from .utils import *

class GetAuthorizationCode(APIView):
    def get(self, request, format=None):
        scopes = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'user-read-private',
                  'user-top-read', 'app-remote-control', 'user-read-playback-position']
        scopes = " ".join(scopes)
        
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url
        
        redirect(url)
        
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
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(request.user)
        return Response({'isAuthenticated': is_authenticated}, status=status.HTTP_200_OK)
        
class GetCredentials(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, format=None):
        return Response({ 'clientId': CLIENT_ID, 'clientSecret': CLIENT_SECRET })