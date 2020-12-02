'''
The main code for views
'''

import json
import operator
from functools import reduce
from json import JSONDecodeError
from django.db import transaction
from django.db.utils import IntegrityError
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, \
    HttpResponseNotFound, JsonResponse
from django.contrib.auth import login, authenticate, logout
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.core.mail import send_mail
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.encoding import force_bytes
from django.db.models import Q

from almanac.models import User, UserPreference, \
    University, Department, Event, Group, Background, Language, Category, Tag, Image
from .tokens import account_activation_token
from .forms import ImageForm

# Create your views here.
# User (Sign)

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
            university_id = req_data['university']
            department_id = req_data['department']
            if not User.objects.filter(username=username).exists():
                with transaction.atomic():
                    user = User.objects.create_user(is_active=False, username=username,
                    first_name=first_name, last_name=last_name, password=password, email=email)
                    UserPreference.add_new_preference(user_id=user.id,
                    university_id=university_id, department_id=department_id)
            else:
                user = User.objects.get(username=username)
                if not user.check_password(password):
                    return HttpResponse("Username Taken")
                if user.is_active:
                    return HttpResponse("Already Activated")
            content = ('Hello, {}. Welcome to the Almanac Service. You can activate your account'
            ' via the link \nhttp://localhost:3000/signup/activate/{}/{}'
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
            return HttpResponse("Account Activated Safely")
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
            user_preference = UserPreference.objects.get(user=user.id)
            user_dict = {'id': user.id, 'username': user.username,
            'first_name': user.first_name, 'last_name': user.last_name, 'password': user.password,
            'email': user.email, 'is_active': user.is_active,
            'university': user_preference.university_id,
            'department': user_preference.department_id}
            return JsonResponse(user_dict)
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

# User (Non-sign)

def get_user_signin(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    user = request.user
    user_preference = UserPreference.objects.get(user=user.id)

    if request.method == 'GET':
        user_dict = {'id': user.id, 'username': user.username,
        'first_name': user.first_name, 'last_name': user.last_name, 'password': user.password,
        'email': user.email, 'is_active': user.is_active,
        'university': user_preference.university_id,
        'department': user_preference.department_id}
        return JsonResponse(user_dict)

    return HttpResponseNotAllowed(['GET'])

def get_user_signin_full(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    user = request.user
    user_preference = UserPreference.objects.get(user=user.id)

    if request.method == 'GET':
        user_dict = {'id': user.id, 'username': user.username,
        'first_name': user.first_name, 'last_name': user.last_name, 'password': user.password,
        'email': user.email, 'is_active': user.is_active,
        'university': user_preference.university_id,
        'department': user_preference.department_id,
        'profile': user_preference.profile_id,
        'background': user_preference.background_id,
        'language': user_preference.language_id,
        'likes': list(user_preference.likes.values_list('id', flat=True)),
        'brings': list(user_preference.brings.values_list('id', flat=True)),
        'join_requests': list(user_preference.join_requests.values_list('id', flat=True)),
        'likes_group': list(user_preference.likes_group.values_list('id', flat=True)),
        'gets_notification': list(user_preference.gets_notification.values_list('id', flat=True)),
        'members': list(user.member_group.values_list('id', flat=True)),
        'admins': list(user.admin_group.values_list('id', flat=True)),
        'kings': list(user.king_group.values_list('id', flat=True)),
        }
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
    user_preference = UserPreference.objects.get(user=user.id)

    if request.method == 'GET':
        user_dict = {'id': user.id, 'username': user.username,
        'first_name': user.first_name, 'last_name': user.last_name, 'password': user.password,
        'email': user.email, 'is_active': user.is_active,
        'university': user_preference.university_id,
        'department': user_preference.department_id}
        return JsonResponse(user_dict)

    return HttpResponseNotAllowed(['GET'])

def get_user_full(request, user_id):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if not User.objects.filter(id=user_id).exists():
        return HttpResponseNotFound()

    user = User.objects.get(id=user_id)
    user_preference = UserPreference.objects.get(user=user.id)

    if request.method == 'GET':
        user_dict = {'id': user.id, 'username': user.username,
        'first_name': user.first_name, 'last_name': user.last_name, 'password': user.password,
        'email': user.email, 'is_active': user.is_active,
        'university': user_preference.university_id,
        'department': user_preference.department_id,
        'profile': user_preference.profile_id,
        'background': user_preference.background_id,
        'language': user_preference.language_id,
        'likes': [event.id for event in user_preference.likes.all()],
        'brings': [event.id for event in user_preference.brings.all()],
        'join_requests': [group.id for group in user_preference.join_requests.all()],
        'likes_group': [group.id for group in user_preference.likes_group.all()],
        'gets_notification': [group.id for group in user_preference.gets_notification.all()],
        'members': [group.id for group in user.member_group.all()],
        'admins': [group.id for group in user.admin_group.all()],
        'kings': [group.id for group in user.king_group.all()],
        }
        return JsonResponse(user_dict)

    return HttpResponseNotAllowed(['GET'])

# University

def get_create_university(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method == 'GET':
        universities = [{
            'id': university['id'],
            'name': university['name'],
            'domain': university['domain']}
            for university in University.objects.all().order_by('name').values()]
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

# Department

def get_create_department(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method == 'GET':
        departments = [{'id': department['id'], 'name': department['name']
        } for department in Department.objects.all().order_by('name').values()]
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

# Category

def get_create_category(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method == 'GET':
        categories = [{'id': category['id'], 'name': category['name']
        } for category in Category.objects.all().order_by('name').values()]
        return JsonResponse(categories, safe=False)
    # POST
    req_data = json.loads(request.body.decode())
    name = req_data['name']
    category = Category(name=name)
    category.save()
    category_dict = {'id': category.id, 'name': category.name}
    return HttpResponse(content=json.dumps(category_dict), status=201)

def get_delete_category(request, category_id):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'DELETE']:
        return HttpResponseNotAllowed(['GET', 'DELETE'])

    if not Category.objects.filter(id=category_id).exists():
        return HttpResponseNotFound()

    category = Category.objects.get(id=category_id)

    if request.method == 'GET':
        category_dict = {'id': category.id, 'name': category.name}
        return JsonResponse(category_dict)
    # DELETE
    category.delete()
    return HttpResponse(status=200)

def get_category_by_name(request, name):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if not Category.objects.filter(name=name).exists():
        return HttpResponseNotFound()

    category = Category.objects.get(name=name)

    if request.method == 'GET':
        category_dict = {'id': category.id, 'name': category.name}
        return JsonResponse(category_dict)

    return HttpResponseNotAllowed(['GET'])

# Tag

def get_create_tag(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method == 'GET':
        tags = [{'id': tag['id'], 'name': tag['name']
        } for tag in Tag.objects.all().order_by('name').values()]
        return JsonResponse(tags, safe=False)
    # POST
    req_data = json.loads(request.body.decode())
    name = req_data['name']
    tag = Tag(name=name)
    tag.save()
    tag_dict = {'id': tag.id, 'name': tag.name}
    return HttpResponse(content=json.dumps(tag_dict), status=201)

def get_delete_tag(request, tag_id):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'DELETE']:
        return HttpResponseNotAllowed(['GET', 'DELETE'])

    if not Tag.objects.filter(id=tag_id).exists():
        return HttpResponseNotFound()

    tag = Tag.objects.get(id=tag_id)

    if request.method == 'GET':
        tag_dict = {'id': tag.id, 'name': tag.name}
        return JsonResponse(tag_dict)
    # DELETE
    tag.delete()
    return HttpResponse(status=200)

def get_tag_by_name(request, name):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if not Tag.objects.filter(name=name).exists():
        return HttpResponseNotFound()

    tag = Tag.objects.get(name=name)

    if request.method == 'GET':
        tag_dict = {'id': tag.id, 'name': tag.name}
        return JsonResponse(tag_dict)

    return HttpResponseNotAllowed(['GET'])

# Background

def get_create_background(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method == 'GET':
        backgrounds = [{'id': background['id'], 'name': background['name']
        } for background in Background.objects.all().order_by('name').values()]
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

# Language

def get_create_language(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method == 'GET':
        languages = [{'id': language['id'], 'name': language['name']
        } for language in Language.objects.all().order_by('name').values()]
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

# Image

def get_create_image(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.method == 'GET':
        images = [{'id': image.id, 'image_file_url': image.image_file.url
        } for image in Image.objects.all().order_by('id')]
        return JsonResponse(images, safe=False)
    # POST
    form = ImageForm(request.POST, request.FILES)
    if form.is_valid():
        image_dict = []
        for image_file in request.FILES.getlist('imagefile'):
            image = Image(image_file = image_file)
            image.save()
            image_dict.append({'id': image.id, 'image_file_url': image.image_file.url})
        return HttpResponse(content=json.dumps(image_dict), status=201)
    return HttpResponse(content='Bad Image', status=401)

def get_delete_image(request, image_id):

    '''
    a function docstring
    '''

    if request.method not in ['GET', 'DELETE']:
        return HttpResponseNotAllowed(['GET', 'DELETE'])

    if not Image.objects.filter(id=image_id).exists():
        return HttpResponseNotFound()

    image = Image.objects.get(id=image_id)

    if request.method == 'GET':
        image_dict = {'id': image.id, 'image_file_url': image.image_file.url}
        return JsonResponse(image_dict)
    # DELETE
    image.delete()
    return HttpResponse(status=200)

# Event

def get_event_simple(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if request.method == 'GET':
        events = [{'id': event.id,
        'title': event.title,
        'date': str(event.date),
        'category': event.category.id,
        'group': event.group.id,
        'begin_time': str(event.begin_time),
        'end_time': str(event.end_time)
        } for event in Event.objects.all().order_by('id')]
        return JsonResponse(events, safe=False)
    return HttpResponseNotAllowed(['GET'])

def get_event(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if request.method == 'GET':
        events = [{'id': event.id,
        'title': event.title,
        'place': event.place, 'date': str(event.date),
        'category': event.category_id,
        'tag': [tag.id for tag in event.tag.all()],
        'group': event.group_id,
        'begin_time': str(event.begin_time),
        'end_time': str(event.end_time),
        'last_editor': event.last_editor_id,
        'image': [image.id for image in event.image.all()],
        'content': event.content
        } for event in Event.objects.all().order_by('id')]
        return JsonResponse(events, safe=False)
    return HttpResponseNotAllowed(['GET'])

def get_event_filtered(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if request.method == 'GET':
        req_data = json.loads(request.body.decode())
        filter_options_dict = req_data['filter_options']
        sort_options_list = req_data['sort_options']
        count_options_dict = req_data['count_options']
        event_objects = Event.objects.all()
        # Filter(Dictionary)
        if 'tag' in filter_options_dict.keys():
            event_objects = event_objects.filter(tag_id__in=filter_options_dict['tag'])
        if 'category' in filter_options_dict.keys():
            event_objects = event_objects.filter(category_id__in=filter_options_dict['category'])
        if 'including' in filter_options_dict.keys():
            including_list = filter_options_dict['including']
            q_list = [Q(content__contains=x) for x in including_list]
            event_objects = event_objects.filter(reduce(operator.and_, q_list))
        # group like my notification
        # event like
        # Sort(List)
        for option in sort_options_list:
            if option == 'id':
                event_objects = event_objects.order_by('id')
            if option == 'date':
                event_objects = event_objects.order_by('date')
        # like
        # Count(Dictionary)
        if 'from' in count_options_dict.keys():
            event_objects = event_objects[count_options_dict['from']:]
        if 'num' in count_options_dict.keys():
            event_objects = event_objects[:count_options_dict['num']]
        events = [{'id': event.id,
        'title': event.title,
        'place': event.place, 'date': str(event.date),
        'category': event.category.id,
        'tag': [tag.id for tag in event.tag.all()],
        'group': event.group.id,
        'begin_time': str(event.begin_time),
        'end_time': str(event.end_time),
        'last_editor': event.last_editor.id,
        'image': [image.id for image in event.image.all()],
        'content': event.content
        } for event in event_objects]
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
        tag_id_list = req_data['tag']
        image_id_list = req_data['image']
        category_id = req_data['category']
        group_id = req_data['group']
        last_editor_id = req_data['last_editor']
        event = Event(
            title=req_data['title'],
            place=req_data['place'], date=req_data['date'],
            category_id=category_id, group_id=group_id,
            begin_time=req_data['begin_time'], end_time=req_data['end_time'],
            last_editor_id=last_editor_id,
            content=req_data['content']
        )
        with transaction.atomic():
            event.save()
            for t_id in tag_id_list:
                event.tag.add(t_id)
            for i_id in image_id_list:
                event.image.add(i_id)
            event.save()
        event_dict = {'id': event.id,
        'title': event.title,
        'place': event.place, 'date': str(event.date),
        'category': event.category_id,
        'tag': [tag.id for tag in event.tag.all()],
        'group': event.group_id,
        'begin_time': str(event.begin_time),
        'end_time': str(event.end_time),
        'last_editor': event.last_editor_id,
        'image': [image.id for image in event.image.all()],
        'content': event.content}
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
        event_dict = {'id': event.id,
        'title': event.title,
        'place': event.place, 'date': event.date,
        'category': event.category_id,
        'tag': [tag.id for tag in event.tag.all()],
        'group': event.group_id,
        'begin_time': event.begin_time,
        'end_time': event.end_time,
        'last_editor': event.last_editor_id,
        'image': [image.id for image in event.image.all()],
        'content': event.content}
        return JsonResponse(event_dict)
    if request.method == 'PUT':
        req_data = json.loads(request.body.decode())
        with transaction.atomic():
            if 'category' in req_data.keys():
                event.category_id = req_data['category']
            if 'group' in req_data.keys():
                event.group_id = req_data['group']
            if 'last_editor' in req_data.keys():
                event.last_editor_id = req_data['last_editor']
            if 'title' in req_data.keys():
                event.title = req_data['title']
            if 'place' in req_data.keys():
                event.place = req_data['place']
            if 'date' in req_data.keys():
                event.date = req_data['date']
            if 'begin_time' in req_data.keys():
                event.begin_time = req_data['begin_time']
            if 'end_time' in req_data.keys():
                event.end_time = req_data['end_time']
            if 'content' in req_data.keys():
                event.content = req_data['content']
            if 'tag' in req_data.keys():
                tag_id_list = req_data['tag']
                event.tag.clear()
                for t_id in tag_id_list:
                    event.tag.add(t_id)
            if 'image' in req_data.keys():
                image_id_list = req_data['image']
                event.image.clear()
                for i_id in image_id_list:
                    event.image.add(i_id)
            event.save()
        event_dict = {'id': event.id,
        'title': event.title,
        'place': event.place, 'date': str(event.date),
        'category': event.category_id,
        'tag': [tag.id for tag in event.tag.all()],
        'group': event.group_id,
        'begin_time': str(event.begin_time),
        'end_time': str(event.end_time),
        'last_editor': event.last_editor_id,
        'image': [image.id for image in event.image.all()],
        'content': event.content}
        return HttpResponse(content=json.dumps(event_dict), status=201)
    # DELETE
    event.delete()
    return HttpResponse(status=200)

# Group

def get_group_simple(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if request.method == 'GET':
        groups = [{'id': group.id, 'name': group.name,
        'king': group.king.id,
        'description': group.description, 'privacy': group.privacy
        } for group in Group.objects.all().order_by('id')]
        return JsonResponse(groups, safe=False)
    return HttpResponseNotAllowed(['GET'])

def get_group(request):

    '''
    a function docstring
    '''

    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])

    if request.method == 'GET':
        groups = [{'id': group.id, 'name': group.name,
        'member': [user.id for user in group.member.all()],
        'admin': [user.id for user in group.admin.all()],
        'king': group.king_id,
        'likes_group': [up.user.id for up in group.likes_group_userpreference.all()],
        'gets_notification': [up.user.id for up in group.gets_notification_userpreference.all()],
        'join_requests': [up.user.id for up in group.join_requests_userpreference.all()],
        'profile': group.profile_id,
        'description': group.description, 'privacy': group.privacy
        } for group in Group.objects.all().order_by('id')]
        return JsonResponse(groups, safe=False)
    return HttpResponseNotAllowed(['GET'])

def create_group(request):

    '''
    a function docstring
    '''

    if request.method not in ['POST']:
        return HttpResponseNotAllowed(['POST'])

    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        name = req_data['name']
        description = req_data['description']
        king_id = req_data['king']
        group = Group.add_new_group(
            name=name, king_id=king_id,
            description=description
        ) # privacy = 1
        group_dict = {'id': group.id, 'name': group.name,
        'king': group.king_id,
        'description': group.description, 'privacy': group.privacy}
        return HttpResponse(content=json.dumps(group_dict), status=201)
    return HttpResponseNotAllowed(['POST'])

# Others

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
