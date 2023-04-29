from rest_framework import serializers
from .models import SpotifyToken, Track, Genre, Like
from django.contrib.auth.models import User
from authentication.models import UserProfile

# from authentication.serializers import ListenerSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class SpotifyTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotifyToken
        fields = '__all__'

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Like
        fields = '__all__'
        
class ListenerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = UserProfile
        fields = ('user', 'image_url')
        
class TrackSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    listeners = ListenerSerializer(many=True, read_only=True)
    likes = LikeSerializer(many=True, read_only=True)
    
    class Meta:
        model = Track
        fields = '__all__'

