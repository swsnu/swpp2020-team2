'''
a standard docstring
'''

from django.db import models
from django.contrib.auth.models import User

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

class User_Preference(models.Model):

    '''
    a class docstring
    '''

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        relate_name='user_set',
    )
    university = models.ForeignKey(
        University,
        on_delete=models.CASCADE,
        relate_name='university_set',
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        relate_name='department_set',
    )
    title = models.CharField(max_length=64)
    place = models.TextField()

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

    name = models.CharField(max_length=30)

class Tag(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(max_length=30)
