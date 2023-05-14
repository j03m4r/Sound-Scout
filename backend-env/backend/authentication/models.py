from django.db import models
from django.contrib.auth.models import User
from spotify.models import SpotifyToken, Track
from polymorphic.models import PolymorphicModel

# Create your models here.
class Activity(PolymorphicModel):
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=150, blank=True)

class FollowingActivity(Activity):
    user_1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='follower')
    user_2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followed')
    
    def save(self, *args, **kwargs):
        self.content = f'{self.user_1} started following {self.user_2}'
        super().save(*args, **kwargs)
        
class LikingActivity(Activity):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    track_name = models.CharField(max_length=150)
    
    def save(self, *args, **kwargs):
        self.content = f'{self.user} liked {self.track_name}'
        super().save(*args, **kwargs)
    
class SocialInstance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image_url = models.CharField(max_length=100, default='https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg')
    
class Message(PolymorphicModel):
    sender = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='recieved_messages')
    created_at = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=50, default='message')
    
class TextMessage(Message):
    text = models.CharField(max_length=800)

    def save(self, *args, **kwargs):
        self.type = 'text'
        super().save(*args, **kwargs)
    
class TrackMessage(Message):
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    
    def save(self, *args, **kwargs):
        self.type = 'track'
        super().save(*args, **kwargs)
    
class Conversation(models.Model):
    user_1 = models.ForeignKey(SocialInstance, on_delete=models.CASCADE, related_name='associated_user1_conv', default='')
    user_2 = models.ForeignKey(SocialInstance, on_delete=models.CASCADE, related_name='associated_user2_conv', default='')
    messages = models.ManyToManyField(Message, related_name='associated_conversation')

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    spotify_token = models.OneToOneField(SpotifyToken, null=True, on_delete=models.SET_NULL)
    top_tracks = models.ManyToManyField(Track, related_name='top')
    currently_playing = models.ForeignKey(Track, related_name='current', on_delete=models.SET_NULL, null=True)
    followers = models.ManyToManyField(SocialInstance, related_name="following")
    following = models.ManyToManyField(SocialInstance, related_name="followers")
    image_url = models.CharField(max_length=250, default='https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg')
    recent_activity = models.ManyToManyField(Activity, related_name='associated_profile')
    conversations = models.ManyToManyField(Conversation, related_name='associated_profile')
    liked_tracks = models.ManyToManyField(Track, related_name='profiles_of_likes')