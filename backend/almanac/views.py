'''
a standard docstring
'''

# from django.shortcuts import render
import json
from django.http import HttpResponse, HttpResponseNotAllowed
from django.contrib.auth import login, authenticate#, logout
# from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode #, urlsafe_base64_encode
from django.contrib.auth import get_user_model
from .tokens import account_activation_token

User = get_user_model()
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
        User.objects.create_user(is_active=False, username=username,
        first_name=first_name, last_name=last_name, password=password, email=email)
        return HttpResponse(status=201)
    return HttpResponseNotAllowed(['POST'])

def activate(request, uidb64, token):

    '''
    a function docstring
    '''

    if request.method == 'PUT':
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(id=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            login(request, user)
            return HttpResponse('Now your account is activated safely.')
        return HttpResponse('Invalid link.')
    return HttpResponseNotAllowed(['PUT'])

def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])

def index(request):

    '''
    a function docstring
    '''

    return HttpResponse('Hello, world!')
