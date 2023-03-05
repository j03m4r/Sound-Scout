from django.urls import path
from .views import *

app_name='spotify'
urlpatterns = [
    path('get-credentials', GetCredentials.as_view()),
    path('token', SpotifyToken.as_view()),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('get-personal-tracks', GetPersonalTopTracks.as_view())
]