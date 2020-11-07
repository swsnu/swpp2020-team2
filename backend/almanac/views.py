'''
a standard docstring
'''

# from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed
# from django.contrib.auth import authenticate, login, logout
import json
from django.conf import settings

# Create your views here.

def signup(request):

    '''
    a function docstring
    '''

    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        settings.AUTH_USER_MODEL.objects.create_user(username=username, password=password)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

def index(request):

    '''
    a function docstring
    '''

    return HttpResponse('Hello, world!')
