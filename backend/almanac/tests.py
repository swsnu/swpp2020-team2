'''
a standard docstring
'''

from django.test import TestCase, Client
from django.contrib.auth import get_user_model
import json

# Create your tests here.

User = get_user_model()

class AlmanacTestCase(TestCase):

    '''
    a class docstring
    '''

    def setUp(self):
        User.objects.create(
            username='ray017', first_name='Raegeon', last_name='Lee', password='password', email='cbda117@snu.ac.kr', is_active=False)

    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)

        response = client.head('/token/')
        self.assertEqual(response.status_code, 405)

        response = client.post('/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek', 'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/signup/', json.dumps(
            {'username': 'taekop', 'first_name': 'Seungtaek', 'last_name': 'Oh', 'password': 'password2', 'email': 'taekop@snu.ac.kr'}),
            content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)