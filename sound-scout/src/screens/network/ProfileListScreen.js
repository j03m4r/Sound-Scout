import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import ProfileElement from '../../components/ProfileElement';
import ConversationPreview from '../../components/ConversationPreview';
import { SendTrackMessage } from '../../Redux/Actions/Profile';

export default function ProfileListScreen({ route }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [iterable, setIterable] = useState([]);
    const [username, setUsername] = useState('');
    const [headerText, setHeaderText] = useState('');
    const [filteredFriends, setFilteredFriends] = useState(Array);
    const [selectedFriends, setSelectedFriends] = useState(Array);
    const { tracks } = useSelector((state) => state.Spotify);
    const { otherFollowing, otherFollowers, conversations } = useSelector((state) => state.Profile);

    useEffect(() => {
        if (route.params.mode==='listeners') {
            setIterable(tracks.filter(function(track) { return track.song_id == route.params.song_id})[0].listeners);
            setHeaderText('Track Listeners');
        } else if (route.params.mode==='followers') {
            setIterable(otherFollowers);
            setHeaderText('Followers');
        } else if (route.params.mode==='following') {
            setIterable(otherFollowing);
            setHeaderText('Following');
        } else if (route.params.mode==='conversations') {
            setIterable(conversations);
            setHeaderText('Messages');
        } else if (route.params.mode==='select-friends') {
            var ids = [];
            otherFollowing.forEach((person) => ids.push(person.id));
            const friends = otherFollowers.filter(function(person) { return ids.includes(person.id)});
            setIterable(friends);
        }
    }, []);

    return (
        <View style={styles.container0}>
            <View style={styles.listScreenHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name='arrow-left' size={24} />
                </TouchableOpacity>
                {route.params.mode==='select-friends' ?
                    <View style={styles.inputContainer}>
                        <Feather name='search' size={18} color='#a9a9a9' />
                        <TextInput style={styles.textInput} 
                            placeholder='Search (Tap to Select)'
                            placeholderTextColor='#a9a9a9'
                            onChangeText={(text) => {setUsername(text), setFilteredFriends(iterable.filter(function(friend) { return friend.user.username.includes(text) }))}}
                            value={username}
                        />
                    </View>
                :
                    <Text style={[styles.usernameText, { marginLeft: 15 }]}>{headerText}</Text>
                }
            </View>
                { iterable ? 
                    route.params.mode==='conversations' ? 
                    iterable.map((conversation) => 
                        conversation.user_1.user.username!==route.params.username ? 
                            <ConversationPreview key={conversation.id} image_url={conversation.user_1.image_url}
                            username={conversation.user_1.user.username} id={conversation.id} />
                        :
                            <ConversationPreview key={conversation.id} image_url={conversation.user_2.image_url} 
                            username={conversation.user_2.user.username} messages={conversation.messages} id={conversation.id} />
                    )
                    :
                    route.params.mode==='select-friends' ?
                        username!=='' ? // filtering friends
                            filteredFriends.map((friend) => 
                                <ProfileElement key={friend.user.id} image_url={friend.image_url} 
                                username={friend.user.username} route={route} setSelectedFriends={setSelectedFriends}
                                selectedFriends={selectedFriends} />
                            )
                        : // not filtering friends
                            iterable.map((profile) => 
                                <ProfileElement key={profile.user.id} image_url={profile.image_url} 
                                username={profile.user.username} route={route} setSelectedFriends={setSelectedFriends} 
                                selectedFriends={selectedFriends} />
                            )
                    : // default case (viewing followers/following)
                        iterable.map((profile) => 
                                <ProfileElement key={profile.user.id} image_url={profile.image_url} username={profile.user.username} route={route}/>
                        )
                :
                    <Text>Loading...</Text>
                }
                {route.params.mode==='select-friends'&&selectedFriends.length>0 ? 
                    <TouchableOpacity style={styles.sendTrackButton} onPress={() => {
                        selectedFriends.forEach((username) => {
                            dispatch(SendTrackMessage(username, route.params.song_id));
                        })
                        navigation.goBack();
                    }}>
                        <Feather name='send' size={35} color='#006AFF' />
                    </TouchableOpacity>
                :
                    null
                }
        </View>
    )
}