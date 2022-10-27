from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Orders)
class OrdersAdmin(admin.ModelAdmin):
    list_display=['User_name','qty','item_name','price']
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display=['user','mobile']