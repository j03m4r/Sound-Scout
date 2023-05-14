from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView
from requests import post
from .credentials import *
from .utils import *
from .models import Track
from authentication.models import UserProfile, LikingActivity
from .serializers import *
import json
from django.db.models import Count

logger = logging.getLogger(__name__)
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
        endpoint = 'me/top/tracks?time_range=short_term&limit=10'
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
            track_number = track.get('track_number')
            album_uri = track.get('album').get('uri')
            popularity = track.get('popularity')
            artist_id = track.get('artists')[0].get('id')
            
            endpoint = f'artists/{artist_id}'
            response = execute_spotify_api_request(user=request.user, endpoint=endpoint)
            
            top_tracks.append({
                'name': name,
                'artist': artist,
                'album': album,
                'img_url': img_url,
                'duration': duration,
                'progress': progress,
                'song_id': song_id
            })
            
            new_track = Track.objects.filter(song_id=song_id)
            genres = response.get('genres')
            if not new_track.exists():
                new_track = Track.objects.create(name=name, artist=artist, album=album, img_url=img_url, 
                                     duration=duration, song_id=song_id, track_number=track_number, album_uri=album_uri,
                                     popularity=popularity)
                profile.top_tracks.add(new_track)
                new_track.listeners.add(profile)
            else:
                new_track = Track.objects.get(song_id=song_id)
                profile.top_tracks.add(new_track)
                if profile not in new_track.listeners.all():
                    new_track.listeners.add(profile)
                    
            for genre in genres:
                    genre_model = Genre.objects.filter(name=genre)
                    if not genre_model.exists():
                        genre = Genre.objects.create(name=genre)
                        new_track.genres.add(genre)
                    else:
                        new_track.genres.add(genre_model[0])
            listeners = new_track.listeners.all()
            listeners = ListenerSerializer(listeners, many=True).data
            top_tracks[-1]['listeners'] = listeners

            likes = new_track.likes
            likes = LikeSerializer(likes, many=True).data
            top_tracks[-1]['likes'] = likes
            
        endpoint = 'me'
        response = execute_spotify_api_request(user=request.user, endpoint=endpoint)
        if response.get('images'):
            image_url = response.get('images')[0].get('url')
            profile.image_url = image_url
            profile.save(update_fields=['image_url'])
                
        return Response({'Success': 'Top tracks successfully accessed.', 'tracks': top_tracks}, status=status.HTTP_200_OK)
    
class GetTracks(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        tracks = Track.objects.all()
        tracks = TrackSerializer(tracks, many=True)
        return Response({'tracks': tracks.data}, status=status.HTTP_200_OK)
    
class PlayTrack(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, format=None):
        profile = UserProfile.objects.get(user=request.user)
        song_id = request.data['song_id']
        endpoint = 'me/player/play'
        
        if song_id != '':
            track = Track.objects.get(song_id=song_id)
            data = json.dumps({'context_uri': track.album_uri, 'offset': {'position': track.track_number-1}, 'position_ms': 0})
            response = execute_spotify_api_request(user=request.user, endpoint=endpoint, data=data, put_=True)
            profile.currently_playing = track
            profile.save(update_fields=['currently_playing'])
        else:
            response = execute_spotify_api_request(user=request.user, endpoint=endpoint, put_=True)
        
        if response:
            return Response({'Success': 'Track successfully played', 'isPlaying': response}, status=status.HTTP_200_OK)
        return Response({'Error': 'Something went wrong with the request', 'isPlaying': False}, status=status.HTTP_400_BAD_REQUEST)
    
class PauseTrack(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def put(self, request, format=None):
        endpoint = 'me/player/pause'
        execute_spotify_api_request(user=request.user, endpoint=endpoint, put_=True)
        
        return Response({'Success': 'Track successfully paused', 'isPlaying': False}, status=status.HTTP_200_OK)
    
class GetCurrentTrack(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, format=None):
        endpoint = 'me/player/currently-playing'
        response = execute_spotify_api_request(user=request.user, endpoint=endpoint)
        
        progress = response.get('progress_ms')
        return Response({'Success': 'Current track progress successfully returned', 'progress': progress}, status=status.HTTP_200_OK)
    
class RepeatTrack(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, format=None):
        endpoint = 'me/player/repeat?state=track'
        execute_spotify_api_request(user=request.user, endpoint=endpoint, put_=True)
        return Response({'Success': 'Track successfully set to repeat'}, status=status.HTTP_200_OK)

class LikeTrack(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, format=None):
        like = Like.objects.filter(user=request.user)
        profile = UserProfile.objects.get(user=request.user)
        if like.exists():
            like = like[0]
        else:
            like = Like.objects.create(user=request.user)
        
        song_id = request.data['song_id']
        track = Track.objects.get(song_id=song_id)
        
        try:
            profile.liked_tracks.add(track)
        except:
            pass
        
        try:
            track.likes.add(like)
        except:
            likes = LikeSerializer(track.likes, many=True)
            return Response({'Error': 'Track has already been liked by this user', 'likes': likes.data}, status=status.HTTP_400_BAD_REQUEST)

        new_activity = LikingActivity.objects.create(user=request.user, track_name=track.name)
        profile = UserProfile.objects.get(user=request.user)
        if new_activity not in profile.recent_activity.all():
            profile.recent_activity.add(new_activity)
            if len(profile.recent_activity.all()) > 3:
                profile.recent_activity.remove(profile.recent_activity.all()[0])
        
        likes = LikeSerializer(track.likes, many=True)
        return Response({'Success': 'Track successfully liked', 'likes': likes.data}, status=status.HTTP_200_OK)
    
class GetTrackLikes(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, format=None):
        track = Track.objects.get(song_id=request.data['song_id'])
        likes = LikeSerializer(track.likes, many=True)
        return Response({'Success': 'Track likes successfully returned', 'likes': likes.data}, status=status.HTTP_200_OK)

class GetGenres(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        genres = Genre.objects.all().order_by('name')
        # genres = Genre.objects.all().annotate(num_tracks = Count('track')).order_by('-num_tracks')
        genres = GenreSerializer(genres, many=True)
        return Response({'genres': genres.data}, status=status.HTTP_200_OK)
    
class GetDiscoveryTracks(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, format=None):
        genre = request.data['genre']
        if genre == 'Random':
            tracks = Track.objects.all().order_by('?')
        else:
            genre = Genre.objects.get(name=genre)
            tracks = genre.track_set.all().order_by('-likes')
        tracks = TrackSerializer(tracks, many=True)
        return Response({'tracks': tracks.data}, status=status.HTTP_200_OK)