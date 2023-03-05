from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *

# Create your views here.
class IsAuthenticated(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, format=None):
        return Response({'isAuthenticated': True}, status=status.HTTP_200_OK)
    
class Register(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        data = request.data
        
        username = data['username']
        password = data['password']
        re_password = data['re_password']
        if password == re_password:
            if User.objects.filter(username=username).exists():
                return Response({'Error': 'User already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                user = User.objects.create_user(username=username, password=password)
                UserProfile.objects.create(user=user)
                Token.objects.create(user=user)
                return Response({'Success': 'User successfully created.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'Error': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)

class Login(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, format=None):
        data = request.data
        username = data['username']
        password = data['password']
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response({'Success': 'User logged in.'}, status=status.HTTP_200_OK)
        else:
            return Response({'Error': 'Could not authenticate user.'}, status=status.HTTP_400_BAD_REQUEST)
        
class Logout(APIView):
    def post(self, request, format=None):
        logout(request)
        return Response({'Success': 'User logged out.'}, status=status.HTTP_200_OK)

class GetUsers(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        users = User.objects.all()
        
        users = UserSerializer(users, many=True)
        return Response({'users': users.data}, status=status.HTTP_200_OK)

class GetProfiles(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        profiles = UserProfile.objects.all()
        
        profiles = ProfileSerializer(profiles, many=True)
        return Response({'profiles': profiles.data}, status=status.HTTP_200_OK)