from django.contrib import admin
from django.urls import path, include
from .views import *

app_name='authentication'
urlpatterns = [
    path('is-authenticated', IsAuthenticated.as_view()),
    path('register', Register.as_view()),
    path('login', Login.as_view()),
    path('logout', Logout.as_view())
]