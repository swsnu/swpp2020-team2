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

    privacy_default = 1
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
    privacy = models.IntegerField(default=privacy_default)

    @staticmethod
    def add_new_group(name, king_id, description):

        '''
        a function docstring
        '''

        image = Image.objects.create()
        group = Group.objects.create(
            name=name,
            king_id=king_id,
            description=description,
            profile=image
        )
        group.member.add(king_id)
        group.admin.add(king_id)
        return group

    def add_admin(self, admin_id):

        '''
        a function docstring
        '''

        self.member.add(admin_id)
        self.admin.add(admin_id)

    def remove_admin(self, admin_id):

        '''
        a function docstring
        '''

        self.admin.remove(admin_id)

    def add_member(self, member_id):

        '''
        a function docstring
        '''

        self.member.add(member_id)

    def remove_member(self, member_id):

        '''
        a function docstring
        '''

        self.member.remove(member_id)
        self.admin.remove(member_id)

    def pre_change_king(self, king_id):

        '''
        a function docstring
        '''

        self.member.add(king_id)
        self.admin.add(king_id)

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
        related_name='tag_event',
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
        related_name='image_event'
    )
    last_editor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='last_editor_event',
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
        Language,
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
    join_requests = models.ManyToManyField(
        Group,
        related_name='join_requests_userpreference'
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
    def add_new_preference(user_id, university_id, department_id):

        '''
        a function docstring
        '''

        image = Image.objects.create()
        user_preference = UserPreference.objects.create(
            user_id=user_id,
            university_id=university_id, department_id=department_id,
            profile=image,
            background_id=Background.get_default_id(),
            language_id=Language.get_default_id()
        )
        return user_preference
