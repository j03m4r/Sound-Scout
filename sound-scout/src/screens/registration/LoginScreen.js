import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetToken } from '../../Redux/Actions/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { Link } from '@react-navigation/native';

function LoginScreen() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, authToken } = useSelector((state) => state.Authentication);

    const login = () => {
        dispatch(GetToken(username, password));
    };

    return (
        <View style={styles.loginContainer}>
            <TextInput 
			onChangeText={(text) => setUsername(text)}
			placeholder="Username"
            autoCapitalize="none"
			value={username}
			style={styles.textInput} />
			<TextInput 
			onChangeText={(text) => setPassword(text)}
			placeholder="Password"
            autoCapitalize="none"
			value={password}
            secureTextEntry
			style={styles.textInput} />
			<TouchableOpacity style={styles.button} onPress={login}>
				<Text style={styles.buttonText}>Sign In</Text>
			</TouchableOpacity>
            <Text style={styles.signUpText}>Don't have an account? <Link to={{ screen: "register" }} style={{ color: 'blue' }}>Sign Up</Link> here.</Text>
        </View>
    )
}

export default LoginScreen;