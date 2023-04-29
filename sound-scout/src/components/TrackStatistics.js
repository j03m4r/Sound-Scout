import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LikeTrack } from '../Redux/Actions/Spotify';
import { styles } from './styles';

export default function TrackStatistics({ song_id }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { trackLikes, tracks } = useSelector((state) => state.Spotify);
    const [track, setTrack] = useState({});

    useEffect(() => {
        setTrack(tracks.filter(function(track) { return track.song_id == song_id})[0]);
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
                <View>
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
                    <Text style={styles.genreText}>Listeners</Text>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('list',  {mode: 'listeners', song_id: song_id})}>
                        {track ?
                            track.listeners ? 
                                track.listeners.map((listener) => 
                                    <Image key={listener.user.id} source={{ uri: listener.image_url }} style={styles.profileIconSmall} />
                                )
                            :
                                <Text>Loading Listeners...</Text>
                        :
                        <Text style={styles.genreText}>Loading Track...</Text>   
                        }
                        
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
}