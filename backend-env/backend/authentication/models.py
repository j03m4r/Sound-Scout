from django.db import models
from django.contrib.auth.models import User
from spotify.models import SpotifyToken, Track

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    spotify_token = models.OneToOneField(SpotifyToken, null=True, on_delete=models.SET_NULL)
    top_tracks = models.ManyToManyField(Track, related_name='top')
    currently_playing = models.ForeignKey(Track, related_name='current', on_delete=models.SET_NULL, null=True)