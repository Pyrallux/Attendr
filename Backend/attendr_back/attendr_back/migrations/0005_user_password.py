# Generated by Django 5.2 on 2025-04-05 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attendr_back', '0004_course_latitude_course_longitude'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.CharField(default='', max_length=100),
        ),
    ]
