'''
a standard docstring
'''

# from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):

    '''
    a function docstring
    '''

    return HttpResponse('Hello, world!')
