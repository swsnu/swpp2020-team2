'''
a standard docstring
'''

# from django.shortcuts import render
import json
from json import JSONDecodeError
from django.db.utils import IntegrityError
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, \
    HttpResponseNotFound, JsonResponse
from django.contrib.auth import login, authenticate, logout
# from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.core.mail import send_mail
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.encoding import force_bytes #, force_text

from almanac.models import User, University
from .tokens import account_activation_token

# Create your views here.

def signup(request):

    '''
    a function docstring
    '''

    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            first_name = req_data['first_name']
            last_name = req_data['last_name']
            password = req_data['password']
            email = req_data['email']
            user = User.objects.create_user(is_active=False, username=username,
            first_name=first_name, last_name=last_name, password=password, email=email)
            content = ('Hello, {}. Welcome to the Almanac Service. You can activate your account'
            ' via the link \nhttps://localhost/signup/{}/{}'
            '\nEnjoy your calenars!').format(
                username,
                urlsafe_base64_encode(force_bytes(user.id)),
                account_activation_token.make_token(user)
            )
            send_mail(
                subject='Almanac Email Verification',
                message=content,
                from_email=None,
                recipient_list=[email],
                fail_silently=False
            )
        except (KeyError, ValueError, JSONDecodeError, IntegrityError):
            return HttpResponseBadRequest()
        return HttpResponse(status=201)
    return HttpResponseNotAllowed(['POST'])

def activate(request, uidb64, token):

    '''
    a function docstring
    '''

    if request.method == 'GET':
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(id=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            login(request, user)
            return HttpResponse(content='Now your account is activated safely.', status=204)
        return HttpResponseNotFound()
    return HttpResponseNotAllowed(['GET'])

def signin(request):

    '''
    a function docstring
    '''

    if request.method not in ['POST']:
        return HttpResponseNotAllowed(['POST'])

    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
        except (KeyError, ValueError, JSONDecodeError):
            return HttpResponseBadRequest()
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            user_dict = {'username': user.username, 'password': user.password}
            return HttpResponse(content=json.dumps(user_dict), status=204)
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
        'email': user.email, 'is_active': user.is_active}
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
