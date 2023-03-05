import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux';
import Home from './home';
import LoginScreen from '../screens/registration/LoginScreen';
import RegisterScreen from '../screens/registration/RegisterScreen';

const Stack = createNativeStackNavigator();

function Route() {
  const { isAuthenticated } = useSelector((state) => state.Authentication);

  return (
    <NavigationContainer>
      {isAuthenticated ? 
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
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