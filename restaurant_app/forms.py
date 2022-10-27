from django import forms
from django.forms import models
from django.forms.widgets import NumberInput

class CustomerRegistration(forms.Form):
    name=forms.CharField(label_suffix=" ",label="User name")
    mob=forms.IntegerField(label_suffix=" ",widget=NumberInput,label="Mobile Number")
    email=forms.EmailField(label_suffix=" ",label="Your email (optional)",required=False)
    password=forms.CharField(label="Password",label_suffix="",widget=forms.PasswordInput)
    repassword=forms.CharField(label_suffix="",label="Confirm Password",widget=forms.PasswordInput)

    def clean(self):
        clean_data=super().clean()
        valpwd=self.cleaned_data['password']
        valrepwd=self.cleaned_data['repassword']
        if valpwd!=valrepwd:
            raise forms.ValidationError("Password doesn't match")

class CustomerLogin(forms.Form):           
       name=forms.CharField(label_suffix=" ",label="User name")
       password=forms.CharField(label="Password",label_suffix="",widget=forms.PasswordInput)  