# Generated by Django 3.1.2 on 2020-11-10 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('almanac', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='name',
        ),
        migrations.AddField(
            model_name='image',
            name='image_file',
            field=models.ImageField(default='image/home.jpg', upload_to='image/'),
        ),
    ]
