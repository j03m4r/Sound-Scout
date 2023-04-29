from django.db import models
from django.contrib.auth.models import User
from spotify.models import SpotifyToken, Track
from django.utils.translation import gettext_lazy as _

# Create your models here.
def upload_to(instance, filename):
    return 'profile_pictures/{filename}'.format(filename, filename)
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    spotify_token = models.OneToOneField(SpotifyToken, null=True, on_delete=models.SET_NULL)
    top_tracks = models.ManyToManyField(Track, related_name='top')
    currently_playing = models.ForeignKey(Track, related_name='current', on_delete=models.SET_NULL, null=True)
    followers = models.ManyToManyField(User, related_name="following")
    following = models.ManyToManyField(User, related_name="followers")
    image_url = models.CharField(max_length=100, default='https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg')