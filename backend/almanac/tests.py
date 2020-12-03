'''
a standard docstring
'''

import json
import re
import os
from django.test import TransactionTestCase, TestCase, Client
from django.core import mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.conf import settings

from .models import User, UserPreference, \
    University, Department, Background, Language, Tag, Category, Image, \
    Group, Event

# Create your tests here.

class AlmanacCsrfTestCase(TestCase):

    '''
    a class docstring
    '''

    def setUp(self):

        '''
        a function docstring
        '''

        User.objects.all().delete()
        user1 = User.objects.create_user(
            username='ray017', first_name='Raegeon',
            last_name='Lee', password='password',
            email='cbda117@snu.ac.kr', is_active=False
        )
        UserPreference.add_new_preference(
            user_id=user1.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )

    def test_csrf(self):

        '''
        a function docstring
        '''

        client = Client(enforce_csrf_checks=True)

        response = client.head('/api/token/')
        self.assertEqual(response.status_code, 405)

        response = client.head('/api/')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr',
            'university': University.get_default_id(),
            'department': Department.get_default_id()}),
            content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr',
            'university': University.get_default_id(),
            'department': Department.get_default_id()}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(mail.outbox), 1)
        mail_sent = mail.outbox[0]
        self.assertEqual(mail_sent.subject, 'Almanac Email Verification')
        self.assertEqual(len(mail_sent.to), 1)
        self.assertEqual(mail_sent.to[0], 'taekop@snu.ac.kr')
        user = User.objects.get(username='taekop')
        self.assertEqual(user.is_active, False)
        body_pt = ('Hello, taekop. Welcome to the Almanac Service. You can activate your account '
        'via the link \nhttp://localhost:3000/signup/activate/{}/').format(
            urlsafe_base64_encode(force_bytes(user.id)))
        self.assertIn(body_pt, mail_sent.body)

class AlmanacSignupTestCase(TransactionTestCase):

    '''
    a class docstring
    '''

    def setUp(self):

        '''
        a function docstring
        '''

        User.objects.all().delete()
        user1 = User.objects.create_user(
            username='ray017', first_name='Raegeon',
            last_name='Lee', password='password',
            email='cbda117@snu.ac.kr', is_active=False
        )
        UserPreference.add_new_preference(
            user_id=user1.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )


    def test_signup(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.put('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr',
            'university': University.get_default_id(),
            'department': Department.get_default_id()}),
            content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr',
            'university': University.get_default_id(),
            'department': Department.get_default_id()}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password3', 'email': 'taekop@snu.ac.kr',
            'university': University.get_default_id(),
            'department': Department.get_default_id()}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode(), "Username Taken")

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr',
            'university': University.get_default_id(),
            'department': Department.get_default_id()}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/api/signup/', json.dumps(
            {'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password3', 'email': 'taekop@snu.ac.kr',
            'university': University.get_default_id(),
            'department': Department.get_default_id()}),
            content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop2', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr',
            'university': University.get_default_id(),
            'department': Department.get_default_id()}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_activate(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr',
            'university': University.get_default_id(),
            'department': Department.get_default_id()}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(mail.outbox), 1)
        mail_sent = mail.outbox[0]
        regx = re.search(r"http://localhost:3000/signup/activate/(\S+)/(\S+)", mail_sent.body)
        uidb64 = regx.group(1)
        token = regx.group(2)
        token_wrong = token[:-1] + ('1' if token[-1] == '0' else '0')

        response = client.head('/api/signup/activate/{}/{}/'.format(uidb64, token))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/signup/activate/{}/{}/'.format(uidb64, token_wrong))
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/signup/activate/{}/{}/'.format(uidb64, token))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode(), "Account Activated Safely")
        user = User.objects.get(username='taekop')
        self.assertEqual(user.is_active, True)

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr',
            'university': University.get_default_id(),
            'department': Department.get_default_id()}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode(), "Already Activated")

    def test_signin(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr',
            'university': University.get_default_id(),
            'department': Department.get_default_id()}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(mail.outbox), 1)
        mail_sent = mail.outbox[0]
        regx = re.search(r"http://localhost:3000/signup/activate/(\S+)/(\S+)", mail_sent.body)
        uidb64 = regx.group(1)
        token = regx.group(2)

        response = client.get('/api/signup/activate/{}/{}/'.format(uidb64, token))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode(), "Account Activated Safely")

        response = client.put('/api/signin/', json.dumps(
            {'username': 'not_a_user', 'password': 'password3'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'not_a_user', 'password': 'password3'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password3'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'ray017', 'password': 'password'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_signout(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr',
            'university': University.get_default_id(),
            'department': Department.get_default_id()}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(mail.outbox), 1)
        mail_sent = mail.outbox[0]
        regx = re.search(r"http://localhost:3000/signup/activate/(\S+)/(\S+)", mail_sent.body)
        uidb64 = regx.group(1)
        token = regx.group(2)

        response = client.get('/api/signup/activate/{}/{}/'.format(uidb64, token))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode(), "Account Activated Safely")

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.head('/api/signout/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/signout/')
        self.assertEqual(response.status_code, 204)

class AlmanacUserTestCase(TransactionTestCase):

    '''
    a class docstring
    '''

    def setUp(self):

        '''
        a function docstring
        '''

        User.objects.all().delete()
        user1 = User.objects.create(
            username='ray017', first_name='Raegeon',
            last_name='Lee', password='password',
            email='cbda117@snu.ac.kr', is_active=False
        )
        UserPreference.add_new_preference(
            user_id=user1.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        self.user2 = User.objects.create_user(
            username='taekop', first_name='Seungtaek',
            last_name='Oh', password='password2',
            email='taekop@snu.ac.kr', is_active=True
        )
        self.userpreference = UserPreference.add_new_preference(
            user_id=self.user2.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        self.group1 = Group.add_new_group(
            name='Group Name1',
            king_id=self.user2.id,
            description='Group Description1'
        )
        self.category1 = Category.objects.create(
            name='performance'
        )
        self.event1 = Event.objects.create(
            title='Event Title',
            category_id=self.category1.id,
            group_id=self.group1.id,
            place='Event Place',
            date='2020-11-05',
            begin_time='14:20:00',
            end_time='16:52:00',
            content='Event Content',
            last_editor_id=self.user2.id
        )

    def test_user_get_signin(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.head('/api/user/signin/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/user/signin/')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/user/signin/')
        self.assertEqual(response.json()['username'], 'taekop')
        self.assertEqual(response.json()['first_name'], 'Seungtaek')
        self.assertEqual(response.json()['last_name'], 'Oh')
        self.assertEqual(response.json()['email'], 'taekop@snu.ac.kr')
        self.assertEqual(response.json()['is_active'], True)
        self.assertEqual(response.json()['university'], University.get_default_id())
        self.assertEqual(response.json()['department'], Department.get_default_id())

    def test_user_get_signin_full(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.head('/api/user/signin/full/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/user/signin/full/')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/user/signin/full/')
        self.assertEqual(response.json()['username'], 'taekop')
        self.assertEqual(response.json()['first_name'], 'Seungtaek')
        self.assertEqual(response.json()['last_name'], 'Oh')
        self.assertEqual(response.json()['email'], 'taekop@snu.ac.kr')
        self.assertEqual(response.json()['is_active'], True)
        self.assertEqual(response.json()['university'], University.get_default_id())
        self.assertEqual(response.json()['department'], Department.get_default_id())
        self.assertEqual(response.json()['background'], Background.get_default_id())
        self.assertEqual(response.json()['language'], Language.get_default_id())
        self.assertIsInstance(response.json()['profile'], int)
        self.assertEqual(response.json()['likes'], [])
        self.assertEqual(response.json()['brings'], [])
        self.assertEqual(response.json()['join_requests'], [])
        self.assertEqual(response.json()['likes_group'], [])
        self.assertEqual(response.json()['gets_notification'], [])
        self.assertEqual(response.json()['members'], [self.group1.id])
        self.assertEqual(response.json()['admins'], [self.group1.id])
        self.assertEqual(response.json()['kings'], [self.group1.id])

    def test_user_get(self):

        '''
        a function docstring
        '''

        client = Client()

        id1=(User.objects.get(username='ray017').id)
        id2=(User.objects.get(username='taekop').id)
        id_wrong = max(id1, id2)+1

        response = client.head('/api/user/{}/'.format(id1))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/user/{}/'.format(id1))
        self.assertEqual(response.json()['username'], 'ray017')
        self.assertEqual(response.json()['first_name'], 'Raegeon')
        self.assertEqual(response.json()['last_name'], 'Lee')
        self.assertEqual(response.json()['email'], 'cbda117@snu.ac.kr')
        self.assertEqual(response.json()['is_active'], False)
        self.assertEqual(response.json()['university'], University.get_default_id())
        self.assertEqual(response.json()['department'], Department.get_default_id())

        response = client.get('/api/user/{}/'.format(id2))
        self.assertEqual(response.json()['username'], 'taekop')
        self.assertEqual(response.json()['first_name'], 'Seungtaek')
        self.assertEqual(response.json()['last_name'], 'Oh')
        self.assertEqual(response.json()['email'], 'taekop@snu.ac.kr')
        self.assertEqual(response.json()['is_active'], True)
        self.assertEqual(response.json()['university'], University.get_default_id())
        self.assertEqual(response.json()['department'], Department.get_default_id())

        response = client.get('/api/user/{}/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

    def test_user_get_full(self):

        '''
        a function docstring
        '''

        client = Client()

        id1=(User.objects.get(username='ray017').id)
        id2=(User.objects.get(username='taekop').id)
        id_wrong = max(id1, id2)+1

        response = client.head('/api/user/{}/full/'.format(id1))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/user/{}/full/'.format(id1))
        self.assertEqual(response.json()['username'], 'ray017')
        self.assertEqual(response.json()['first_name'], 'Raegeon')
        self.assertEqual(response.json()['last_name'], 'Lee')
        self.assertEqual(response.json()['email'], 'cbda117@snu.ac.kr')
        self.assertEqual(response.json()['is_active'], False)
        self.assertEqual(response.json()['university'], University.get_default_id())
        self.assertEqual(response.json()['department'], Department.get_default_id())
        self.assertEqual(response.json()['background'], Background.get_default_id())
        self.assertEqual(response.json()['language'], Language.get_default_id())
        self.assertIsInstance(response.json()['profile'], int)
        self.assertEqual(response.json()['likes'], [])
        self.assertEqual(response.json()['brings'], [])
        self.assertEqual(response.json()['join_requests'], [])
        self.assertEqual(response.json()['likes_group'], [])
        self.assertEqual(response.json()['gets_notification'], [])
        self.assertEqual(response.json()['members'], [])
        self.assertEqual(response.json()['admins'], [])
        self.assertEqual(response.json()['kings'], [])

        response = client.get('/api/user/{}/full/'.format(id2))
        self.assertEqual(response.json()['username'], 'taekop')
        self.assertEqual(response.json()['first_name'], 'Seungtaek')
        self.assertEqual(response.json()['last_name'], 'Oh')
        self.assertEqual(response.json()['email'], 'taekop@snu.ac.kr')
        self.assertEqual(response.json()['is_active'], True)
        self.assertEqual(response.json()['university'], University.get_default_id())
        self.assertEqual(response.json()['department'], Department.get_default_id())
        self.assertEqual(response.json()['background'], Background.get_default_id())
        self.assertEqual(response.json()['language'], Language.get_default_id())
        self.assertEqual(response.json()['likes'], [])
        self.assertEqual(response.json()['brings'], [])
        self.assertEqual(response.json()['join_requests'], [])
        self.assertEqual(response.json()['likes_group'], [])
        self.assertEqual(response.json()['gets_notification'], [])
        self.assertEqual(response.json()['members'], [self.group1.id])
        self.assertEqual(response.json()['admins'], [self.group1.id])
        self.assertEqual(response.json()['kings'], [self.group1.id])

        response = client.get('/api/user/{}/full/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

    def test_like_event_user(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.post('/api/user/signin/like_event/', json.dumps(
            {'event': self.event1.id, 'operation': 'add'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.put('/api/user/signin/like_event/', json.dumps(
            {'event': self.event1.id, 'operation': 'add'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/user/signin/like_event/', json.dumps(
            {'event': self.event1.id, 'operation': 'add'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/user/signin/full/')
        self.assertEqual(response.json()['likes'],
        [self.event1.id])

        response = client.put('/api/user/signin/like_event/', json.dumps(
            {'event': self.event1.id, 'operation': 'remove'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/user/signin/full/')
        self.assertEqual(response.json()['likes'],
        [])

class AlmanacUnivDeptCatTag(TransactionTestCase):

    '''
    a class docstring
    '''

    def setUp(self):

        '''
        a function docstring
        '''

        user1 = User.objects.create(
            username='ray017', first_name='Raegeon',
            last_name='Lee', password='password',
            email='cbda117@snu.ac.kr', is_active=False
        )
        UserPreference.add_new_preference(
            user_id=user1.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        user2 = User.objects.create_user(
            username='taekop', first_name='Seungtaek',
            last_name='Oh', password='password2',
            email='taekop@snu.ac.kr', is_active=True
        )
        UserPreference.add_new_preference(
            user_id=user2.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        Tag.objects.create(
            name='waffle'
        )
        Category.objects.create(
            name='performance'
        )
        self.sample_image = Image.objects.create(
        )

    def test_university_general(self):

        '''
        a function docstring
        '''

        snu_id = University.objects.get(name='Seoul National University').id

        default_univ_id = University.get_default_id()
        default_univ = University.objects.get(id=default_univ_id)
        self.assertEqual(default_univ_id, snu_id)
        self.assertEqual('Seoul National University', str(default_univ))

    def test_get_create_university(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.head('/api/university/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/university/')
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['name'], 'Seoul National University')
        self.assertEqual(response.json()[0]['domain'], 'snu.ac.kr')

        response = client.post('/api/university/', json.dumps({'name': 'Yonsei University',
        'domain': 'yonsei.ac.kr'}),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('Yonsei University', response.content.decode())
        self.assertIn('yonsei.ac.kr', response.content.decode())

    def test_get_delete_university(self):

        '''
        a function docstring
        '''

        client = Client()

        id_snu=(University.objects.get(name='Seoul National University').id)
        id_wrong = id_snu+1

        response = client.head('/api/university/{}/'.format(id_snu))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/university/{}/'.format(id_snu))
        self.assertEqual(response.json()['name'], 'Seoul National University')
        self.assertEqual(response.json()['domain'], 'snu.ac.kr')

        response = client.get('/api/university/{}/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/university/{}/'.format(id_snu))
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/university/')
        self.assertEqual(len(response.json()), 0)

    def test_get_university_by_name(self):

        '''
        a function docstring
        '''

        client = Client()

        id_snu=(University.objects.get(name='Seoul National University').id)

        response = client.head('/api/university/name/{}/'.format('Hanyang University'))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/university/name/{}/'.format('Hanyang University'))
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/university/name/{}/'.format('Seoul National University'))
        self.assertEqual(response.json()['id'], id_snu)
        self.assertEqual(response.json()['name'], 'Seoul National University')
        self.assertEqual(response.json()['domain'], 'snu.ac.kr')

    def test_department_general(self):

        '''
        a function docstring
        '''

        cse_id = Department.objects.get(name='Computer Science Engineering').id

        default_dept_id = Department.get_default_id()
        default_dept = Department.objects.get(id=default_dept_id)
        self.assertEqual(default_dept_id, cse_id)
        self.assertEqual('Computer Science Engineering', str(default_dept))

    def test_get_create_department(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.head('/api/department/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/department/')
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['name'], 'Computer Science Engineering')

        response = client.post('/api/department/', json.dumps({'name': 'Mathematical Sciences'}),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('Mathematical Sciences', response.content.decode())

    def test_get_delete_department(self):

        '''
        a function docstring
        '''

        client = Client()

        id_cse=(Department.objects.get(name='Computer Science Engineering').id)
        id_wrong = id_cse+1

        response = client.head('/api/department/{}/'.format(id_cse))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/department/{}/'.format(id_cse))
        self.assertEqual(response.json()['name'], 'Computer Science Engineering')

        response = client.get('/api/department/{}/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/department/{}/'.format(id_cse))
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/department/')
        self.assertEqual(len(response.json()), 0)

    def test_get_department_by_name(self):

        '''
        a function docstring
        '''

        client = Client()

        id_cse=(Department.objects.get(name='Computer Science Engineering').id)

        response = client.head('/api/department/name/{}/'.format('Physics'))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/department/name/{}/'.format('Physics'))
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/department/name/{}/'.format('Computer Science Engineering'))
        self.assertEqual(response.json()['id'], id_cse)
        self.assertEqual(response.json()['name'], 'Computer Science Engineering')

    def test_get_create_category(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.head('/api/category/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/category/')
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['name'], 'performance')

        response = client.post('/api/category/', json.dumps({'name': 'ililhof'}),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('ililhof', response.content.decode())

    def test_get_delete_category(self):

        '''
        a function docstring
        '''

        client = Client()

        id_performance=(Category.objects.get(name='performance').id)
        id_wrong = id_performance+1

        response = client.head('/api/category/{}/'.format(id_performance))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/category/{}/'.format(id_performance))
        self.assertEqual(response.json()['name'], 'performance')

        response = client.get('/api/category/{}/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/category/{}/'.format(id_performance))
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/category/')
        self.assertEqual(len(response.json()), 0)

    def test_get_category_by_name(self):

        '''
        a function docstring
        '''

        client = Client()

        id_performance=(Category.objects.get(name='performance').id)

        response = client.head('/api/category/name/{}/'.format('ililhof'))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/category/name/{}/'.format('ililhof'))
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/category/name/{}/'.format('performance'))
        self.assertEqual(response.json()['id'], id_performance)
        self.assertEqual(response.json()['name'], 'performance')

    def test_get_create_tag(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.head('/api/tag/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/tag/')
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['name'], 'waffle')

        response = client.post('/api/tag/', json.dumps({'name': 'salad'}),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('salad', response.content.decode())

    def test_get_delete_tag(self):

        '''
        a function docstring
        '''

        client = Client()

        id_waffle=(Tag.objects.get(name='waffle').id)
        id_wrong = id_waffle+1

        response = client.head('/api/tag/{}/'.format(id_waffle))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/tag/{}/'.format(id_waffle))
        self.assertEqual(response.json()['name'], 'waffle')

        response = client.get('/api/tag/{}/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/tag/{}/'.format(id_waffle))
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/tag/')
        self.assertEqual(len(response.json()), 0)

    def test_get_tag_by_name(self):

        '''
        a function docstring
        '''

        client = Client()

        id_waffle=(Tag.objects.get(name='waffle').id)

        response = client.head('/api/tag/name/{}/'.format('salad'))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/tag/name/{}/'.format('salad'))
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/tag/name/{}/'.format('waffle'))
        self.assertEqual(response.json()['id'], id_waffle)
        self.assertEqual(response.json()['name'], 'waffle')

class AlmanacBackLangImTestCase(TransactionTestCase):

    '''
    a class docstring
    '''

    def setUp(self):

        '''
        a function docstring
        '''

        user1 = User.objects.create(
            username='ray017', first_name='Raegeon',
            last_name='Lee', password='password',
            email='cbda117@snu.ac.kr', is_active=False
        )
        UserPreference.add_new_preference(
            user_id=user1.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        user2 = User.objects.create_user(
            username='taekop', first_name='Seungtaek',
            last_name='Oh', password='password2',
            email='taekop@snu.ac.kr', is_active=True
        )
        UserPreference.add_new_preference(
            user_id=user2.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        Tag.objects.create(
            name='waffle'
        )
        Category.objects.create(
            name='performance'
        )
        self.sample_image = Image.objects.create(
        ) # final image (last id assumed)

    def test_background_general(self):

        '''
        a function docstring
        '''

        green_id = Background.objects.get(name='green').id

        default_back_id = Background.get_default_id()
        default_back = Background.objects.get(id=default_back_id)
        self.assertEqual(default_back_id, green_id)
        self.assertEqual('green', str(default_back))

    def test_get_create_background(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.head('/api/background/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/background/')
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['name'], 'green')

        response = client.post('/api/background/', json.dumps({'name': 'red'}),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('red', response.content.decode())

    def test_get_delete_background(self):

        '''
        a function docstring
        '''

        client = Client()

        id_1=(Background.objects.get(name='green').id)
        id_wrong = id_1+1

        response = client.head('/api/background/{}/'.format(id_1))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/background/{}/'.format(id_1))
        self.assertEqual(response.json()['name'], 'green')

        response = client.get('/api/background/{}/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/background/{}/'.format(id_1))
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/background/')
        self.assertEqual(len(response.json()), 0)

    def test_language_general(self):

        '''
        a function docstring
        '''

        english_id = Language.objects.get(name='English').id

        default_lang_id = Language.get_default_id()
        default_lang = Language.objects.get(id=default_lang_id)
        self.assertEqual(default_lang_id, english_id)
        self.assertEqual('English', str(default_lang))

    def test_get_create_language(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.head('/api/language/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/language/')
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['name'], 'English')

        response = client.post('/api/language/', json.dumps({'name': 'French'}),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('French', response.content.decode())

    def test_get_delete_language(self):

        '''
        a function docstring
        '''

        client = Client()

        id_1=(Language.objects.get(name='English').id)
        id_wrong = id_1+1

        response = client.head('/api/language/{}/'.format(id_1))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/language/{}/'.format(id_1))
        self.assertEqual(response.json()['name'], 'English')

        response = client.get('/api/language/{}/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/language/{}/'.format(id_1))
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/language/')
        self.assertEqual(len(response.json()), 0)

    def test_get_create_image(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.head('/api/image/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/image/')
        self.assertEqual(len(response.json()), 3) # 2(user1,2)+1
        self.assertEqual(response.json()[2]['image_file_url'], '/image/home.jpg')

        with open(settings.MEDIA_ROOT / 'image/test/signup.jpg', 'rb') as file_pt:
            response = client.post('/api/image/', {'name': 'signup', 'imagefile': [file_pt]})
        self.assertEqual(response.status_code, 201)
        self.assertIn('image/signup', response.content.decode())

        Image.objects.get(image_file='image/signup.jpg').delete()
        os.remove(settings.MEDIA_ROOT / 'image/signup.jpg')

    def test_get_delete_image(self):

        '''
        a function docstring
        '''

        client = Client()

        id_im=self.sample_image.id
        id_wrong = id_im+1

        response = client.head('/api/image/{}/'.format(id_im))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/image/{}/'.format(id_im))
        self.assertEqual(response.json()['image_file_url'], '/image/home.jpg')

        response = client.get('/api/image/{}/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/image/{}/'.format(id_im))
        self.assertEqual(response.status_code, 200)

class AlmanacEvent(TransactionTestCase):

    '''
    a class docstring
    '''

    def setUp(self):

        '''
        a function docstring
        '''

        user1 = User.objects.create_user(
            username='ray017', first_name='Raegeon',
            last_name='Lee', password='password',
            email='cbda117@snu.ac.kr', is_active=False
        )
        UserPreference.add_new_preference(
            user_id=user1.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        self.user2 = User.objects.create_user(
            username='taekop', first_name='Seungtaek',
            last_name='Oh', password='password2',
            email='taekop@snu.ac.kr', is_active=True
        )
        self.userpreference2 = UserPreference.add_new_preference(
            user_id=self.user2.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        self.user3 = User.objects.create_user(
            username='sdm1230', first_name='Dongmin',
            last_name='Shin', password='password3',
            email='sdm1230@snu.ac.kr', is_active=True
        )
        self.userpreference3 = UserPreference.add_new_preference(
            user_id=self.user3.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        self.user4 = User.objects.create_user(
            username='sdm369', first_name='Dongmin',
            last_name='Co', password='password4',
            email='sdm369@snu.ac.kr', is_active=True
        )
        self.userpreference4 = UserPreference.add_new_preference(
            user_id=self.user4.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        self.tag1 = Tag.objects.create(
            name='waffle'
        )
        self.tag2 = Tag.objects.create(
            name='winter'
        )
        self.tag3 = Tag.objects.create(
            name='dance'
        )
        self.tag4 = Tag.objects.create(
            name='flower'
        )
        self.category1 = Category.objects.create(
            name='performance'
        )
        self.category2 = Category.objects.create(
            name='ililhof'
        )
        self.group1 = Group.add_new_group(
            name='Group Name',
            king_id=self.user2.id,
            description='Group Description'
        )
        self.group2 = Group.add_new_group(
            name='Group Name3',
            king_id=self.user3.id,
            description='Group Description3'
        )
        self.group2.add_member(self.user2.id)
        self.group3 = Group.add_new_group(
            name='Group Name4',
            king_id=self.user3.id,
            description='Group Description4'
        )
        self.group3.add_member(self.user4.id)
        self.event1 = Event.objects.create(
            title='Event Title',
            category_id=self.category1.id,
            group_id=self.group1.id,
            place='Event Place',
            date='2020-11-05',
            begin_time='14:20:00',
            end_time='16:52:00',
            content='Event Content',
            last_editor_id=self.user2.id
        )
        self.event1.tag.add(self.tag1)
        self.event1.tag.add(self.tag2)
        self.event2 = Event.objects.create(
            title='Event Title2',
            category_id=self.category2.id,
            group_id=self.group2.id,
            place='Event Place2',
            date='2020-11-05',
            begin_time='14:30:00',
            end_time='16:55:00',
            content='Event Content2',
            last_editor_id=self.user3.id
        )
        self.event2.tag.add(self.tag2)
        self.event2.tag.add(self.tag3)
        self.event3 = Event.objects.create(
            title='Categorize Event Title3',
            category_id=self.category2.id,
            group_id=self.group2.id,
            place='Event Place3',
            date='2020-11-05',
            begin_time='14:55:00',
            end_time='16:45:00',
            content='Event Content3',
            last_editor_id=self.user3.id
        )
        self.event3.tag.add(self.tag2)
        self.event3.tag.add(self.tag3)
        self.event4 = Event.objects.create(
            title='Cat Event Title4',
            category_id=self.category1.id,
            group_id=self.group3.id,
            place='Event Place4',
            date='2020-11-05',
            begin_time='14:50:00',
            end_time='16:35:00',
            content='Event Content4',
            last_editor_id=self.user3.id
        )
        self.event4.tag.add(self.tag4)
        self.event5 = Event.objects.create(
            title='Event Title5',
            category_id=self.category1.id,
            group_id=self.group3.id,
            place='Event Place5',
            date='2020-11-04',
            begin_time='14:55:00',
            end_time='16:35:00',
            content='Event Content5',
            last_editor_id=self.user3.id
        )
        self.event5.tag.add(self.tag4)
        self.event6 = Event.objects.create(
            title='Event Title6',
            category_id=self.category1.id,
            group_id=self.group1.id,
            place='Event Place6',
            date='2020-11-03',
            begin_time='14:55:00',
            end_time='16:35:00',
            content='Cat Event Content6',
            last_editor_id=self.user2.id
        )
        self.event6.tag.add(self.tag2)
        self.event6.tag.add(self.tag4)
        self.event7 = Event.objects.create(
            title='Event Title7',
            category_id=self.category1.id,
            group_id=self.group3.id,
            place='Event Place7',
            date='2020-11-02',
            begin_time='14:55:00',
            end_time='16:35:00',
            content='Event Content7',
            last_editor_id=self.user3.id
        )
        self.event6.tag.add(self.tag3)
        self.event7.tag.add(self.tag4)
        self.userpreference2.likes.add(self.event2)
        self.userpreference2.likes.add(self.event4)
        self.userpreference2.likes.add(self.event5)
        self.userpreference2.likes.add(self.event7)
        self.userpreference3.likes.add(self.event1)
        self.userpreference3.likes.add(self.event2)
        self.userpreference3.likes.add(self.event7)
        self.userpreference4.likes.add(self.event5)
        self.userpreference4.likes.add(self.event7)
        self.userpreference2.brings.add(self.event6)
        self.userpreference2.brings.add(self.event7)
        self.userpreference4.brings.add(self.event6)
        self.userpreference2.likes_group.add(self.group1)
        self.userpreference2.gets_notification.add(self.group3)

    def test_get_event_simple(self):

        '''
        a function docstring
        '''

        client = Client()

        id_event = self.event1.id

        response = client.head('/api/event/simple/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/event/simple/')
        self.assertEqual(len(response.json()), 7)
        self.assertEqual(response.json()[0]['id'], id_event)
        self.assertEqual(response.json()[0]['title'], 'Event Title')
        self.assertEqual(response.json()[0]['category'], self.event1.category_id)
        self.assertEqual(response.json()[0]['group'], self.event1.group_id)
        self.assertEqual(response.json()[0]['date'], self.event1.date)
        self.assertEqual(response.json()[0]['begin_time'], self.event1.begin_time)
        self.assertEqual(response.json()[0]['end_time'], self.event1.end_time)

    def test_get_event(self):

        '''
        a function docstring
        '''

        client = Client()

        id_event = self.event1.id

        response = client.head('/api/event/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/event/')
        self.assertEqual(len(response.json()), 7)
        self.assertEqual(response.json()[0]['id'], id_event)
        self.assertEqual(response.json()[0]['title'], 'Event Title')
        self.assertEqual(response.json()[0]['category'], self.event1.category_id)
        self.assertEqual(response.json()[0]['group'], self.event1.group_id)
        self.assertEqual(response.json()[0]['tag'], [self.tag1.id, self.tag2.id])
        self.assertEqual(response.json()[0]['place'], self.event1.place)
        self.assertEqual(response.json()[0]['date'], self.event1.date)
        self.assertEqual(response.json()[0]['begin_time'], self.event1.begin_time)
        self.assertEqual(response.json()[0]['end_time'], self.event1.end_time)
        self.assertEqual(response.json()[0]['content'], self.event1.content)
        self.assertEqual(response.json()[0]['image'], [])
        self.assertEqual(response.json()[0]['last_editor'], self.event1.last_editor_id)

    def test_create_event(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.put('/api/event/create/', json.dumps({
            'title': 'New Event Title',
            'category': self.category1.id,
            'group': self.group1.id,
            'place': 'New Event Place',
            'date': '2020-11-06',
            'begin_time': '08:20:00',
            'end_time': '13:40:00',
            'content': 'New Event Content',
            'last_editor': self.user2.id,
            'image': [],
            'tag': [self.tag1.id]
        }),
        content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/event/create/', json.dumps({
            'title': 'New Event Title',
            'category': self.category1.id,
            'group': self.group1.id,
            'place': 'New Event Place',
            'date': '2020-11-06',
            'begin_time': '08:20:00',
            'end_time': '13:40:00',
            'content': 'New Event Content',
            'last_editor': self.user2.id,
            'image': [],
            'tag': [self.tag1.id]
        }),
        content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/event/create/', json.dumps({
            'title': 'New Event Title',
            'category': self.category1.id,
            'group': self.group1.id,
            'place': 'New Event Place',
            'date': '2020-11-06',
            'begin_time': '08:20:00',
            'end_time': '13:40:00',
            'content': 'New Event Content',
            'last_editor': self.user2.id,
            'image': [],
            'tag': [self.tag1.id]
        }),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('New Event Title', response.content.decode())
        self.assertIn('New Event Place', response.content.decode())
        self.assertIn('New Event Content', response.content.decode())

    def test_get_single_event(self):

        '''
        a function docstring
        '''

        client = Client()

        id_event = self.event1.id
        id_wrong = id_event+10

        response = client.head('/api/event/{}/'.format(id_event))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/event/{}/'.format(id_event))
        self.assertEqual(response.json()['id'], id_event)
        self.assertEqual(response.json()['title'], 'Event Title')
        self.assertEqual(response.json()['category'], self.event1.category_id)
        self.assertEqual(response.json()['group'], self.event1.group_id)
        self.assertEqual(response.json()['date'], self.event1.date)
        self.assertEqual(response.json()['begin_time'], self.event1.begin_time)
        self.assertEqual(response.json()['end_time'], self.event1.end_time)

        response = client.get('/api/event/{}/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

    def test_get_single_event_full(self):

        '''
        a function docstring
        '''

        client = Client()

        id_event = self.event1.id
        id_wrong = id_event+10

        response = client.head('/api/event/{}/full/'.format(id_event))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/event/{}/full/'.format(id_event))
        self.assertEqual(response.json()['id'], id_event)
        self.assertEqual(response.json()['title'], 'Event Title')
        self.assertEqual(response.json()['category'], self.event1.category_id)
        self.assertEqual(response.json()['group'], self.event1.group_id)
        self.assertEqual(response.json()['tag'], [self.tag1.id, self.tag2.id])
        self.assertEqual(response.json()['place'], self.event1.place)
        self.assertEqual(response.json()['date'], self.event1.date)
        self.assertEqual(response.json()['begin_time'], self.event1.begin_time)
        self.assertEqual(response.json()['end_time'], self.event1.end_time)
        self.assertEqual(response.json()['content'], self.event1.content)
        self.assertEqual(response.json()['image'], [])
        self.assertEqual(response.json()['last_editor'], self.event1.last_editor_id)

        response = client.get('/api/event/{}/full/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

    def test_edit_event_full(self):

        '''
        a function docstring
        '''

        client = Client()

        id_event = self.event1.id

        response = client.put('/api/event/{}/full/'.format(id_event), json.dumps({
        }),
        content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/event/{}/full/'.format(id_event), json.dumps({
        }),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('Event Title', response.content.decode())
        self.assertIn('Event Place', response.content.decode())
        self.assertIn('Event Content', response.content.decode())

        response = client.put('/api/event/{}/full/'.format(id_event), json.dumps({
            'title': 'New Event Title',
            'category': self.category1.id,
            'group': self.group1.id,
            'place': 'New Event Place',
            'date': '2020-11-06',
            'begin_time': '08:20:00',
            'end_time': '13:40:00',
            'content': 'New Event Content',
            'last_editor': self.user2.id,
            'image': [],
            'tag': [self.tag1.id]
        }),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('New Event Title', response.content.decode())
        self.assertIn('New Event Place', response.content.decode())
        self.assertIn('New Event Content', response.content.decode())

        response = client.get('/api/event/{}/full/'.format(id_event)) #id_event??
        self.assertEqual(response.json()['id'], id_event)
        self.assertEqual(response.json()['title'], 'New Event Title')
        self.assertEqual(response.json()['category'], self.category1.id)
        self.assertEqual(response.json()['group'], self.group1.id)
        self.assertEqual(response.json()['tag'], [self.tag1.id])
        self.assertEqual(response.json()['place'], 'New Event Place')
        self.assertEqual(response.json()['date'], '2020-11-06')
        self.assertEqual(response.json()['begin_time'], '08:20:00')
        self.assertEqual(response.json()['end_time'], '13:40:00')
        self.assertEqual(response.json()['content'], 'New Event Content')
        self.assertEqual(response.json()['image'], [])
        self.assertEqual(response.json()['last_editor'], self.user2.id)

    def test_delete_event_full(self):

        '''
        a function docstring
        '''

        client = Client()

        id_event = self.event1.id

        response = client.delete('/api/event/{}/full/'.format(id_event))
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.delete('/api/event/{}/full/'.format(id_event))
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/event/')
        self.assertEqual(len(response.json()), 6)

    def test_filtered_event1(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.put('/api/event/filtered/', json.dumps({
            'filter_options': {},
            'sort_options': [],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {},
            'sort_options': [],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {},
            'sort_options': [],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 7)
        self.assertEqual(response.json()[0]['id'], self.event1.id)
        self.assertEqual(response.json()[1]['id'], self.event2.id)
        self.assertEqual(response.json()[2]['id'], self.event3.id)
        self.assertEqual(response.json()[3]['id'], self.event4.id)
        self.assertEqual(response.json()[4]['id'], self.event5.id)
        self.assertEqual(response.json()[5]['id'], self.event6.id)
        self.assertEqual(response.json()[6]['id'], self.event7.id)

    def test_filtered_event2(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {},
            'sort_options': [],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 7)
        self.assertEqual(response.json()[0]['id'], self.event1.id)
        self.assertEqual(response.json()[1]['id'], self.event2.id)
        self.assertEqual(response.json()[2]['id'], self.event3.id)
        self.assertEqual(response.json()[3]['id'], self.event4.id)
        self.assertEqual(response.json()[4]['id'], self.event5.id)
        self.assertEqual(response.json()[5]['id'], self.event6.id)
        self.assertEqual(response.json()[6]['id'], self.event7.id)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {},
            'sort_options': ['date'],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 7)
        self.assertEqual(response.json()[0]['id'], self.event7.id)
        self.assertEqual(response.json()[1]['id'], self.event6.id)
        self.assertEqual(response.json()[2]['id'], self.event5.id)
        self.assertEqual(response.json()[3]['id'], self.event1.id)
        self.assertEqual(response.json()[4]['id'], self.event2.id)
        self.assertEqual(response.json()[5]['id'], self.event3.id)
        self.assertEqual(response.json()[6]['id'], self.event4.id)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {},
            'sort_options': ['begin_time'],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 7)
        self.assertEqual(response.json()[0]['id'], self.event7.id)
        self.assertEqual(response.json()[1]['id'], self.event6.id)
        self.assertEqual(response.json()[2]['id'], self.event5.id)
        self.assertEqual(response.json()[3]['id'], self.event1.id)
        self.assertEqual(response.json()[4]['id'], self.event2.id)
        self.assertEqual(response.json()[5]['id'], self.event4.id)
        self.assertEqual(response.json()[6]['id'], self.event3.id)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {},
            'sort_options': ['end_time'],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 7)
        self.assertEqual(response.json()[0]['id'], self.event7.id)
        self.assertEqual(response.json()[1]['id'], self.event6.id)
        self.assertEqual(response.json()[2]['id'], self.event5.id)
        self.assertEqual(response.json()[3]['id'], self.event4.id)
        self.assertEqual(response.json()[4]['id'], self.event3.id)
        self.assertEqual(response.json()[5]['id'], self.event1.id)
        self.assertEqual(response.json()[6]['id'], self.event2.id)

    def test_filtered_event3(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {},
            'sort_options': ['likes'],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 7)
        self.assertEqual(response.json()[0]['id'], self.event7.id)
        self.assertEqual(response.json()[1]['id'], self.event5.id)
        self.assertEqual(response.json()[2]['id'], self.event2.id)
        self.assertEqual(response.json()[3]['id'], self.event1.id)
        self.assertEqual(response.json()[4]['id'], self.event4.id)
        self.assertEqual(response.json()[5]['id'], self.event6.id)
        self.assertEqual(response.json()[6]['id'], self.event3.id)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {},
            'sort_options': ['brings'],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 7)
        self.assertEqual(response.json()[0]['id'], self.event6.id)
        self.assertEqual(response.json()[1]['id'], self.event7.id)
        self.assertEqual(response.json()[2]['id'], self.event5.id)
        self.assertEqual(response.json()[3]['id'], self.event1.id)
        self.assertEqual(response.json()[4]['id'], self.event2.id)
        self.assertEqual(response.json()[5]['id'], self.event3.id)
        self.assertEqual(response.json()[6]['id'], self.event4.id)

    def test_filtered_event4(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {
                'tag': [self.tag4.id]
            },
            'sort_options': [],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 4)
        self.assertEqual(response.json()[0]['id'], self.event4.id)
        self.assertEqual(response.json()[1]['id'], self.event5.id)
        self.assertEqual(response.json()[2]['id'], self.event6.id)
        self.assertEqual(response.json()[3]['id'], self.event7.id)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {
                'category': [self.category2.id]
            },
            'sort_options': [],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(response.json()[0]['id'], self.event2.id)
        self.assertEqual(response.json()[1]['id'], self.event3.id)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {
                'including': ['Cat']
            },
            'sort_options': [],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 3)
        self.assertEqual(response.json()[0]['id'], self.event3.id)
        self.assertEqual(response.json()[1]['id'], self.event4.id)
        self.assertEqual(response.json()[2]['id'], self.event6.id)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {
                'group': ['like']
            },
            'sort_options': [],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(response.json()[0]['id'], self.event1.id)
        self.assertEqual(response.json()[1]['id'], self.event6.id)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {
                'group': ['my']
            },
            'sort_options': [],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 4)
        self.assertEqual(response.json()[0]['id'], self.event1.id)
        self.assertEqual(response.json()[1]['id'], self.event2.id)
        self.assertEqual(response.json()[2]['id'], self.event3.id)
        self.assertEqual(response.json()[3]['id'], self.event6.id)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {
                'group': ['notification']
            },
            'sort_options': [],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 3)
        self.assertEqual(response.json()[0]['id'], self.event4.id)
        self.assertEqual(response.json()[1]['id'], self.event5.id)
        self.assertEqual(response.json()[2]['id'], self.event7.id)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {
                'group_exact': [self.group1.id, self.group3.id]
            },
            'sort_options': [],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 5)
        self.assertEqual(response.json()[0]['id'], self.event1.id)
        self.assertEqual(response.json()[1]['id'], self.event4.id)
        self.assertEqual(response.json()[2]['id'], self.event5.id)
        self.assertEqual(response.json()[3]['id'], self.event6.id)
        self.assertEqual(response.json()[4]['id'], self.event7.id)

    def test_filtered_event5(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {
                'event': ['like']
            },
            'sort_options': [],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 4)
        self.assertEqual(response.json()[0]['id'], self.event2.id)
        self.assertEqual(response.json()[1]['id'], self.event4.id)
        self.assertEqual(response.json()[2]['id'], self.event5.id)
        self.assertEqual(response.json()[3]['id'], self.event7.id)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {
                'date': {
                    'begin_date': '2020-11-03',
                    'end_date': '2020-11-04'
                }
            },
            'sort_options': [],
            'count_options': {}
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(response.json()[0]['id'], self.event5.id)
        self.assertEqual(response.json()[1]['id'], self.event6.id)

    def test_filtered_event6(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {},
            'sort_options': [],
            'count_options': {
                'from': 3
            }
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 4)
        self.assertEqual(response.json()[0]['id'], self.event4.id)
        self.assertEqual(response.json()[1]['id'], self.event5.id)
        self.assertEqual(response.json()[2]['id'], self.event6.id)
        self.assertEqual(response.json()[3]['id'], self.event7.id)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {},
            'sort_options': [],
            'count_options': {
                'num': 4
            }
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 4)
        self.assertEqual(response.json()[0]['id'], self.event1.id)
        self.assertEqual(response.json()[1]['id'], self.event2.id)
        self.assertEqual(response.json()[2]['id'], self.event3.id)
        self.assertEqual(response.json()[3]['id'], self.event4.id)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {
                'group': ['my']
            },
            'sort_options': [],
            'count_options': {
                'from': 1,
                'num': 2
            }
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(response.json()[0]['id'], self.event2.id)
        self.assertEqual(response.json()[1]['id'], self.event3.id)

        response = client.post('/api/event/filtered/', json.dumps({
            'filter_options': {
                'group': ['my']
            },
            'sort_options': ['end_time'],
            'count_options': {
                'from': 1,
                'num': 2
            }
        }),
        content_type='application/json')
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(response.json()[0]['id'], self.event3.id)
        self.assertEqual(response.json()[1]['id'], self.event1.id)

class AlmanacGroup(TransactionTestCase):

    '''
    a class docstring
    '''

    def setUp(self):

        '''
        a function docstring
        '''

        user1 = User.objects.create_user(
            username='ray017', first_name='Raegeon',
            last_name='Lee', password='password',
            email='cbda117@snu.ac.kr', is_active=False
        )
        UserPreference.add_new_preference(
            user_id=user1.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        self.user2 = User.objects.create_user(
            username='taekop', first_name='Seungtaek',
            last_name='Oh', password='password2',
            email='taekop@snu.ac.kr', is_active=True
        )
        self.userpreference2 = UserPreference.add_new_preference(
            user_id=self.user2.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        self.user3 = User.objects.create_user(
            username='sdm1230', first_name='Dongmin',
            last_name='Shin', password='password3',
            email='sdm1230@snu.ac.kr', is_active=True
        )
        self.userpreference3 = UserPreference.add_new_preference(
            user_id=self.user3.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        self.user4 = User.objects.create_user(
            username='sdm369', first_name='Dongmin',
            last_name='Co', password='password4',
            email='sdm369@snu.ac.kr', is_active=True
        )
        self.userpreference4 = UserPreference.add_new_preference(
            user_id=self.user4.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        self.user5 = User.objects.create_user(
            username='sdm000', first_name='Dongmin',
            last_name='Coco', password='password5',
            email='sdm000@snu.ac.kr', is_active=True
        )
        self.userpreference5 = UserPreference.add_new_preference(
            user_id=self.user5.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        self.user6 = User.objects.create_user(
            username='sdm0000', first_name='Dongmin',
            last_name='Cococo', password='password6',
            email='sdm0000@snu.ac.kr', is_active=True
        )
        self.userpreference6 = UserPreference.add_new_preference(
            user_id=self.user6.id,
            university_id=University.get_default_id(),
            department_id=Department.get_default_id()
        )
        self.group1 = Group.add_new_group(
            name='Group Name',
            king_id=self.user2.id,
            description='Group Description'
        )
        self.group1.add_admin(self.user3.id)
        self.group1.add_member(self.user5.id)
        self.group2 = Group.add_new_group(
            name='Cat Group Name3',
            king_id=self.user3.id,
            description='Group Description3'
        )
        self.group2.add_member(self.user2.id)
        self.group3 = Group.add_new_group(
            name='Catholic Group Name4',
            king_id=self.user3.id,
            description='Group Description4'
        )
        self.group3.add_member(self.user4.id)
        self.group4 = Group.add_new_group(
            name='Group Name5',
            king_id=self.user3.id,
            description='DevCat Group Description5'
        )
        self.group4.add_member(self.user4.id)
        self.group5 = Group.add_new_group(
            name='Group Name6',
            king_id=self.user2.id,
            description='Group Description6'
        )
        self.group5.add_member(self.user4.id)
        self.group5.add_admin(self.user3.id)
        self.userpreference2.likes_group.add(self.group1)
        self.userpreference6.likes_group.add(self.group1)
        self.userpreference6.likes_group.add(self.group2)
        self.userpreference4.join_requests.add(self.group1)
        self.userpreference2.gets_notification.add(self.group3)
        self.userpreference4.gets_notification.add(self.group1)
        self.userpreference5.gets_notification.add(self.group1)
        self.sample_image = Image.objects.create(
        )

    def test_get_group(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.head('/api/group/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/group/')
        self.assertEqual(len(response.json()), 5)
        self.assertEqual(response.json()[0]['id'], self.group1.id)
        self.assertEqual(response.json()[0]['name'], self.group1.name)
        self.assertEqual(response.json()[0]['king'], self.group1.king_id)
        self.assertEqual(response.json()[0]['admin'], [self.user2.id, self.user3.id])
        self.assertEqual(response.json()[0]['member'],
        [self.user2.id, self.user3.id, self.user5.id])
        self.assertEqual(response.json()[0]['likes_group'], [self.user2.id, self.user6.id])
        self.assertEqual(response.json()[0]['gets_notification'], [self.user4.id, self.user5.id])
        self.assertEqual(response.json()[0]['join_requests'], [self.user4.id])
        self.assertEqual(response.json()[0]['description'], self.group1.description)
        self.assertEqual(response.json()[0]['privacy'], Group.privacy_default)

    def test_get_group_simple(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.head('/api/group/simple/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/group/simple/')
        self.assertEqual(len(response.json()), 5)
        self.assertEqual(response.json()[0]['id'], self.group1.id)
        self.assertEqual(response.json()[0]['name'], self.group1.name)
        self.assertEqual(response.json()[0]['king'], self.group1.king_id)
        self.assertEqual(response.json()[0]['description'], self.group1.description)
        self.assertEqual(response.json()[0]['privacy'], Group.privacy_default)

    def test_create_group(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.put('/api/group/create/', json.dumps({
            'name': 'New Group Name',
            'king': self.user2.id,
            'description': 'New Group Description'
        }),
        content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/group/create/', json.dumps({
            'name': 'New Group Name',
            'king': self.user2.id,
            'description': 'New Group Description'
        }),
        content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/group/create/', json.dumps({
            'name': 'New Group Name',
            'king': self.user2.id,
            'description': 'New Group Description'
        }),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('New Group Name', response.content.decode())
        self.assertIn('New Group Description', response.content.decode())

    def test_get_single_group(self):

        '''
        a function docstring
        '''

        client = Client()

        id_group = self.group1.id
        id_wrong = id_group+20

        response = client.head('/api/group/{}/'.format(id_group))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/group/{}/'.format(id_group))
        self.assertEqual(response.json()['id'], self.group1.id)
        self.assertEqual(response.json()['name'], self.group1.name)
        self.assertEqual(response.json()['king'], self.group1.king_id)
        self.assertEqual(response.json()['description'], self.group1.description)

        response = client.get('/api/group/{}/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

    def test_get_single_group_full(self):

        '''
        a function docstring
        '''

        client = Client()

        id_group = self.group1.id
        id_wrong = id_group+20

        response = client.head('/api/group/{}/full/'.format(id_group))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/group/{}/full/'.format(id_group))
        self.assertEqual(response.json()['id'], self.group1.id)
        self.assertEqual(response.json()['name'], self.group1.name)
        self.assertEqual(response.json()['king'], self.group1.king_id)
        self.assertEqual(response.json()['admin'], [self.user2.id, self.user3.id])
        self.assertEqual(response.json()['member'],
        [self.user2.id, self.user3.id, self.user5.id])
        self.assertEqual(response.json()['likes_group'], [self.user2.id, self.user6.id])
        self.assertEqual(response.json()['gets_notification'], [self.user4.id, self.user5.id])
        self.assertEqual(response.json()['join_requests'], [self.user4.id])
        self.assertEqual(response.json()['description'], self.group1.description)
        self.assertEqual(response.json()['privacy'], Group.privacy_default)

        response = client.get('/api/group/{}/full/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

    def test_delete_group_full(self):

        '''
        a function docstring
        '''

        client = Client()

        id_group = self.group1.id

        response = client.delete('/api/group/{}/full/'.format(id_group))
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.delete('/api/group/{}/full/'.format(id_group))
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/group/')
        self.assertEqual(len(response.json()), 4)

    def test_member_modify_group(self):

        '''
        a function docstring
        '''

        client = Client()

        id_group = self.group1.id
        id_wrong = id_group+20

        response = client.post('/api/group/{}/member/'.format(id_group), json.dumps(
            {'user': self.user5.id, 'operation': 'remove'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.put('/api/group/{}/member/'.format(id_wrong), json.dumps(
            {'user': self.user5.id, 'operation': 'remove'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.put('/api/group/{}/member/'.format(id_group), json.dumps(
            {'user': self.user5.id, 'operation': 'remove'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'sdm000', 'password': 'password5'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/group/{}/member/'.format(id_group), json.dumps(
            {'user': self.user5.id, 'operation': 'remove'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/signout/')
        self.assertEqual(response.status_code, 204)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/group/{}/member/'.format(id_group), json.dumps(
            {'user': self.user5.id, 'operation': 'remove'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/group/{}/full/'.format(id_group))
        self.assertEqual(response.json()['member'],
        [self.user2.id, self.user3.id])

        response = client.put('/api/group/{}/member/'.format(id_group), json.dumps(
            {'user': self.user2.id, 'operation': 'remove'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/group/{}/full/'.format(id_group))
        self.assertEqual(response.json()['member'],
        [self.user2.id, self.user3.id])

        response = client.put('/api/group/{}/member/'.format(id_group), json.dumps(
            {'user': self.user5.id, 'operation': 'add'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/group/{}/full/'.format(id_group))
        self.assertEqual(response.json()['member'],
        [self.user2.id, self.user3.id, self.user5.id])

    def test_admin_modify_group(self):

        '''
        a function docstring
        '''

        client = Client()

        id_group = self.group1.id
        id_wrong = id_group+20

        response = client.post('/api/group/{}/admin/'.format(id_group), json.dumps(
            {'user': self.user3.id, 'operation': 'remove'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.put('/api/group/{}/admin/'.format(id_wrong), json.dumps(
            {'user': self.user3.id, 'operation': 'remove'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.put('/api/group/{}/admin/'.format(id_group), json.dumps(
            {'user': self.user3.id, 'operation': 'remove'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'sdm000', 'password': 'password5'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/group/{}/admin/'.format(id_group), json.dumps(
            {'user': self.user3.id, 'operation': 'remove'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/signout/')
        self.assertEqual(response.status_code, 204)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/group/{}/admin/'.format(id_group), json.dumps(
            {'user': self.user3.id, 'operation': 'remove'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/group/{}/full/'.format(id_group))
        self.assertEqual(response.json()['admin'],
        [self.user2.id])
        self.assertEqual(response.json()['member'],
        [self.user2.id, self.user3.id, self.user5.id])

        response = client.put('/api/group/{}/admin/'.format(id_group), json.dumps(
            {'user': self.user2.id, 'operation': 'remove'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/group/{}/full/'.format(id_group))
        self.assertEqual(response.json()['admin'],
        [self.user2.id])

        response = client.put('/api/group/{}/admin/'.format(id_group), json.dumps(
            {'user': self.user3.id, 'operation': 'add'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/group/{}/full/'.format(id_group))
        self.assertEqual(response.json()['admin'],
        [self.user2.id, self.user3.id])
        self.assertEqual(response.json()['member'],
        [self.user2.id, self.user3.id, self.user5.id])

    def test_king_modify_group(self):

        '''
        a function docstring
        '''

        client = Client()

        id_group = self.group1.id
        id_wrong = id_group+20

        response = client.post('/api/group/{}/king/'.format(id_group), json.dumps(
            {'user': self.user3.id}),
            content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.put('/api/group/{}/king/'.format(id_wrong), json.dumps(
            {'user': self.user3.id}),
            content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.put('/api/group/{}/king/'.format(id_group), json.dumps(
            {'user': self.user3.id}),
            content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/group/{}/king/'.format(id_group), json.dumps(
            {'user': self.user3.id}),
            content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/group/{}/full/'.format(id_group))
        self.assertEqual(response.json()['king'], self.user3.id)
        self.assertEqual(response.json()['admin'],
        [self.user2.id, self.user3.id])

        response = client.put('/api/group/{}/king/'.format(id_group), json.dumps(
            {'user': self.user2.id}),
            content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/group/{}/full/'.format(id_group))
        self.assertEqual(response.json()['king'], self.user3.id)

    def test_search_group(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.head('/api/group/search/{}/'.format('Cat'))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/group/search/{}/'.format('Cat'))
        self.assertEqual(len(response.json()), 3)
        self.assertEqual(response.json()[0]['name'], 'Cat Group Name3')
        self.assertEqual(response.json()[0]['description'], 'Group Description3')

    def test_change_profile_group(self):

        '''
        a function docstring
        '''

        client = Client()

        id_group = self.group1.id
        id_wrong = id_group+20

        response = client.post('/api/group/{}/change_profile/'.format(id_group), json.dumps(
            {'profile': self.sample_image.id}),
            content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.put('/api/group/{}/change_profile/'.format(id_wrong), json.dumps(
            {'profile': self.sample_image.id}),
            content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.put('/api/group/{}/change_profile/'.format(id_group), json.dumps(
            {'profile': self.sample_image.id}),
            content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'sdm000', 'password': 'password5'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/group/{}/change_profile/'.format(id_group), json.dumps(
            {'profile': self.sample_image.id}),
            content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/signout/')
        self.assertEqual(response.status_code, 204)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/group/{}/change_profile/'.format(id_group), json.dumps(
            {'profile': self.sample_image.id}),
            content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/group/{}/full/'.format(id_group))
        self.assertEqual(response.json()['profile'], self.sample_image.id)

    def test_change_privacy_group(self):

        '''
        a function docstring
        '''

        client = Client()

        id_group = self.group1.id
        id_wrong = id_group+20

        response = client.post('/api/group/{}/change_privacy/'.format(id_group), json.dumps(
            {'privacy': 2}),
            content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.put('/api/group/{}/change_privacy/'.format(id_wrong), json.dumps(
            {'privacy': 2}),
            content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.put('/api/group/{}/change_privacy/'.format(id_group), json.dumps(
            {'privacy': 2}),
            content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'sdm000', 'password': 'password5'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/group/{}/change_privacy/'.format(id_group), json.dumps(
            {'privacy': 2}),
            content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/signout/')
        self.assertEqual(response.status_code, 204)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/group/{}/change_privacy/'.format(id_group), json.dumps(
            {'privacy': 2}),
            content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/group/{}/full/'.format(id_group))
        self.assertEqual(response.json()['privacy'], 2)
