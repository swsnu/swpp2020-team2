'''
a standard docstring
'''

from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.signup, name='signup'),
    path('signup/activate/<uidb64>/<token>/', views.activate, name='activate'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('user/signin/', views.get_user_signin, name='get_user_signin'),
    path('user/<int:user_id>/', views.get_user, name='get_user'),
    path('event/', views.get_event, name='get_event'),
    path('event/upload/', views.create_event, name='create_event'),
    path('event/<int:event_id>/', views.get_put_delete_event, name='get_edit_delete_event'),
    path('university/',
    views.get_create_university, name='create_university'),
    path('university/<int:university_id>/',
    views.get_delete_university, name='get_delete_university'),
    path('university/name/<name>/',
    views.get_university_by_name, name='get_university_by_name'),
    path('department/',
    views.get_create_department, name='create_department'),
    path('department/<int:department_id>/',
    views.get_delete_department, name='get_delete_department'),
    path('department/name/<name>/',
    views.get_department_by_name, name='get_department_by_name'),
    path('background/',
    views.get_create_background, name='create_background'),
    path('background/<int:background_id>/',
    views.get_delete_background, name='get_delete_background'),
    path('language/',
    views.get_create_language, name='create_language'),
    path('language/<int:language_id>/',
    views.get_delete_language, name='get_delete_language'),
    path('token/', views.get_token, name='token'),
]
