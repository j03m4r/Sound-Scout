# Generated by Django 4.1.7 on 2023-05-02 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0012_message_alter_userprofile_recent_activity_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='conversations',
            field=models.ManyToManyField(related_name='associated_profile', to='authentication.conversation'),
        ),
    ]
