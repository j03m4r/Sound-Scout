# Generated by Django 4.1.7 on 2023-05-03 04:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('authentication', '0015_remove_conversation_user_1_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='conversation',
            name='user',
        ),
        migrations.AddField(
            model_name='conversation',
            name='user_1',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='associated_user1_conv', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='conversation',
            name='user_2',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='associated_user2_conv', to=settings.AUTH_USER_MODEL),
        ),
    ]
