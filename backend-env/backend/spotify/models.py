from django.db import models

class SpotifyToken(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)

class Genre(models.Model):
    name = models.CharField(max_length=100)

class Track(models.Model):
    name = models.CharField(max_length=150)
    artist = models.CharField(max_length=150)
    album = models.CharField(max_length=150)
    img_url = models.CharField(max_length=150)
    duration = models.IntegerField()
    song_id = models.CharField(max_length=150)
    album_uri = models.CharField(max_length=150, default='')
    track_number = models.IntegerField(default=0)
    genres = models.ManyToManyField(Genre)
    popularity = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)