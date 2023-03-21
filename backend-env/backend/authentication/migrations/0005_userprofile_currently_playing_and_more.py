# Generated by Django 4.1.7 on 2023-03-16 23:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0003_track_album_uri_track_genres_track_likes_and_more'),
        ('authentication', '0004_rename_spotifytoken_userprofile_spotify_token_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='currently_playing',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='current', to='spotify.track'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='top_tracks',
            field=models.ManyToManyField(related_name='top', to='spotify.track'),
        ),
    ]