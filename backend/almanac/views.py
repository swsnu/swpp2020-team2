'''
a standard docstring
'''

# from django.shortcuts import render
import json
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth import login, authenticate, logout
# from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode #, urlsafe_base64_encode
from django.views.decorators.csrf import ensure_csrf_cookie

from almanac.models import User, University
from .tokens import account_activation_token

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

    '''
    a function docstring
    '''

    if request.method not in ['POST']:
        return HttpResponseNotAllowed(['POST'])

    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)
        return HttpResponse(status=401)

    return HttpResponseNotAllowed(['POST'])

def signout(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if request.method == 'GET':
        if request.user.is_authenticated:
            #user_dict = {'username': request.user.username, 'password': request.user.password}
            logout(request)
            return HttpResponse(status=204)
        return HttpResponse(status=401)

    return HttpResponseNotAllowed(['GET'])

def get_user(request, user_id):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if not User.objects.filter(id=user_id).exists():
        return HttpResponse(status=404)

    user = User.objects.get(id=user_id)

    if request.method == 'GET':
        response_dict = {'id': user.id, 'username': user.username,
        'first_name': user.first_name, 'last_name': user.last_name, 'password': user.password,
        'email': user.email}
        return JsonResponse(response_dict)

    return HttpResponseNotAllowed(['GET', 'DELETE'])

def create_delete_university(request, university_id):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'DELETE']:
        return HttpResponseNotAllowed(['GET', 'DELETE'])

    if not University.objects.filter(id=university_id).exists():
        return HttpResponse(status=404)

    university = University.objects.get(id=university_id)

    if request.method == 'GET':
        response_dict = {'id': university.id, 'name': university.name,
        'domain': university.domain}
        return JsonResponse(response_dict)

    return HttpResponseNotAllowed(['GET', 'DELETE'])

def index(request):

    '''
    a function docstring
    '''

    return HttpResponse('Hello, world!')

@ensure_csrf_cookie
def get_token(request):

    '''
    a function docstring
    '''

    if request.method == 'GET':
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['GET'])
