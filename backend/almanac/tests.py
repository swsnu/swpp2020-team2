'''
a standard docstring
'''

import json
import re
from django.test import TransactionTestCase, TestCase, Client
from django.core import mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from .models import User, University, Department, Background, Language, Tag, Category

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

        User.objects.create_user(
            username='ray017', first_name='Raegeon',
            last_name='Lee', password='password', email='cbda117@snu.ac.kr', is_active=False)
        User.objects.create_user(
            username='taekop', first_name='Seungtaek',
            last_name='Oh', password='password2', email='taekop@snu.ac.kr', is_active=True)

    def test_user_get_singin(self):

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
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/user/signin/')
        self.assertEqual(response.json()['username'], 'taekop')
        self.assertEqual(response.json()['first_name'], 'Seungtaek')
        self.assertEqual(response.json()['last_name'], 'Oh')
        self.assertEqual(response.json()['email'], 'taekop@snu.ac.kr')
        self.assertEqual(response.json()['is_active'], True)

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

        response = client.get('/api/user/{}/'.format(id2))
        self.assertEqual(response.json()['username'], 'taekop')
        self.assertEqual(response.json()['first_name'], 'Seungtaek')
        self.assertEqual(response.json()['last_name'], 'Oh')
        self.assertEqual(response.json()['email'], 'taekop@snu.ac.kr')
        self.assertEqual(response.json()['is_active'], True)

        response = client.get('/api/user/{}/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

class AlmanacUnivDeptBackgroundLangTestCase(TransactionTestCase):

    '''
    a class docstring
    '''

    def setUp(self):

        '''
        a function docstring
        '''

        User.objects.create_user(
            username='ray017', first_name='Raegeon',
            last_name='Lee', password='password', email='cbda117@snu.ac.kr', is_active=False)
        User.objects.create_user(
            username='taekop', first_name='Seungtaek',
            last_name='Oh', password='password2', email='taekop@snu.ac.kr', is_active=True)
        University.objects.create(
            name='Seoul National University', domain='snu.ac.kr'
        )
        Department.objects.create(
            name='Computer Science Engineering'
        )
        Tag.objects.create(
            name='waffle'
        )
        Category.objects.create(
            name='performance'
        )
        Background.objects.create(
            name=1
        )
        Language.objects.create(
            name=1
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

    def test_get_create_background(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.head('/api/background/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/background/')
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['name'], 1)

        response = client.post('/api/background/', json.dumps({'name': 2}),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('2', response.content.decode())

    def test_get_delete_background(self):

        '''
        a function docstring
        '''

        client = Client()

        id_1=(Background.objects.get(name=1).id)
        id_wrong = id_1+1

        response = client.head('/api/background/{}/'.format(id_1))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/background/{}/'.format(id_1))
        self.assertEqual(response.json()['name'], 1)

        response = client.get('/api/background/{}/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/background/{}/'.format(id_1))
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/background/')
        self.assertEqual(len(response.json()), 0)

    def test_get_create_language(self):

        '''
        a function docstring
        '''

        client = Client()

        response = client.head('/api/language/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/language/')
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['name'], 1)

        response = client.post('/api/language/', json.dumps({'name': 2}),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('2', response.content.decode())

    def test_get_delete_language(self):

        '''
        a function docstring
        '''

        client = Client()

        id_1=(Language.objects.get(name=1).id)
        id_wrong = id_1+1

        response = client.head('/api/language/{}/'.format(id_1))
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/language/{}/'.format(id_1))
        self.assertEqual(response.json()['name'], 1)

        response = client.get('/api/language/{}/'.format(id_wrong))
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/language/{}/'.format(id_1))
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/language/')
        self.assertEqual(len(response.json()), 0)
