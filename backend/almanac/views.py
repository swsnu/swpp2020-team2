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

from almanac.models import User, University, Department, Event, Background, Language
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

def get_user_signin(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    user = request.user

    if request.method == 'GET':
        user_dict = {'id': user.id, 'username': user.username,
        'first_name': user.first_name, 'last_name': user.last_name, 'password': user.password,
        'email': user.email, 'is_active': user.is_active}
        return JsonResponse(user_dict)

    return HttpResponseNotAllowed(['GET'])

def get_user(request, user_id):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if not User.objects.filter(id=user_id).exists():
        return HttpResponseNotFound()

    user = User.objects.get(id=user_id)

    if request.method == 'GET':
        user_dict = {'id': user.id, 'username': user.username,
        'first_name': user.first_name, 'last_name': user.last_name, 'password': user.password,
        'email': user.email, 'is_active': user.is_active}
        return JsonResponse(user_dict)

    return HttpResponseNotAllowed(['GET'])

def get_event(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if request.method == 'GET':
        events = [{'id': event['id'], 'title': event['title'],
        'place': event['place'], 'date': event['date'], 'begin_time': event['begin_time'],
        'end_time': event['end_time'], 'content': event['content']
        } for event in Event.objects.all().values()]
        return JsonResponse(events, safe=False)
    return HttpResponseNotAllowed(['GET'])

def create_event(request):

    '''
    a function docstring
    '''

    if request.method not in ['POST']:
        return HttpResponseNotAllowed(['POST'])

    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        title = req_data['title']
        place = req_data['place']
        date = req_data['date']
        begin_time = req_data['begin_time']
        end_time = req_data['end_time']
        content = req_data['content']
        event = Event(title=title, place=place, date=date,
        begin_time=begin_time, end_time=end_time, content=content)
        event.save()
        event_dict = {'id': event.id, 'title': event.title,
        'place': event.place, 'date': event.date, 'begin_time': event.begin_time,
        'end_time': event.end_time, 'content': event.content}
        return HttpResponse(content=json.dumps(event_dict), status=201)
    return HttpResponseNotAllowed(['POST'])

def get_put_delete_event(request, event_id):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'PUT', 'DELETE']:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

    if not Event.objects.filter(id=event_id).exists():
        return HttpResponseNotFound()

    event = Event.objects.get(id=event_id)

    if request.method == 'GET':
        event_dict = {'id': event.id, 'title': event.title,
        'place': event.place, 'date': event.date, 'begin_time': event.begin_time,
        'end_time': event.end_time, 'content': event.content}
        return JsonResponse(event_dict)
    if request.method == 'PUT':
        req_data = json.loads(request.body.decode())
        title = req_data['title']
        place = req_data['place']
        date = req_data['date']
        begin_time = req_data['begin_time']
        end_time = req_data['end_time']
        content = req_data['content']
        event = Event(title=title, place=place, date=date,
        begin_time=begin_time, end_time=end_time, content=content)
        event.save()
        event_dict = {'id': event.id, 'title': event.title,
        'place': event.place, 'date': event.date, 'begin_time': event.begin_time,
        'end_time': event.end_time, 'content': event.content}
        return HttpResponse(content=json.dumps(event_dict), status=201)
    # DELETE
    event.delete()
    return HttpResponse(status=200)

def get_create_university(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method == 'GET':
        universities = [{'id': university['id'], 'name': university['name'],
        'domain': university['domain']} for university in University.objects.all().values()]
        return JsonResponse(universities, safe=False)
    # POST
    req_data = json.loads(request.body.decode())
    name = req_data['name']
    domain = req_data['domain']
    university = University(name=name, domain=domain)
    university.save()
    university_dict = {'id': university.id, 'name': university.name,
    'domain': university.domain}
    return HttpResponse(content=json.dumps(university_dict), status=201)

def get_delete_university(request, university_id):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'DELETE']:
        return HttpResponseNotAllowed(['GET', 'DELETE'])

    if not University.objects.filter(id=university_id).exists():
        return HttpResponseNotFound()

    university = University.objects.get(id=university_id)

    if request.method == 'GET':
        university_dict = {'id': university.id, 'name': university.name,
        'domain': university.domain}
        return JsonResponse(university_dict)
    # DELETE
    university.delete()
    return HttpResponse(status=200)

def get_university_by_name(request, name):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if not University.objects.filter(name=name).exists():
        return HttpResponseNotFound()

    university = University.objects.get(name=name)

    if request.method == 'GET':
        university_dict = {'id': university.id, 'name': university.name,
        'domain': university.domain}
        return JsonResponse(university_dict)

    return HttpResponseNotAllowed(['GET'])

def get_create_department(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method == 'GET':
        departments = [{'id': department['id'], 'name': department['name']
        } for department in Department.objects.all().values()]
        return JsonResponse(departments, safe=False)
    # POST
    req_data = json.loads(request.body.decode())
    name = req_data['name']
    department = Department(name=name)
    department.save()
    department_dict = {'id': department.id, 'name': department.name}
    return HttpResponse(content=json.dumps(department_dict), status=201)

def get_delete_department(request, department_id):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'DELETE']:
        return HttpResponseNotAllowed(['GET', 'DELETE'])

    if not Department.objects.filter(id=department_id).exists():
        return HttpResponseNotFound()

    department = Department.objects.get(id=department_id)

    if request.method == 'GET':
        department_dict = {'id': department.id, 'name': department.name}
        return JsonResponse(department_dict)
    # DELETE
    department.delete()
    return HttpResponse(status=200)

def get_department_by_name(request, name):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if not Department.objects.filter(name=name).exists():
        return HttpResponseNotFound()

    department = Department.objects.get(name=name)

    if request.method == 'GET':
        department_dict = {'id': department.id, 'name': department.name}
        return JsonResponse(department_dict)

    return HttpResponseNotAllowed(['GET'])

def get_create_background(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method == 'GET':
        backgrounds = [{'id': background['id'], 'name': background['name']
        } for background in Background.objects.all().values()]
        return JsonResponse(backgrounds, safe=False)
    # POST
    req_data = json.loads(request.body.decode())
    name = req_data['name']
    background = Background(name=name)
    background.save()
    background_dict = {'id': background.id, 'name': background.name}
    return HttpResponse(content=json.dumps(background_dict), status=201)

def get_delete_background(request, background_id):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'DELETE']:
        return HttpResponseNotAllowed(['GET', 'DELETE'])

    if not Background.objects.filter(id=background_id).exists():
        return HttpResponseNotFound()

    background = Background.objects.get(id=background_id)

    if request.method == 'GET':
        background_dict = {'id': background.id, 'name': background.name}
        return JsonResponse(background_dict)
    # DELETE
    background.delete()
    return HttpResponse(status=200)

def get_create_language(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method == 'GET':
        languages = [{'id': language['id'], 'name': language['name']
        } for language in Language.objects.all().values()]
        return JsonResponse(languages, safe=False)
    # POST
    req_data = json.loads(request.body.decode())
    name = req_data['name']
    language = Language(name=name)
    language.save()
    language_dict = {'id': language.id, 'name': language.name}
    return HttpResponse(content=json.dumps(language_dict), status=201)

def get_delete_language(request, language_id):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'DELETE']:
        return HttpResponseNotAllowed(['GET', 'DELETE'])

    if not Language.objects.filter(id=language_id).exists():
        return HttpResponseNotFound()

    language = Language.objects.get(id=language_id)

    if request.method == 'GET':
        language_dict = {'id': language.id, 'name': language.name}
        return JsonResponse(language_dict)
    # DELETE
    language.delete()
    return HttpResponse(status=200)

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
