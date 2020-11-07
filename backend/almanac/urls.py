'''
a standard docstring
'''

from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.index, name='signup'),
    path('signin/', views.index, name='signin'),
]
