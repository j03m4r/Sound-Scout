import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux';
import Home from './home';
import LoginScreen from '../screens/registration/LoginScreen';
import RegisterScreen from '../screens/registration/RegisterScreen';
import ProfileListScreen from '../screens/network/ProfileListScreen';
import OtherProfileScreen from '../screens/network/OtherProfileScreen';
import ConversationScreen from '../screens/network/ConversationScreen';
import TrackBrowseScreen from '../screens/network/TrackBrowseScreen';

const Stack = createNativeStackNavigator();

function Route() {
  const { isAuthenticated } = useSelector((state) => state.Authentication);

  return (
    <NavigationContainer>
      {isAuthenticated ? 
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="listeners" component={ProfileListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="otherProfile" component={OtherProfileScreen} options={{ headerShown: false }}
            getId={({ params }) => params.username} />
            <Stack.Screen name='following' component={ProfileListScreen} options={{ headerShown: false }}
            getId={({ params }) => params.username} />
            <Stack.Screen name='followers' component={ProfileListScreen} options={{ headerShown: false }}
            getId={({ params }) => params.username} />
            <Stack.Screen name='select-friends' component={ProfileListScreen} options={{ headerShown: false }} />
            <Stack.Screen name='conversations' component={ProfileListScreen} options={{ headerShown: false }} />
            <Stack.Screen name='conversation' component={ConversationScreen} options={{ headerShown: false }} />
            <Stack.Screen name='track-browse' component={TrackBrowseScreen} options={{ headerShown: false}} />
        </Stack.Navigator>
        :
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
			      <Stack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        }
    </NavigationContainer>
  )
}

export default Route;