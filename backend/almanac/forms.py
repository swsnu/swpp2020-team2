'''
a standard docstring
'''

from django import forms

class ImageForm(forms.Form):

    '''
    a class docstring
    '''

    imagefile = forms.ImageField()
