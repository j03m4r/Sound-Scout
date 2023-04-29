import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Feather } from '@expo/vector-icons';
import Feed from '../../screens/feed';
import Profile from '../../screens/network/ProfileScreen';
import { useSelector } from 'react-redux';

const Tab = createMaterialBottomTabNavigator();

export default function Home() {
    const { username } = useSelector((state) => state.Authentication);

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
            <Tab.Screen name="profile" initialParams={{username: username}} component={Profile} options={{
                tabBarIcon: ({color}) => (
                    <Feather name="user" size={24} color={color} />
                ),
            }}/>
        </Tab.Navigator>
    )
}