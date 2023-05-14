import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LikeTrack } from '../Redux/Actions/Spotify';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';

export default function TrackStatistics({ song_id }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { trackLikes, tracks } = useSelector((state) => state.Spotify);
    const [track, setTrack] = useState({});

    useEffect(() => {
        setTrack(tracks.filter(function(track) { return track.song_id == song_id})[0]);
    }, []);

    const renderItem = ({ item }) => {
        const index = track.listeners.indexOf(item);
        var negativeLeftMargin = 0;
        if (index > 0) {
            negativeLeftMargin = -15;
        }
        return (
			<Image source={{ uri: item.image_url }} style={[styles.profileIconSmall, { marginLeft: negativeLeftMargin, zIndex: index }]} />
        )
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                    <TapGestureHandler numberOfTaps={2} onActivated={() => dispatch(LikeTrack(song_id))}>
                        {track ? 
                            track.likes ?
                                track.likes.length >= trackLikes.length ?
                                    <Text style={styles.likeText}>{track.likes.length}</Text>
                                    :
                                    <Text style={styles.likeText}>{trackLikes.length}</Text>
                                :
                                <Text style={styles.likeText}>{trackLikes.length}</Text> 
                        :
                            <Text style={styles.genreText}>Loading Track...</Text>
                        }
                        
                    </TapGestureHandler>
                    <Text style={styles.likeNumber}>Likes</Text>
                </View>
                <View style={styles.listenersContainer}>
                    <TouchableOpacity style={{ height: 45, maxWidth: 110 }} onPress={() => navigation.navigate('listeners',  {mode: 'listeners', song_id: song_id})}>
                        {track ?
                            track.listeners ? 
                                <FlatList
                                    data={track.listeners.slice(0, 3)}
                                    renderItem={(item) => renderItem(item)}
                                    keyExtractor={(listener) => listener.user.id}
                                    initialNumToRender={2}
                                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
                                    horizontal={true}
                                />
                            :
                                <Text>Loading Listeners...</Text>
                        :
                        <Text style={styles.genreText}>Loading Track...</Text>   
                        }
                    </TouchableOpacity>
                    <View style={styles.verticleLine} />
                    <TouchableOpacity onPress={() => navigation.navigate('select-friends', { mode: 'select-friends', song_id: song_id })}>
                        <Feather name='share' size={40} color='#006AFF' />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}