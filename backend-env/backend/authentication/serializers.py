from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from spotify.serializers import SpotifyTokenSerializer, TrackSerializer, LimitedTrackSerializer
from rest_polymorphic.serializers import PolymorphicSerializer
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class SocialInstanceSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = SocialInstance
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField()
    content = serializers.CharField()
    class Meta:
        abstract = True
        model = Activity
        fields = ('created_at', 'content')
        
class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    reciever = UserSerializer(read_only=True)
    created_at = serializers.DateTimeField()
    type = serializers.CharField()
    class Meta:
        model = Message
        fields = ('id', 'sender', 'reciever', 'created_at', 'type')
        
class TextMessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)
    created_at = serializers.DateTimeField()
    text = serializers.CharField()
    type = serializers.CharField()
    class Meta:
        model = TextMessage
        fields = ('id', 'sender', 'receiver', 'created_at', 'text', 'type')

class TrackMessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    reciever = UserSerializer(read_only=True)
    created_at = serializers.DateTimeField()
    track = LimitedTrackSerializer(read_only=True)
    type = serializers.CharField()
    class Meta:
        model = TrackMessage
        fields = ('id', 'sender', 'reciever', 'created_at', 'track', 'type')
    
class MessagePolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        Message: MessageSerializer,
        TextMessage: TextMessageSerializer,
        TrackMessage: TrackMessageSerializer
    }
    
class ConversationSerializer(serializers.ModelSerializer):
    user_1 = SocialInstanceSerializer(read_only=True)
    user_2 = SocialInstanceSerializer(read_only=True)
    messages = MessagePolymorphicSerializer(read_only=True, many=True)
    class Meta:
        model = Conversation
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    spotify_token = SpotifyTokenSerializer(read_only=True)
    top_tracks = TrackSerializer(read_only=True, many=True)
    currently_playing = TrackSerializer(read_only=True)
    following = SocialInstanceSerializer(read_only=True, many=True)
    followers = SocialInstanceSerializer(read_only=True, many=True)
    recent_activity = ActivitySerializer(read_only=True, many=True)
    conversations = ConversationSerializer(read_only=True, many=True)
    liked_tracks = LimitedTrackSerializer(read_only=True, many=True)
    class Meta:
        model = UserProfile
        fields = '__all__'
    
class ListenerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = UserProfile
        fields = ('user', 'image_url')