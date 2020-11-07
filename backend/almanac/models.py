'''
a standard docstring
'''

from django.db import models
# from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.

class University(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(max_length=30)

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
        settings.AUTH_USER_MODEL,
        related_name='member_group'
    )
    admin = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='admin_group'
    )
    king = models.ForeignKey(
        settings.AUTH_USER_MODEL,
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

class UserPreference(models.Model):

    '''
    a class docstring
    '''

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
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
    title = models.CharField(max_length=64)
    place = models.TextField()

class Event(models.Model):

    '''
    a class docstring
    '''

    title = models.CharField(max_length=64)
    place = models.CharField(max_length=120)
