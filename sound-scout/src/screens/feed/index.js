import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { GetSpotifyCode, PlayTrack, PauseTrack, ContinueTrack, GetGenres, GetTrackLikes } from '../../Redux/Actions/Spotify';
import { GetProfile } from '../../Redux/Actions/Profile';
import * as Progress from 'react-native-progress';
import Modal from "react-native-modal";
import DiscoveryConfiguration from '../../components/DiscoveryConfiguration';
import GestureRecognizer from 'rn-swipe-gestures';
import TrackStatistics from '../../components/TrackStatistics';
import { useNavigation } from '@react-navigation/native';

export default function Feed() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const trackRef = React.useRef();
    const [modalOneIsVisible, setModalOneIsVisible] = useState(false);
    const [modalTwoIsVisible, setModalTwoIsVisible] = useState(false);
    const [song_id, setSong_id] = useState(0);
    const [progress, setProgress] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const inactiveDotStyle = { width: 7.5, height: 7.5, borderRadius: 5, backgroundColor: '#d3d3d3'};
    const activeDotStyle = { width: 7.5, height: 7.5, borderRadius: 5, backgroundColor: '#a9a9a9'};
    const [leftDotStyle, setLeftDotStyle] = useState(inactiveDotStyle);
    const [middleDotStyle, setMiddleDotStyle] = useState(activeDotStyle);
    const [rightDotStyle, setRightDotStyle] = useState(inactiveDotStyle);
    const { topTracks, isPlaying, tracks } = useSelector((state) => state.Spotify);
    const { username } = useSelector((state) => state.Authentication);

    useEffect(() => {
        if (topTracks.length === 0) {
            dispatch(GetSpotifyCode());
            dispatch(GetGenres());
        } else {
            // dispatch(PlayTrack(topTracks[0].song_id));
            setStartTime(Date.now());
            setSong_id(topTracks[0].song_id);
        }
    }, [topTracks,]);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(Date.now() - startTime);
            }, 100);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setModalTwoIsVisible(false);
        });

        const subscribe = navigation.addListener('focus', () => {
            dispatch(GetProfile(username))
            setLeftDotStyle(inactiveDotStyle);
            setMiddleDotStyle(activeDotStyle);
            setRightDotStyle(inactiveDotStyle);
        });

        return unsubscribe, subscribe;
    }, [navigation])

    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, height: Dimensions.get('window').height - 114, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 316 }}>
                    <TouchableOpacity onPress={handleClick}>
                        <Image source={{ uri: item.img_url }} style={{ width: 316, height: 316 }}/>
                    </TouchableOpacity>
                    <Progress.Bar progress={progress/item.duration} width={316} borderWidth={0} borderRadius={0} color='black'/>
                    <View style={styles.songDiscContainer}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={{ marginVertical: 5 }}>{item.artist}</Text>
                        <Text>{item.album}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', position: 'absolute', bottom: 30 }}>
                    <TouchableOpacity style={inactiveDotStyle} onPress={() => {setMiddleDotStyle(inactiveDotStyle), setModalOneIsVisible(true)}} />
                    <View style={[activeDotStyle, { marginHorizontal: 10}]} />
                    <TouchableOpacity style={inactiveDotStyle} onPress={() => {setMiddleDotStyle(inactiveDotStyle), setModalTwoIsVisible(true)}} />
                </View>
            </View>
        )
    };
    const memoizedValue = useMemo(() => renderItem, [tracks]);

    const handleClick = () => {
        if (isPlaying) {
            // dispatch(PauseTrack());
        } else {
            // dispatch(ContinueTrack());
        }
    };

    const onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.y / viewSize.height);
        if (tracks.length > 0) {
            // dispatch(PlayTrack(tracks[pageNum].song_id));
        }
        setStartTime(Date.now());
        setSong_id(tracks[pageNum].song_id);
        dispatch(GetTrackLikes(tracks[pageNum].song_id));
    };

    const scrollToTop = () => {
        trackRef.current.scrollToOffset({ animated: true, offset: 0 });
    };

    return (
        <GestureRecognizer
            onSwipeRight={() => {
                if (modalTwoIsVisible) {
                    setModalTwoIsVisible(false);
                    setRightDotStyle(inactiveDotStyle);
                    setMiddleDotStyle(activeDotStyle);
                } else {
                    setModalOneIsVisible(true);
                    setLeftDotStyle(activeDotStyle);
                    setMiddleDotStyle(inactiveDotStyle);
                }
            }}
            onSwipeLeft={() => {
                if (modalOneIsVisible) {
                    setModalOneIsVisible(false);
                    setLeftDotStyle(inactiveDotStyle);
                    setMiddleDotStyle(activeDotStyle);
                } else {
                    setModalTwoIsVisible(true);
                    setRightDotStyle(activeDotStyle);
                    setMiddleDotStyle(inactiveDotStyle);
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
                onBackdropPress={() => {setMiddleDotStyle(activeDotStyle), setLeftDotStyle(inactiveDotStyle), setModalOneIsVisible(!modalOneIsVisible)}} 
                onSwipeComplete={() => {setMiddleDotStyle(activeDotStyle), setLeftDotStyle(inactiveDotStyle), setModalOneIsVisible(!modalOneIsVisible)}}
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
                onBackdropPress={() => {setMiddleDotStyle(activeDotStyle), setRightDotStyle(inactiveDotStyle), setModalTwoIsVisible(!modalTwoIsVisible)}}
                onSwipeComplete={() => {setMiddleDotStyle(activeDotStyle), setRightDotStyle(inactiveDotStyle), setModalTwoIsVisible(!modalTwoIsVisible)}}
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
            {tracks ? 
                <FlatList
                    ref={trackRef}
                    showsVerticalScrollIndicator={false}
                    data={tracks}
                    renderItem={memoizedValue}
                    maxToRenderPerBatch={10}
                    initialNumToRender={10}
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
