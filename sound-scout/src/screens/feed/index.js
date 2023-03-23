import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { GetSpotifyCode, PlayTrack, PauseTrack, GetCurrentTrack, GetGenres, GetTrackLikes } from '../../Redux/Actions/Spotify';
import * as Progress from 'react-native-progress';
import Modal from "react-native-modal";
import DiscoveryConfiguration from '../../components/DiscoveryConfiguration';
import GestureRecognizer from 'rn-swipe-gestures';
import TrackStatistics from '../../components/TrackStatistics';

export default function Feed() {
    const dispatch = useDispatch();
    const trackRef = React.useRef();
    const [modalOneIsVisible, setModalOneIsVisible] = useState(false);
    const [modalTwoIsVisible, setModalTwoIsVisible] = useState(false);
    const [song_id, setSong_id] = useState(0);
    const { topTracks, isPlaying, progress, tracks } = useSelector((state) => state.Spotify);

    useEffect(() => {
        if (topTracks.length === 0) {
            dispatch(GetSpotifyCode());
            dispatch(GetGenres());
        } else {
            dispatch(PlayTrack(topTracks[0].song_id));
            dispatch(GetTrackLikes(topTracks[0].song_id))
            setSong_id(topTracks[0].song_id);
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
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.y / viewSize.height);
        if (tracks.length > 0) {
            dispatch(PlayTrack(tracks[pageNum].song_id));
        } else if (topTracks) {
            dispatch(PlayTrack(topTracks[pageNum].song_id));
        }
        setSong_id(tracks[pageNum].song_id)
    };

    const scrollToTop = () => {
        trackRef.current.scrollToOffset({ animated: true, offset: 0 });
    };

    return (
        <GestureRecognizer
            onSwipeRight={() => {
                if (modalTwoIsVisible) {
                    setModalTwoIsVisible(false);
                } else {
                    setModalOneIsVisible(true);
                }
            }}
            onSwipeLeft={() => {
                if (modalOneIsVisible) {
                    setModalOneIsVisible(false);
                } else {
                    setModalTwoIsVisible(true);
                }
            }}
            config={{
                detectSwipeUp: false,
                detectSwipeDown: false,
            }}
            style={ styles.container }
        >
            <Modal
                isVisible={modalOneIsVisible}
                onBackdropPress={() => setModalOneIsVisible(!modalOneIsVisible)} 
                onSwipeComplete={() => setModalOneIsVisible(!modalOneIsVisible)} 
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                swipeDirection="left"
                useNativeDriver
                hideModalContentWhileAnimating
                propagateSwipe
                style={{ margin: 0, width: Dimensions.get('window').width * .75 }}
            >
                <DiscoveryConfiguration scrollToTopCallback={scrollToTop}/>
            </Modal>
            <Modal
                isVisible={modalTwoIsVisible}
                onBackdropPress={() => setModalTwoIsVisible(!modalTwoIsVisible)} 
                onSwipeComplete={() => setModalTwoIsVisible(!modalTwoIsVisible)} 
                animationIn="slideInRight"
                animationOut="slideOutRight"
                swipeDirection="right"
                useNativeDriver
                hideModalContentWhileAnimating
                propagateSwipe
                style={{ margin: 0, width: Dimensions.get('window').width * .75, alignSelf: 'flex-end' }}
            >
                <TrackStatistics song_id={song_id}/>
            </Modal>
            {topTracks ? 
                tracks.length > 0 ? 
                <FlatList
                    ref={trackRef}
                    showsVerticalScrollIndicator={false}
                    data={tracks}
                    renderItem={renderItem}
                    pagingEnabled
                    keyExtractor={(item) => item.song_id}
                    onMomentumScrollEnd={onScrollEnd}
                /> 
                :
                <FlatList
                    ref={trackRef}
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
        </GestureRecognizer>
    )
}
