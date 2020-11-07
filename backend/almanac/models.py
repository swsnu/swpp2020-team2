'''
a standard docstring
'''

from django.db import models
# from django.contrib.auth.models import User

# Create your models here.

class Event(models.Model):

    '''
    a class docstring
    '''

    title = models.CharField(max_length=64)
    place = models.CharField(max_length=120)

class Category(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(max_length=20)

class Tag(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(max_length=20)
