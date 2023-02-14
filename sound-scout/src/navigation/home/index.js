import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Feather } from '@expo/vector-icons';
import Feed from '../../screens/feed';
import Profile from '../../screens/ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator 
        barStyle={{ backgroundColor: 'black' }}
        initialRouteName="feed"
        labeled={false}>
        <Tab.Screen name="feed" component={Feed} options={{
            tabBarIcon: ({color}) => (
                <Feather name="home" size={24} color={color} />
            ),
        }} />
        <Tab.Screen name="profile" component={Profile} options={{
            tabBarIcon: ({color}) => (
                <Feather name="user" size={24} color={color} />
            ),
        }}/>
    </Tab.Navigator>
  )
}