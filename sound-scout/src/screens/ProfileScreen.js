import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

const profilePic = "../../assets/profile-pic.jpg";
const s1 = "../../assets/p1.jpg";
const s2 = "../../assets/p2.jpeg";
const s3 = "../../assets/p3.jpg";

export default function App() {
    const { topTracks } = useSelector((state) => state.Spotify);
    const [rotated, setRotated] = useState(false);
    const rotationToDo = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
          transform: [{ rotateY: `${rotationToDo.value}deg` }],
        };
      });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require(profilePic)} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.dm}>
                        <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                        <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Music Listener</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Clairo&#39;s first male stan</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>3</Text>
                        <Text style={[styles.text, styles.subText]}>spotlights</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>312</Text>
                        <Text style={[styles.text, styles.subText]}>Followers</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>163</Text>
                        <Text style={[styles.text, styles.subText]}>Following</Text>
                    </View>
                </View>

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ padding: 10 }}>
                        { topTracks ? 
                            topTracks.map((track) => 
                                <TouchableOpacity key={track.song_id} style={[styles.mediaImageContainer, styles.shadowProp]} activeOpacity={1} 
                                    onPress={() => 
                                        {rotationToDo.value===180 ?
                                            (
                                                rotationToDo.value = withTiming(0, {duration: 1000, easing: Easing.out(Easing.exp)}),
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
                                            <Text style={[styles.text, styles.rotatedView]}>{track.name}</Text>
                                            <Text style={[{ marginVertical: 5 }, styles.rotatedView]}>{track.artist}</Text>
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
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Joel Fitz. Markley</Text> and <Text style={{ fontWeight: "400" }}>Mo Bamba</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Boy Pablo</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

//https://wallpapers.com/images/featured/4co57dtwk64fb7lv.jpg

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        borderRadius: 12
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 200,
        height: 200,
        borderRadius: 12,
        overflow: "visible",
        marginHorizontal: 20
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    songDiscContainer: {
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        borderColor: 'black',
        height: '100%'
    },
    rotatedView: {
        transform: [{ rotateY: '180deg' }]
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});
