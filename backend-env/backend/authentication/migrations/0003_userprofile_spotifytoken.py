# Generated by Django 4.1.7 on 2023-03-02 20:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
        ('authentication', '0002_remove_userprofile_first_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='spotifyToken',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='spotify.spotifytoken'),
        ),
    ]
