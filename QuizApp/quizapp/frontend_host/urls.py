from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index),
    re_path('login', views.index),
    re_path('register', views.index),
    re_path('dashboard', views.index),
]
