import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SendTrackMessage } from '../Redux/Actions/Profile';
import { useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles'

export default function TrackDisplay({ track, username }) {
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1, alignItems: 'center', maxWidth: 150, marginHorizontal: 15, marginVertical: 20 }}>
            <Image style={styles.trackDisplayImage} source={{ uri: track.img_url }} />
            <Text numberOfLines={1} style={{ margin: 10, fontWeight: 'bold' }}>{track.name}</Text>
            <TouchableOpacity style={styles.sendButton} onPress={() => dispatch(SendTrackMessage(username, track.song_id))}>
                <Feather name='arrow-up' size={30} color='#fff' />
            </TouchableOpacity>
        </View>
    )
}