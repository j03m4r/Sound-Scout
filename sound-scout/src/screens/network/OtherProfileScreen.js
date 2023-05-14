import React, { useEffect } from "react";
import { Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useState } from "react";
import { GetProfile } from "../../Redux/Actions/Profile";
import { useNavigation } from "@react-navigation/native";
import { follow, unfollow } from "../../Redux/Actions/Profile";
import styles from './styles';

const defaultPic = "../../../assets/profile-pic.jpg";

export default function OtherProfileScreen({ route }) {
    const { otherFollowing, otherFollowers, otherProfilePic, 
        otherTopTracks, otherRecentActivity, isFollowing } = useSelector((state) => state.Profile);
    const { username } = useSelector((state) => state.Authentication);
    const [rotated, setRotated] = useState(false);
    const rotationToDo = useSharedValue(0);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        const subscribe = navigation.addListener('focus', () => {
            dispatch(GetProfile(route.params.username));
        });

        return subscribe;
    }, [navigation])

    useEffect(() => {
        dispatch(GetProfile(route.params.username))
    }, []);

    const animatedStyles = useAnimatedStyle(() => {
        return {
          transform: [{ rotateY: `${rotationToDo.value}deg` }],
        };
    });

    return (
        <SafeAreaView style={styles.container1}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.titleBar} onPress={() => navigation.goBack()}>
                        <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                    </TouchableOpacity>
                    {otherFollowing.filter(function(profile) { return profile.user.username===username}).length > 0&&isFollowing ?
                    <TouchableOpacity style={styles.dm} onPress={() => navigation.navigate('conversation', { username: route.params.username, image_url: otherProfilePic})}>
                        <MaterialIcons name="chat" size={25} color="#DFD8C8"></MaterialIcons>
                    </TouchableOpacity>
                    :
                    null
                    }
                </View>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        {otherProfilePic ? 
                            <Image  source={{ uri: otherProfilePic}} style={styles.image}></Image>
                        :
                            <Image source={require(defaultPic)} style={styles.image}></Image>
                        }
                    </View>
                    {route.params.username !== username ? 
                    <View>
                        <View style={styles.active}></View>
                        {!isFollowing ? 
                        <TouchableOpacity style={styles.add} onPress={() => dispatch(follow(route.params.username))}>
                            <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.add} onPress={() => dispatch(unfollow(route.params.username))}>
                            <Ionicons name="remove-outline" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                        </TouchableOpacity>
                        }
                        
                    </View>
                    :
                    null
                    }
                                       
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 36 }]}>{route.params.username}</Text>
                    {/* <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Clairo&#39;s first male stan</Text> */}
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        { otherRecentActivity ? 
                        <Text style={[styles.text, { fontSize: 24 }]}>{otherRecentActivity.length}</Text>
                        :
                        <Text style={[styles.text, { fontSize: 24 }]}>0</Text>
                        }
                        <Text style={[styles.text, styles.subText]}>spotlights</Text>
                    </View>
                    <TouchableOpacity style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]} onPress={() => navigation.navigate('followers', { mode: 'followers', username: route.params.username })}> 
                        {otherFollowers ? 
                        <Text style={[styles.text, { fontSize: 24 }]}>{otherFollowers.length}</Text>
                        :
                        <Text style={[styles.text, { fontSize: 24 }]}>0</Text>
                        }
                        <Text style={[styles.text, styles.subText]}>Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statsBox} onPress={() => navigation.navigate('following', { mode: 'following', username: route.params.username })}>
                        {otherFollowing ? 
                        <Text style={[styles.text, { fontSize: 24 }]}>{otherFollowing.length}</Text>
                        :
                        <Text style={[styles.text, { fontSize: 24 }]}>0</Text>
                        }
                        <Text style={[styles.text, styles.subText]}>Following</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ padding: 10 }}>
                        { otherTopTracks ? 
                            otherTopTracks.map((track) => 
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
                                <Text>No Tracks!</Text>
                            </View>
                        }
                    </ScrollView>
                </View>
                <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
                <View style={{ alignItems: "center" }}>
                { otherRecentActivity ? 
                    otherRecentActivity.map((activity, index) => // for some reason recentActivity.reverse().map() kept reversing it as i flipped the tracks, so I switched the reversing method
                    <View key={otherRecentActivity[otherRecentActivity.length - 1 - index].created_at} style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                {otherRecentActivity[otherRecentActivity.length - 1 - index].content}
                            </Text>
                        </View>
                    </View>
                    )
                :
                    <View>
                        <Text>Loading Recent Activity...</Text>
                    </View>
                }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
