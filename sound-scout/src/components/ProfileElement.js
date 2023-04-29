import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function ProfileElement({ image_url, username }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('otherProfile', { username: username })}>
            <View style={styles.profileInstance}>
                <Image source={{ uri: image_url }} style={styles.profileIconLarge} />
                <Text style={[styles.genreText, styles.usernameText]} numberOfLines={2}>{username}</Text>
            </View>
        </TouchableOpacity>
    )
}