import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector, connect } from 'react-redux';
import { CheckAuthenticated } from '../Redux/Actions/Authentication';
import Home from './home';
import Registration from './registration'

const Stack = createNativeStackNavigator();

function Route({ CheckAuthenticated, isAuthenticated }) {
  useEffect(() => {
    CheckAuthenticated();
  })

  return (
    <NavigationContainer>
      {isAuthenticated ? 
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
        :
        <Stack.Navigator initialRouteName="registration">
            <Stack.Screen name="registration" component={Registration} options={{ headerShown: false }} />
        </Stack.Navigator>
      }
        
    </NavigationContainer>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Authentication.isAuthenticated
});

export default connect(mapStateToProps, { CheckAuthenticated })(Route);