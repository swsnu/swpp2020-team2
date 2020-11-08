'''
a standard docstring
'''

# from django.shortcuts import render
import json
from django.http import HttpResponse, HttpResponseNotAllowed
# from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.tokens import default_token_generator
from django.conf import settings

# Create your views here.

def signup(request):

    '''
    a function docstring
    '''

    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        first_name = req_data['first_name']
        last_name = req_data['last_name']
        password = req_data['password']
        email = req_data['email']
        settings.AUTH_USER_MODEL.objects.create_user(is_active=False, username=username,
        first_name=first_name, last_name=last_name, password=password, email=email)
        return HttpResponse(status=201)
    return HttpResponseNotAllowed(['POST'])

def activate(request, uidb64, token):

    '''
    a function docstring
    '''

    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        settings.AUTH_USER_MODEL.objects.create_user(username=username, password=password)
        return HttpResponse(status=201)
    return HttpResponseNotAllowed(['POST'])

def index(request):

    '''
    a function docstring
    '''

    return HttpResponse('Hello, world!')
