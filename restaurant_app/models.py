from email.policy import default
from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Customer(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    name=models.CharField(max_length=200)
    email=models.CharField(max_length=500,default="jhgg")
    mobile=models.IntegerField()
    pin=models.IntegerField(default=1)
    address=models.CharField(max_length=200,default="hf")

    def __str__(self):
        return self.name

class Orders(models.Model):
    User_name=models.ForeignKey(User,on_delete=models.CASCADE)
    qty=models.IntegerField()
    initial_price=models.IntegerField(default=1)
    price=models.IntegerField(default=1)
    item_name=models.CharField(max_length=500)
    orderd_date=models.DateField(auto_now_add=True)  

