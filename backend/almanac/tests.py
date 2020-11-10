'''
a standard docstring
'''

import json
import re
from django.test import TransactionTestCase, TestCase, Client
from django.core import mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from .models import User, University

# Create your tests here.

class AlmanacCsrfTestCase(TestCase):

    '''
    a class docstring
    '''

    def setUp(self):

        '''
        a function docstring
        '''

        User.objects.create(
            username='ray017', first_name='Raegeon',
            last_name='Lee', password='password', email='cbda117@snu.ac.kr', is_active=False)

    def test_csrf(self):

        '''
        a function docstring
        '''

        client = Client(enforce_csrf_checks=True)

        response = client.head('/api/token/')
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
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
        'via the link \nhttps://localhost/signup/{}/').format(
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

        User.objects.create(
            username='ray017', first_name='Raegeon',
            last_name='Lee', password='password', email='cbda117@snu.ac.kr', is_active=False)


    def test_signup(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.put('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop2', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_activate(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(mail.outbox), 1)
        mail_sent = mail.outbox[0]
        regx = re.search(r"https://localhost/signup/(\S+)/(\S+)", mail_sent.body)
        uidb64 = regx.group(1)
        token = regx.group(2)
        token_wrong = token[:-1] + ('1' if token[-1] == '0' else '0')

        response = client.head('/api/signup/activate/{}/{}/'.format(uidb64, token))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/signup/activate/{}/{}/'.format(uidb64, token_wrong))
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/signup/activate/{}/{}/'.format(uidb64, token))
        self.assertEqual(response.status_code, 204)
        user = User.objects.get(username='taekop')
        self.assertEqual(user.is_active, True)

    def test_signin(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(mail.outbox), 1)
        mail_sent = mail.outbox[0]
        regx = re.search(r"https://localhost/signup/(\S+)/(\S+)", mail_sent.body)
        uidb64 = regx.group(1)
        token = regx.group(2)

        response = client.get('/api/signup/activate/{}/{}/'.format(uidb64, token))
        self.assertEqual(response.status_code, 204)

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
        self.assertEqual(response.status_code, 204)

    def test_signout(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.post('/api/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(mail.outbox), 1)
        mail_sent = mail.outbox[0]
        regx = re.search(r"https://localhost/signup/(\S+)/(\S+)", mail_sent.body)
        uidb64 = regx.group(1)
        token = regx.group(2)

        response = client.get('/api/signup/activate/{}/{}/'.format(uidb64, token))
        self.assertEqual(response.status_code, 204)

        response = client.post('/api/signin/', json.dumps(
            {'username': 'taekop', 'password': 'password2'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 204)

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

        User.objects.create(
            username='ray017', first_name='Raegeon',
            last_name='Lee', password='password', email='cbda117@snu.ac.kr', is_active=False)
        User.objects.create(
            username='taekop', first_name='Seungtaek',
            last_name='Oh', password='password2', email='taekop@snu.ac.kr', is_active=True)


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
        self.assertEqual(response.json()['password'], 'password')
        self.assertEqual(response.json()['email'], 'cbda117@snu.ac.kr')
        self.assertEqual(response.json()['is_active'], False)

        response = client.get('/api/user/{}/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

class AlmanacUniversityTestCase(TransactionTestCase):

    '''
    a class docstring
    '''

    def setUp(self):

        '''
        a function docstring
        '''

        User.objects.create(
            username='ray017', first_name='Raegeon',
            last_name='Lee', password='password', email='cbda117@snu.ac.kr', is_active=False)
        User.objects.create(
            username='taekop', first_name='Seungtaek',
            last_name='Oh', password='password2', email='taekop@snu.ac.kr', is_active=True)
        University.objects.create(
            name='Seoul National University', domain='snu.ac.kr'
        )

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
