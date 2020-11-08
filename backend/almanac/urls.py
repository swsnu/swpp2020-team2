'''
a standard docstring
'''

from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.signup, name='signup'),
    path('signup/activate/<uidb64>/<token>', views.activate, name='activate'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('user/<int:id>/', views.get_user, name='get_user'),
    path('university/<int:id>/', views.create_delete_university, name='create_delete_university'),
    path('token/', views.get_token, name='token'),
]
