import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import { Register } from '../../Redux/Actions/Authentication';
import { useDispatch } from 'react-redux';
import styles from './styles';
import { Link } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'

function RegisterScreen() {
	const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

	const register = () => {
		if (password==rePassword) {
			dispatch(Register(username, password, rePassword))
		} else {
			// dispatch some sort of error to user
		}
	};

    return (
        <View style={styles.container}>
			<Link to={{ screen: "login" }} style={styles.backButton}>
				<Feather name="arrow-left" size={24} />
			</Link>
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
			<TextInput 
			onChangeText={(text) => setRePassword(text)}
			placeholder="Re-enter Password"
			autoCapitalize="none"
			value={rePassword}
			secureTextEntry
			style={styles.textInput} />
			<TouchableOpacity style={styles.button} onPress={register}>
				<Text style={styles.buttonText}>Sign Up</Text>
			</TouchableOpacity>
        </View>
    )
}

export default RegisterScreen;