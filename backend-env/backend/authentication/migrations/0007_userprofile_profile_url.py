# Generated by Django 4.1.7 on 2023-04-21 04:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_userprofile_followers_userprofile_following'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='profile_url',
            field=models.CharField(default='https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg', max_length=100),
        ),
    ]
