'''
a standard docstring
'''

import json
from django.test import TransactionTestCase, TestCase, Client
from django.contrib.auth import get_user_model
from django.core import mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
import re

# Create your tests here.

User = get_user_model()

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

        response = client.head('/token/')
        self.assertEqual(response.status_code, 405)

        response = client.post('/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/signup/', json.dumps(
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

        response = client.put('/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.post('/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/signup/', json.dumps(
            {'username': 'taekop2', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_activate(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.post('/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek',
            'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(mail.outbox), 1)
        mail_sent = mail.outbox[0]
        regx = re.search(r"https://localhost/signup/(\S+)/(\S+)", mail_sent.body)

        response = client.get('/signup/activate/{}/{}/'.format(regx.group(1), regx.group(2)))
        self.assertEqual(response.status_code, 204)
        user = User.objects.get(username='taekop')
        self.assertEqual(user.is_active, True)
