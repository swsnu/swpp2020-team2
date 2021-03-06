# Generated by Django 3.1.2 on 2020-11-08 14:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Background',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64)),
                ('place', models.TextField()),
                ('date', models.DateField()),
                ('begin_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('content', models.TextField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='category_event', to='almanac.category')),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('description', models.TextField()),
                ('privacy', models.IntegerField()),
                ('admin', models.ManyToManyField(related_name='admin_group', to=settings.AUTH_USER_MODEL)),
                ('king', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='king_group', to=settings.AUTH_USER_MODEL)),
                ('member', models.ManyToManyField(related_name='member_group', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.ImageField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('domain', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='UserPreference',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('background', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='background_userpreference', to='almanac.background')),
                ('brings', models.ManyToManyField(related_name='brings_userpreference', to='almanac.Event')),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='department_userpreference', to='almanac.department')),
                ('gets_notification', models.ManyToManyField(related_name='gets_notification_userpreference', to='almanac.Group')),
                ('language', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='language_userpreference', to='almanac.image')),
                ('likes', models.ManyToManyField(related_name='likes_userpreference', to='almanac.Event')),
                ('likes_group', models.ManyToManyField(related_name='likes_group_userpreference', to='almanac.Group')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile_userpreference', to='almanac.image')),
                ('university', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='university_userpreference', to='almanac.university')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_userpreference', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='GroupReport',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_groupreport', to='almanac.group')),
                ('reporter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reporter_groupreport', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='group',
            name='profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile_group', to='almanac.image'),
        ),
        migrations.CreateModel(
            name='EventReport',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_eventreport', to='almanac.event')),
                ('reporter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reporter_eventreport', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='event',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='group_event', to='almanac.group'),
        ),
        migrations.AddField(
            model_name='event',
            name='image',
            field=models.ManyToManyField(related_name='image_group', to='almanac.Image'),
        ),
        migrations.AddField(
            model_name='event',
            name='last_editor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='last_editor_group', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='event',
            name='tag',
            field=models.ManyToManyField(related_name='tag_group', to='almanac.Tag'),
        ),
    ]
