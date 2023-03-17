# Generated by Django 4.1.7 on 2023-03-16 23:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0002_track'),
    ]

    operations = [
        migrations.AddField(
            model_name='track',
            name='album_uri',
            field=models.CharField(default='', max_length=150),
        ),
        migrations.AddField(
            model_name='track',
            name='genres',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='track',
            name='likes',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='track',
            name='popularity',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='track',
            name='track_number',
            field=models.IntegerField(default=0),
        ),
    ]
