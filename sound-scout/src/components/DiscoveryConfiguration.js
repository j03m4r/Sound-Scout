import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import VerticalSlider from 'rn-vertical-slider';
import { DiscoverTracks } from '../Redux/Actions/Spotify';

export default function DiscoveryConfiguration({ scrollToTopCallback}) {
    const dispatch = useDispatch();
    const [genre, setGenre] = useState('');
    const [_genres, setGenres] = useState([]);
    const [popularity, setPopularity] = useState(0);
    const { genres } = useSelector((state) => state.Spotify);

    useEffect(() => {
        setGenres([{ key: 2000, value: 'Random' }, ...genres]);
    }, []);

    const onPress = () => {
        dispatch(DiscoverTracks(genre));
        scrollToTopCallback();
        setGenre('');
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.selector}>
                    <SelectList 
                        setSelected={(genre) => setGenre(genre)} 
                        data={_genres}
                        save="value"
                        label="Genres"
                        placeholder="Select Genre"
                        placeholderStyle={styles.placeholderStyle}
                        boxStyles={{borderRadius:0}}
                        dropdownStyles={{borderRadius:0}}
                        searchicon={<View/>}
                        inputStyles={{ color: 'black' }}
                        searchPlaceholder='Search Genres'
                    />
                </View>
                {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.popularityText}>Popularity of Song Search</Text>
                    <View>
                        <VerticalSlider
                        value={popularity}
                        onChange={(popularity) => setPopularity(popularity)}
                        height={250}
                        width={40}
                        step={1}
                        min={0}
                        max={100}
                        borderRadius={5}
                        minimumTrackTintColor="#000000"
                        maximumTrackTintColor="#fff"
                        showBallIndicator
                        ballIndicatorColor="#000000"
                        ballIndicatorTextColor="#fff"
                        ballIndicatorWidth={50}
                        ballIndicatorHeight={50}
                        />
                    </View>
                </View> */}
                <TouchableOpacity style={styles.button} onPress={onPress}>
				    <Text style={styles.buttonText}>Configure Discovery</Text>
			    </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}