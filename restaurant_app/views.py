import imp
from re import A
from venv import create
from django.shortcuts import render
from django.http.response import HttpResponse
from .forms import CustomerRegistration,CustomerLogin
from django.shortcuts import redirect, render
from .models import Customer, User,Orders
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.decorators import login_required

from django.views.generic import View
from django.utils.decorators import method_decorator

# Create your views here.
def home(request):
    return render(request,"index.html")

@login_required (login_url="/signin")
def search(request): 
    cart_items=Orders.objects.filter(User_name=request.user)
    total_cart=len(cart_items)
    return render(request,"search.html",{"total_cart":total_cart}) 

@login_required (login_url="/signin")
def cart(request): 
    cart_items=Orders.objects.filter(User_name=request.user)
    total_price=0
    for i in cart_items:
        total_price+=i.price

    try:
        address=Customer.objects.get(user=request.user) 
    except:
        html=  '<a href="/add_address">Add address</a>'
        return HttpResponse("Please, make sure to add address!" + html)   

    params={"cartItems":cart_items,"total_amount":total_price,"address":address}
    print(total_price)
    return render(request,"cart.html",params)   

def Sign_Up(request):
        if request.method =="POST":
            fm=CustomerRegistration(request.POST)
            if fm.is_valid():
                uname=fm.cleaned_data['name']
                mob=fm.cleaned_data['mob']
                email=fm.cleaned_data['email']
                password=fm.cleaned_data['password']
                repassword=fm.cleaned_data['repassword']
                myuser=User.objects.create_user(uname,email,password)
                myuser.save()
            return redirect('/')   

        else:   
            fm=CustomerRegistration()
            return render(request,"sign-up.html",{'form':fm})

def Sign_In(request): 
    if request.method == 'POST':
        fm=CustomerLogin(request.POST)
        if fm.is_valid():
            uname=fm.cleaned_data['name']
            password=fm.cleaned_data['password']
            user=authenticate(username=uname, password=password)
            if user is not None:
                login(request,user)
                return redirect('/')
            else:
                return HttpResponse("404 not found")    
    else:
        fm=CustomerLogin() 
        return render(request,"sign-in.html",{"form":fm})      

def logoutformat(request):
    logout(request)
    return redirect('/') 




class Ajaxhandle(View):
   def get(self,request):
    count=request.GET.get("item")
    price=request.GET.get("prices")
    exactpircee=price.split(" ")[0][1:]
    initial_price=int(exactpircee)/int(count)
    item_name=request.GET.get("Item_Name")

    try :
        order_filter=Orders.objects.get(User_name=request.user,item_name=item_name)
        order_filter.price+=int(exactpircee)
        order_filter.save()
    except:
        orderss=Orders.objects.create(User_name=request.user,qty=count,price=exactpircee,initial_price=initial_price,item_name=item_name)
   


    return redirect("/search")  

class changesmade(View):
   def get(self,request):
        changed_qty=request.GET.get("changed_qty")
        changed_name=request.GET.get("changed_name")
        object=Orders.objects.get(User_name=request.user,item_name=changed_name)
        object.qty=int(changed_qty)
        initial=object.initial_price
        object.price=initial*int(changed_qty)
        object.save()
        return redirect("cart")  


@login_required (login_url="/signin")
def add_address(request):
    if request.method=="POST":
        user=request.user
        name=request.POST.get('name')
        email=request.POST.get('email')
        phone=request.POST.get('phone')
        pin=request.POST.get('pin')
        adress=request.POST.get('adress')
        try:
            one_address=Customer.objects.get(user=request.user)
            one_address.user=user
            one_address.name=name
            one_address.email=email
            one_address.mobile=phone
            one_address.pin=pin
            one_address.address=adress
            one_address.save()
        except:    
            Customer.objects.create(user=user,name=name,email=email,mobile=phone,pin=pin,address=adress)
            return redirect("/search")
    else:
        return render(request,"address.html")   


            