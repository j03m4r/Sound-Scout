from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import *

app_name='authentication'
urlpatterns = [
    path('get-auth-token', obtain_auth_token),
    path('get-users', GetUsers.as_view()),
    path('get-profiles', GetProfiles.as_view()),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('register', Register.as_view()),
    path('login', Login.as_view()),
    path('logout', Logout.as_view())
]