import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { GetSpotifyCode, PlayTrack, PauseTrack, GetCurrentTrack } from '../../Redux/Actions/Spotify';
import * as Progress from 'react-native-progress';

export default function Feed() {
    const dispatch = useDispatch();
    const { topTracks, isPlaying, progress } = useSelector((state) => state.Spotify);

    useEffect(() => {
        if (topTracks.length === 0) {
            dispatch(GetSpotifyCode());
        } else {
            dispatch(PlayTrack(topTracks[0].song_id));
        }
    }, [topTracks,]);

    useEffect(() => {
        if (isPlaying) {
            dispatch(GetCurrentTrack());
        }
    });

    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, height: Dimensions.get('window').height - 114, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={handleClick}>
                    <Image source={{ uri: item.img_url }} style={{ width: 316, height: 316 }} />
                </TouchableOpacity>
                <Progress.Bar progress={progress/item.duration} width={316} borderWidth={0} borderRadius={0} color='black'/>
                <View style={styles.subContainer}>
                    <View style={styles.songDiscContainer}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={{ marginVertical: 5 }}>{item.artist}</Text>
                        <Text>{item.album}</Text>
                    </View>
                </View>
            </View>
        )
    };

    const handleClick = () => {
        if (isPlaying) {
            dispatch(PauseTrack());
        } else {
            dispatch(PlayTrack(''));
        }
    };

    const onScrollEnd = (e) => {
        if (topTracks) {
            let contentOffset = e.nativeEvent.contentOffset;
            let viewSize = e.nativeEvent.layoutMeasurement;
            
            let pageNum = Math.floor(contentOffset.y / viewSize.height);
            dispatch(PlayTrack(topTracks[pageNum].song_id));
        }
    };

    return (
        <View style={styles.container}>
            {topTracks ? 
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={topTracks}
                    renderItem={renderItem}
                    pagingEnabled
                    keyExtractor={(item) => item.song_id}
                    onMomentumScrollEnd={onScrollEnd}
                />
                :
                <text>Could Not Load Top Tracks :/</text>
            }
        </View>
  )
}
