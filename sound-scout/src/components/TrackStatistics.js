import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux';
import { LikeTrack } from '../Redux/Actions/Spotify';
import { styles } from './styles';

export default function TrackStatistics({ song_id }) {
    const dispatch = useDispatch();
    const { trackLikes } = useSelector((state) => state.Spotify);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View>
                    <TapGestureHandler numberOfTaps={2} onActivated={() => dispatch(LikeTrack(song_id))}>
                        <Text style={styles.likeText}>{trackLikes.length}</Text>
                    </TapGestureHandler>
                    <Text style={styles.likeNumber}>Likes</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}