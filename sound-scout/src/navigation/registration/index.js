import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Login from '../../screens/registration/LoginScreen';
import Register from '../../screens/registration/RegisterScreen';

const Tab = createMaterialBottomTabNavigator();

export default function Registration() {
  return (
    <Tab.Navigator 
        barStyle={{ backgroundColor: 'black' }}
        initialRouteName="login">
        <Tab.Screen name="login" component={Login}/>
        <Tab.Screen name="register" component={Register}/>
    </Tab.Navigator>
  )
}