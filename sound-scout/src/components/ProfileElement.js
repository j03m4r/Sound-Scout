import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export default function ProfileElement({ image_url, username, route, selectedFriends, setSelectedFriends }) {
    const navigation = useNavigation();
    return (
        <View>
            {route.params.mode!=='select-friends' ? 
            <TouchableOpacity onPress={() => navigation.navigate('otherProfile', { username: username })}>
                <View style={styles.profileInstance}>
                    <Image source={{ uri: image_url }} style={styles.profileIconLarge} />
                    <Text style={[styles.genreText, styles.usernameText]} numberOfLines={2}>{username}</Text>
                </View>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => {
                if (!selectedFriends.includes(username)) {
                    setSelectedFriends([...selectedFriends, username]);
                } else {
                    setSelectedFriends(selectedFriends.filter(function(str) { return str!==username}));
                }
            }}>
                <View style={styles.profileInstance}>
                    {selectedFriends.includes(username) ? 
                        <Feather name='check-circle' size={50} color='#006AFF' style={{ marginRight: 15 }} />
                    :
                        <Image source={{ uri: image_url }} style={styles.profileIconLarge} />
                    }
                    <Text style={[styles.genreText, styles.usernameText]} numberOfLines={2}>{username}</Text>
                </View>
            </TouchableOpacity>
            }
        </View>
    )
}