import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ProfileElement from '../../components/ProfileElement';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ProfileListScreen({ route }) {
    const navigation = useNavigation();
    const [track, setTrack] = useState({});
    const { tracks } = useSelector((state) => state.Spotify);

    useEffect(() => {
        if (route.params.mode==='listeners') {
            setTrack(tracks.filter(function(track) { return track.song_id == route.params.song_id})[0]);
        }
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
                <Feather name='arrow-left' size={24} />
            </TouchableOpacity>
            {route.params.mode==='listeners' ?
                track.listeners ? 
                    track.listeners.map((listener) => 
                        <ProfileElement key={listener.user.id} image_url={listener.image_url} username={listener.user.username} />
                    )
                :
                <Text>Loading Listeners</Text>
            :
                <Text>Not Listeners!</Text>
            }
        </View>
        
    )
}