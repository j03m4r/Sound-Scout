from django.urls import path
from .views import *

app_name='spotify'
urlpatterns = [
    path('get-credentials', GetCredentials.as_view()),
    path('token', SpotifyToken.as_view()),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('get-personal-tracks', GetPersonalTopTracks.as_view()),
    path('tracks', GetTracks.as_view()),
    path('play-track', PlayTrack.as_view()),
    path('pause-track', PauseTrack.as_view()),
    path('get-current-track', GetCurrentTrack.as_view()),
    path('repeat-track', RepeatTrack.as_view())
]