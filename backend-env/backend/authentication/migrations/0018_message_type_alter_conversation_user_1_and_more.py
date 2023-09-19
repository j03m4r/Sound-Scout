# Generated by Django 4.1.7 on 2023-05-04 06:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0017_rename_followageinstance_socialinstance'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='type',
            field=models.CharField(default='message', max_length=50),
        ),
        migrations.AlterField(
            model_name='conversation',
            name='user_1',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='associated_user1_conv', to='authentication.socialinstance'),
        ),
        migrations.AlterField(
            model_name='conversation',
            name='user_2',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='associated_user2_conv', to='authentication.socialinstance'),
        ),
    ]