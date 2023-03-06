import React, { useEffect } from 'react';
import { View, Text, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { GetSpotifyCode, PlayTrack, PauseTrack } from '../../Redux/Actions/Spotify';
import Icon from 'react-native-vector-icons/Foundation';

export default function Feed() {
    const dispatch = useDispatch();
    const { topTracks, isPlaying } = useSelector((state) => state.Spotify);

    useEffect(() => {
        if (topTracks.length === 0) {
            dispatch(GetSpotifyCode());
        } else {
            dispatch(PlayTrack(topTracks[0].song_id));
        }
    }, [topTracks,]);

    const renderItem = ({item, index}) => {
        return (
            <View style={{ flex: 1, height: Dimensions.get('window').height - 114, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{ uri: item.img_url }} style={{ width: 316, height: 316 }} />
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingTop: 20 }}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={{ marginVertical: 5 }}>{item.artist}</Text>
                    <Text style={{ marginBottom: 75 }}>{item.album}</Text>
                    <TouchableOpacity onPress={handleClick}>
                        {isPlaying ? 
                            <Icon name='pause' size={40} />
                        :
                            <Icon name='play' size={40} />
                        }
                    </TouchableOpacity>
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