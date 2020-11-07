'''
a standard docstring
'''

from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

'''
a class docstring
''' 
def index(request):
    return HttpResponse('Hello, world!')
