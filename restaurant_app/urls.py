from django.urls import path
from . import views
from .views import *
from django.contrib.auth.decorators import login_required


urlpatterns = [
   path("",views.home,name="home"),
   path("search",views.search,name="search"),
   path("cart",views.cart,name="cart"),
   path("signup",views.Sign_Up,name="signup"),
   path("signin",views.Sign_In,name="signin"),
   path("signout",views.logoutformat,name=""),
   path("add_address",views.add_address,name="address"),
   path("add_item",views.Ajaxhandle.as_view(),name="additem"),
   path("changes",views.changesmade.as_view(),name="changeitem"),
]
