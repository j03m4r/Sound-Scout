import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { GetProfile } from "../../Redux/Actions/Profile";
import styles from './styles';
import { useNavigation } from "@react-navigation/native";

const defaultPic = "../../../assets/profile-pic.jpg";

export default function App() {
    const { topTracks } = useSelector((state) => state.Spotify);
    const { following, followers, profilePic, recentActivity } = useSelector((state) => state.Profile);
    const { username } = useSelector((state) => state.Authentication);
    const [rotated, setRotated] = useState(false);
    const rotationToDo = useSharedValue(0);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        const subscribe = navigation.addListener('focus', () => {
            dispatch(GetProfile(username))
        });

        return subscribe;
    }, [navigation])

    useEffect(() => {
        dispatch(GetProfile(username))
    }, []);

    const animatedStyles = useAnimatedStyle(() => {
        return {
          transform: [{ rotateY: `${rotationToDo.value}deg` }],
        };
    });

    return (
        <SafeAreaView style={styles.container1}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.personalDms} onPress={() => navigation.navigate('conversations', {mode: 'conversations', username: username})}>
                    <MaterialIcons name="chat" size={25} color="#DFD8C8"></MaterialIcons>
                </TouchableOpacity>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        {profilePic ? 
                            <Image  source={{ uri: profilePic}} style={styles.image}></Image>
                        :
                            <Image source={require(defaultPic)} style={styles.image}></Image>
                        }
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 36 }]}>{username}</Text>
                    {/* <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Clairo&#39;s first male stan</Text> */}
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        {recentActivity ?  // change this so that it reflects how many of your songs have been liked
                            <Text style={[styles.text, { fontSize: 24 }]}>{recentActivity.length}</Text>
                        :
                            <Text style={[styles.text, { fontSize: 24 }]}>0</Text>
                        }
                        <Text style={[styles.text, styles.subText]}>spotlights</Text>
                    </View>
                    <TouchableOpacity style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]} onPress={() => navigation.navigate('followers', {mode: 'followers', username: username})}>
                        {followers ? 
                        <Text style={[styles.text, { fontSize: 24 }]}>{followers.length}</Text>
                        :
                        <Text style={[styles.text, { fontSize: 24 }]}>0</Text>
                        }
                        <Text style={[styles.text, styles.subText]}>Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statsBox} onPress={() => navigation.navigate('following', {mode: 'following', username: username})}>
                        {following ? 
                        <Text style={[styles.text, { fontSize: 24 }]}>{following.length}</Text>
                        :
                        <Text style={[styles.text, { fontSize: 24 }]}>0</Text>
                        }
                        <Text style={[styles.text, styles.subText]}>Following</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ padding: 10 }}>
                        { topTracks ? 
                            topTracks.map((track) => 
                                <TouchableOpacity key={track.song_id} style={[styles.mediaImageContainer, styles.shadowProp]} activeOpacity={1} 
                                    onPress={() => 
                                        {rotationToDo.value===180 ?
                                            (
                                                rotationToDo.value = withTiming(360, {duration: 1000, easing: Easing.out(Easing.exp)}),
                                                setRotated(false)
                                            )
                                        :
                                            (
                                                rotationToDo.value = withTiming(180, {duration: 1000, easing: Easing.out(Easing.exp)}),
                                                setRotated(true)
                                            )
                                        }
                                    }>
                                    {rotated ? 
                                        <Animated.View style={[animatedStyles, styles.rotatedView, styles.songDiscContainer]}>
                                            <Text style={[styles.text, styles.rotatedView]} numberOfLines={2} adjustsFontSizeToFit={true}>{track.name}</Text>
                                            <Text style={[{ marginVertical: 5 }, styles.rotatedView]} numberOfLines={2} adjustsFontSizeToFit={true}>{track.artist}</Text>
                                            <Text style={styles.rotatedView}>{track.album}</Text>
                                        </Animated.View>
                                    :
                                        <Animated.Image source={{ uri: track.img_url }} style={[styles.image, animatedStyles]} resizeMode="cover"/>
                                    }
                                </TouchableOpacity>
                            )
                        :
                            <View>
                                <Text>Loading Tracks...</Text>
                            </View>
                        }
                    </ScrollView>
                </View>
                <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
                <View style={{ alignItems: "center" }}>
                    {recentActivity.map((activity, index) => // for some reason recentActivity.reverse().map() kept reversing it as i flipped the tracks, so I switched the reversing method
                    <View key={recentActivity[recentActivity.length - 1 - index].created_at} style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                {recentActivity[recentActivity.length - 1 - index].content}
                            </Text>
                        </View>
                    </View>
                    )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}