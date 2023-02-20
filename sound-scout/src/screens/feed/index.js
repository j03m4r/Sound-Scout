import React from 'react';
import { View, Text, FlatList, Dimensions, Image } from 'react-native';
import { styles } from './styles';

export default function Feed() {
    const array = [{ id: 0, imgSrc: 'https://upload.wikimedia.org/wikipedia/en/a/ad/From_Filthy_Tongue.jpg', title: 'Forever Close My Eyes', album: 'From Filthy Tongue of Gods and Griots', artist: 'Dälek' },
                { id: 1, imgSrc: 'https://i1.sndcdn.com/artworks-000231712119-0n7ay3-t500x500.jpg', title: 'mirage', album: 'A Collection of Fleeting Moments and Daydreams', artist: 'Orion Sun' },
                { id: 2, imgSrc: 'https://images.genius.com/870909281c7d42a04e9795ac025dc4fb.600x600x1.jpg', title: 'no, no', album: 'weight of the world', artist: 'MIKE' }]

    const renderItem = ({item, index}) => {
        return (
            <View style={{ flex: 1, height: Dimensions.get('window').height - 114, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{ uri: item.imgSrc }} style={{ width: 316, height: 316 }} />
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingTop: 20 }}>
                    <Text style={styles.text}>{item.title}</Text>
                    <Text style={{ marginVertical: 5 }}>{item.album}</Text>
                    <Text>{item.artist}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={array}
                renderItem={renderItem}
                pagingEnabled
                keyExtractor={(item) => item.id}
            />
        </View>
  )
}