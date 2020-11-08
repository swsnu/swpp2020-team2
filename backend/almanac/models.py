'''
a standard docstring
'''

from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class University(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(max_length=30)
    domain = models.CharField(max_length=30)

class Department(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(max_length=30)

class Image(models.Model):

    '''
    a class docstring
    '''

    name = models.ImageField()

class Background(models.Model):

    '''
    a class docstring
    '''

    name = models.IntegerField()

class Language(models.Model):

    '''
    a class docstring
    '''

    name = models.IntegerField()

class Category(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(max_length=30)

class Tag(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(max_length=30)

class Group(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(max_length=30)
    member = models.ManyToManyField(
        User,
        related_name='member_group'
    )
    admin = models.ManyToManyField(
        User,
        related_name='admin_group'
    )
    king = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='king_group'
    )
    description = models.TextField()
    profile = models.ForeignKey(
        Image,
        on_delete=models.CASCADE,
        related_name='profile_group'
    )
    privacy = models.IntegerField()

class Event(models.Model):

    '''
    a class docstring
    '''

    title = models.CharField(max_length=64)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='category_event'
    )
    tag = models.ManyToManyField(
        Tag,
        related_name='tag_group',
    )
    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        related_name='group_event'
    )
    place = models.TextField()
    date = models.DateField()
    begin_time = models.TimeField()
    end_time = models.TimeField()
    content = models.TextField()
    image = models.ManyToManyField(
        Image,
        related_name='image_group'
    )
    last_editor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='last_editor_group',
    )

class EventReport(models.Model):

    '''
    a class docstring
    '''

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name='event_eventreport'
    )
    reporter = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='reporter_eventreport',
    )
    content = models.TextField()

class GroupReport(models.Model):

    '''
    a class docstring
    '''

    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        related_name='event_groupreport'
    )
    reporter = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='reporter_groupreport',
    )
    content = models.TextField()

class UserPreference(models.Model):

    '''
    a class docstring
    '''

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user_userpreference',
    )
    university = models.ForeignKey(
        University,
        on_delete=models.CASCADE,
        related_name='university_userpreference',
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name='department_userpreference',
    )
    profile = models.ForeignKey(
        Image,
        on_delete=models.CASCADE,
        related_name='profile_userpreference'
    )
    background = models.ForeignKey(
        Background,
        on_delete=models.CASCADE,
        related_name='background_userpreference'
    )
    language = models.ForeignKey(
        Image,
        on_delete=models.CASCADE,
        related_name='language_userpreference'
    )
    likes = models.ManyToManyField(
        Event,
        related_name='likes_userpreference'
    )
    brings = models.ManyToManyField(
        Event,
        related_name='brings_userpreference'
    )
    likes_group = models.ManyToManyField(
        Group,
        related_name='likes_group_userpreference'
    )
    gets_notification = models.ManyToManyField(
        Group,
        related_name='gets_notification_userpreference'
    )
