'''
a standard docstring
'''

from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class University(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(null=False, blank=False, unique=True, max_length=30)
    domain = models.CharField(null=False, blank=False, unique=True, max_length=30)

    def __str__(self):
        return self.name

    @staticmethod
    def get_default_id():

        '''
        a function docstring
        '''

        obj, _ = University.objects.get_or_create(name='Seoul National University',
        domain='snu.ac.kr')
        return obj.id

class Department(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(null=False, blank=False, unique=True, max_length=30)

    def __str__(self):
        return self.name

    @staticmethod
    def get_default_id():

        '''
        a function docstring
        '''

        obj, _ = Department.objects.get_or_create(name='Computer Science Engineering')
        return obj.id

class Image(models.Model):

    '''
    a class docstring
    '''

    image_file = models.ImageField(upload_to='image/', default='image/home.jpg')

class Background(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(null=False, blank=False, unique=True, max_length=30)

    def __str__(self):
        return self.name

    @staticmethod
    def get_default_id():

        '''
        a function docstring
        '''

        obj, _ = Background.objects.get_or_create(name='green')
        return obj.id

class Language(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(null=False, blank=False, unique=True, max_length=30)

    def __str__(self):
        return self.name

    @staticmethod
    def get_default_id():

        '''
        a function docstring
        '''

        obj, _ = Language.objects.get_or_create(name='English')
        return obj.id

class Category(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(null=False, blank=False, unique=True, max_length=30)

class Tag(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(null=False, blank=False, unique=True, max_length=30)

class Group(models.Model):

    '''
    a class docstring
    '''

    name = models.CharField(null=False, blank=False, max_length=30)
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

    title = models.CharField(null=False, blank=False, max_length=64)
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
    content = models.TextField(null=False, blank=False)

class UserPreference(models.Model):

    '''
    a class docstring
    '''

    user = models.OneToOneField(
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

    @staticmethod
    def add_new_user_and_preference(username, first_name, last_name, email, password, is_active, university, department):

        '''
        a function docstring
        '''

        user = User.objects.create_user(username=username, first_name=first_name,
        last_name=last_name, email=email, password=password, is_active=is_active)
        image = Image.objects.create()
        UserPreference.objects.create(user=user.id, university=university, department=department,
        image=image.id, background=Background.get_default_id(), language=Language.get_default_id())
        return user.id
