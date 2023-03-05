from rest_framework import serializers
from .models import SpotifyToken, Track

class SpotifyTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotifyToken
        fields = '__all__'

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = '__all__'