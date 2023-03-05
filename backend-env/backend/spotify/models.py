from django.db import models

class SpotifyToken(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)

class Track(models.Model):
    name = models.CharField(max_length=150)
    artist = models.CharField(max_length=150)
    album = models.CharField(max_length=150)
    img_url = models.CharField(max_length=150)
    duration = models.IntegerField()
    song_id = models.CharField(max_length=150)
    