import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import VerticalSlider from 'rn-vertical-slider';

export default function DiscoveryConfiguration() {
    const dispatch = useDispatch();
    const [genre, setGenre] = useState('');
    const [popularity, setPopularity] = useState(0);
    const { genres } = useSelector((state) => state.Spotify);

    const onPress = () => {
        
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.selector}>
                    <Text style={styles.genreText}>Genre of Discovery</Text>
                    <SelectList 
                        setSelected={(genre) => setGenre(genre)} 
                        data={genres}
                        save="value"
                        label="Genres"
                        placeholder="Select Genre"
                        boxStyles={{borderRadius:0}}
                        dropdownStyles={{borderRadius:0}}
                        searchicon={<View/>}
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