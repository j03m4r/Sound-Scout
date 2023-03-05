from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from spotify.serializers import SpotifyTokenSerializer, TrackSerializer
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class ProfileSerializer(serializers.ModelSerializer):
    spotify_token = SpotifyTokenSerializer(read_only=True)
    top_tracks = TrackSerializer(read_only=True, many=True)
    
    class Meta:
        model = UserProfile
        fields = '__all__'