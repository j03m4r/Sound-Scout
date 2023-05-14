from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from spotify.models import Like, Track
from .models import *
from .serializers import *
import logging

logger = logging.getLogger(__name__)

# Create your views here.
class IsAuthenticated(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        user = authenticate(self.request.user)
        logger.warn(user)
        if UserProfile.objects.filter(user=user).exists():
            login(request, user)
            token = Token.objects.get_or_create(user=user).key
            username = User.objects.get(user=user).username
            return Response({'isAuthenticated': True, 'token': token, 'username': username}, status=status.HTTP_200_OK)
        else:
            return Response({'isAuthenticated': False}, status=status.HTTP_200_OK)
    
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

        inst_1 = SocialInstance.objects.get(user=User.objects.get(username='joemar'))
        inst_2 = SocialInstance.objects.get(user=User.objects.get(username='mara'))
        conversation = Conversation.objects.get(user_1=inst_1, user_2=inst_2)
        
        message = TrackMessage.objects.create(track=Track.objects.get(song_id='3dORYFfOVAV2G7omBJD4F5'), sender=User.objects.get(username='mara'), receiver=User.objects.get(username='joemar'))
        conversation.messages.add(message)
        
        return Response({'profiles': profiles.data}, status=status.HTTP_200_OK)

class Follow(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, format=None):
        data = self.request.data
        user = self.request.user
        other_user = User.objects.get(username=data['username'])
        
        profile = UserProfile.objects.get(user=user)
        other_profile = UserProfile.objects.get(user=other_user)
        
        if not SocialInstance.objects.filter(user=user).exists():
            SocialInstance.objects.create(user=user, image_url=profile.image_url)
        if not SocialInstance.objects.filter(user=other_user).exists():
            SocialInstance.objects.create(user=other_user, image_url=other_profile.image_url) 
            
        followage_instance = SocialInstance.objects.get(user=user)
        other_followage_instance = SocialInstance.objects.get(user=other_user)
            
        profile.following.add(other_followage_instance)
        other_profile.followers.add(followage_instance)
        
        if followage_instance in other_profile.following.all():
            if not Conversation.objects.filter(user_1=followage_instance, user_2=other_followage_instance).exists() and not Conversation.objects.filter(user_1=other_followage_instance, user_2=followage_instance).exists(): # no conversation exists yet (create one and add it to both profiles)
                conversation = Conversation.objects.create(user_1=followage_instance, user_2=other_followage_instance)
                profile.conversations.add(conversation)
                other_profile.conversations.add(conversation)
                
        if FollowingActivity.objects.filter(user_1=user, user_2=other_user).exists():
            new_activity = FollowingActivity.objects.get(user_1=user, user_2=other_user)
        else:
            new_activity = FollowingActivity.objects.create(user_1=user, user_2=other_user)
            
        if new_activity not in profile.recent_activity.all():
            profile.recent_activity.add(new_activity)
            if len(profile.recent_activity.all()) > 3:
                profile.recent_activity.remove(profile.recent_activity.all()[0])

        profile = ProfileSerializer(profile)
        other_profile = ProfileSerializer(other_profile)
        
        return Response({'Success': 'Followers and following successfully updated...', 'otherProfile': other_profile.data, 'profile': profile.data}, status=status.HTTP_200_OK)

class Unfollow(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, format=None):
        data = self.request.data
        other_user = User.objects.get(username=data['username'])
        other_profile = UserProfile.objects.get(user=other_user)
        
        user = self.request.user
        profile = UserProfile.objects.get(user=user)
        
        if not SocialInstance.objects.filter(user=user).exists():
            SocialInstance.objects.create(user=user, image_url=profile.image_url)
        if not SocialInstance.objects.filter(user=other_user).exists():
            SocialInstance.objects.create(user=other_user, image_url=other_profile.image_url)
            
        followage_instance = SocialInstance.objects.get(user=user)
        other_followage_instance = SocialInstance.objects.get(user=other_user)
        
        profile.following.remove(other_followage_instance)
        other_profile.followers.remove(followage_instance)

        profile = ProfileSerializer(profile)
        other_profile = ProfileSerializer(other_profile)
        
        return Response({'Success': 'Followers and following successfully updated...', 'otherProfile': other_profile.data, 'profile': profile.data}, status=status.HTTP_200_OK)

class GetProfile(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, format=None):
        data = self.request.data
        username = data['user']

        user = User.objects.get(username=username)
        profile = UserProfile.objects.get(user=user)
        followage_instance = SocialInstance.objects.get(user=self.request.user)
        
        following = False
        if followage_instance in profile.followers.all():
            following = True
            
        profile = ProfileSerializer(profile)
        return Response({'Success': 'Followers and following successfully recieved...', 'profile': profile.data, 'isFollowing': following}, status=status.HTTP_200_OK)

class MessageUser(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, format=None):
        data = self.request.data
        is_text_message = data['type'] == 'text' # differentiating between text/track messages
        if is_text_message:
            content = data['text']
        else:
            content = data['song_id']
        user_1 = self.request.user
        user_2 = User.objects.get(username=data['username'])
        profile_1 = UserProfile.objects.get(user=user_1)
        profile_2 = UserProfile.objects.get(user=user_2)
        if not SocialInstance.objects.filter(user=user_1).exists():
            SocialInstance.objects.create(user=user_1, image_url=profile_1.image_url)
        if not SocialInstance.objects.filter(user=user_2).exists():
            SocialInstance.objects.create(user=user_2, image_url=profile_2.image_url) 
            
        social_instance_1 = SocialInstance.objects.get(user=user_1)
        social_instance_2 = SocialInstance.objects.get(user=user_2)
        
        if is_text_message:
            message = TextMessage.objects.create(sender=user_1, receiver=user_2, text=content)
        else:
            track = Track.objects.get(song_id=content)
            message = TrackMessage.objects.create(sender=user_1, receiver=user_2, track=track)
        
        conversation = Conversation.objects.filter(user_1=social_instance_1, user_2=social_instance_2)
        if conversation.exists():
            conversation = conversation[0]
            conversation.messages.add(message)
        else: # it's possible that the conversation was first started by the other user
            conversation = Conversation.objects.filter(user_1=social_instance_2, user_2=social_instance_1)
            if conversation.exists():
                conversation = conversation[0]
                conversation.messages.add(message)
                
        conversation = ConversationSerializer(conversation)
        return Response({'Success': 'Message successfully sent.', 'conversation': conversation.data}, status=status.HTTP_201_CREATED)
    
class GetConversation(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, format=None):
        data = self.request.data
        other_user = User.objects.get(username=data['username'])
        other_profile = UserProfile.objects.get(user=other_user)
        
        user = self.request.user
        profile = UserProfile.objects.get(user=user)

        if not SocialInstance.objects.filter(user=user).exists():
            SocialInstance.objects.create(user=user, image_url=profile.image_url)
        if not SocialInstance.objects.filter(user=other_user).exists():
            SocialInstance.objects.create(user=other_user, image_url=other_profile.image_url)

        social_instance_1 = SocialInstance.objects.get(user=user)
        social_instance_2 = SocialInstance.objects.get(user=other_user)
       
        if Conversation.objects.filter(user_1=social_instance_1, user_2=social_instance_2).exists():
            conversation = Conversation.objects.get(user_1=social_instance_1, user_2=social_instance_2)
        elif Conversation.objects.filter(user_1=social_instance_2, user_2=social_instance_1).exists():
            conversation = Conversation.objects.get(user_1=social_instance_2, user_2=social_instance_1)
        else:
            return Response({'Error': 'Conversation could not be found.'}, status=status.HTTP_400_BAD_REQUEST)
        conversation = ConversationSerializer(conversation)
        return Response({'Success': 'Conversation found.', 'conversation': conversation.data}, status=status.HTTP_200_OK)
    
class GetConversations(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, format=None):
        user = self.request.user
        profile = UserProfile.objects.get(user=user)
        conversations = ConversationSerializer(profile.conversations, many=True)
        return Response({'Success': 'Conversations successfully returned.', 'conversations': conversations.data}, status=status.HTTP_200_OK)
    
class GetLikedTracks(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        my_like = Like.objects.get(user=User.objects.get(username='joemar'))
        liked_tracks = my_like.liked_tracks
        liked_tracks = LimitedTrackSerializer(liked_tracks, many=True)
        return Response({'Success': 'Liked tracks successfully returned', 'liked_tracks': liked_tracks.data}, status=status.HTTP_200_OK)