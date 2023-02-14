import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './home';

const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}