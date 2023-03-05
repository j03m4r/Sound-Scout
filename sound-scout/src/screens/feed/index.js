import React, { useEffect } from 'react';
import { View, Text, FlatList, Dimensions, Image } from 'react-native';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { GetSpotifyCode } from '../../Redux/Actions/Spotify';

export default function Feed() {
    const dispatch = useDispatch();
    const { topTracks } = useSelector((state) => state.Spotify);

    useEffect(() => {
        dispatch(GetSpotifyCode());
    }, []);

    const renderItem = ({item, index}) => {
        return (
            <View style={{ flex: 1, height: Dimensions.get('window').height - 114, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{ uri: item.img_url }} style={{ width: 316, height: 316 }} />
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingTop: 20 }}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={{ marginVertical: 5 }}>{item.album}</Text>
                    <Text>{item.artist}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {topTracks ? 
                <FlatList
                    data={topTracks}
                    renderItem={renderItem}
                    pagingEnabled
                    keyExtractor={(item) => item.song_id}
                />
                :
                <text>Could Not Load Top Tracks :/</text>
            }
        </View>
  )
}