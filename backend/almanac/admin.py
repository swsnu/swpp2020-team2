'''
a standard docstring
'''

from django.contrib import admin
from .models import University, Department, Tag, Category, Event, Group, UserPreference, \
    Background, Language, EventReport, GroupReport, Image

# Register your models here.
admin.site.register(University)
admin.site.register(Department)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Event)
admin.site.register(Group)
admin.site.register(UserPreference)
admin.site.register(Background)
admin.site.register(Language)
admin.site.register(EventReport)
admin.site.register(GroupReport)
admin.site.register(Image)
