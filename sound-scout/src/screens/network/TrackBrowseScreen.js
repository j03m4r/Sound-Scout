import React, { useMemo } from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import TrackDisplay from '../../components/TrackDisplay';
import styles from './styles';

export default function TrackBrowseScreen({ route }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { likedTracks } = useSelector((state) => state.Profile);

    const renderItem = ({ item }) => {
        return (
			<View>
				<TrackDisplay track={item} username={route.params.username}/>
			</View>
        )
    };
    const memoizedValue = useMemo(() => renderItem, [likedTracks]);

    return (
        <View style={styles.container0}>
            <View style={[styles.listScreenHeader, { marginBottom: 20 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name='arrow-left' size={24} />
                </TouchableOpacity>
                <Text style={[styles.usernameText, { marginLeft: 15 }]}>Liked Songs</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}
                data={likedTracks}
                numColumns={2}
                renderItem={memoizedValue}
                keyExtractor={(track) => track.song_id}
            />
        </View>
        
    )
}