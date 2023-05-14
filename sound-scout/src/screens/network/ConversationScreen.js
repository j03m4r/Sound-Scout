import React, { useEffect, useState, useMemo } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, KeyboardAvoidingView, TextInput } from 'react-native'
import styles from './styles'
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { SendTextMessage, SetConversation } from '../../Redux/Actions/Profile';
import TextMessage from '../../components/TextMessage';
import TrackMessage from '../../components/TrackMessage';

export default function ConversationScreen({ route }) {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const messageRef = React.useRef();
	const { conversations, conversation } = useSelector((state) => state.Profile);
	const [messages, setMessages] = useState([])
	const [text, setText] = useState('');

	useEffect(() => {
		for (let i = 0; i < conversations.length; i++) {
			if (conversations[i].user_1.user.username===route.params.username) {
				dispatch(SetConversation(conversations[i]));
			} else if (conversations[i].user_2.user.username===route.params.username) {
				dispatch(SetConversation(conversations[i]));
			}
		}
	}, []);

	useEffect(() => {
		setMessages(conversation.messages);
	}, [conversation.messages ? conversation.messages.length : null,])

	const renderItem = ({ item }) => {
		let isLast = false;
		if (conversation.messages && conversation.messages.length > 0 && item.id === conversation.messages[conversation.messages.length - 1].id) {
			isLast = true;
		}
        return (
			<View>
				{item.type==='text' ? 
				<TextMessage text={item.text} createdAt={item.created_at} sender={item.sender.username} isLast={isLast} />
				:
				<TrackMessage track={item.track} createdAt={item.created_at} sender={item.sender.username} isLast={isLast} />
				}
			</View>
        )
    };
	const memoizedValue = useMemo(() => renderItem, [messages]);

    return (
      <View style={styles.conversationScreenContainer}>
			<View style={styles.conversationScreenHeader}>
				<TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
					<Feather name='arrow-left' size={24} />
				</TouchableOpacity>
				<TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => navigation.navigate('otherProfile', { username: route.params.username })}>
					<Image source={{ uri: route.params.image_url }} style={[styles.profileIconLarge, { marginHorizontal: 20 }]} />
					<Text style={styles.usernameText}>{route.params.username}</Text>
				</TouchableOpacity>
			</View>
			<View style={{ flex: 1, paddingTop: 15, paddingHorizontal: 10 }}>
				{Object.keys(conversation).length!==0 ? 
					<FlatList 
						ref={messageRef}
						showsVerticalScrollIndicator={false}
						inverted 
						contentContainerStyle={{ flexDirection: 'column-reverse' }}
						data={messages}
						renderItem={memoizedValue}
						keyExtractor={(message) => message.id}
					/>
				:
				null
				}
			</View>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<View style={styles.messageContainer}>
					<TouchableOpacity style={styles.likedTracksButton} onPress={() => navigation.navigate('track-browse', { username: route.params.username })}>
						<Ionicons name='heart' size={20} color='#fff' />
					</TouchableOpacity>
					<TextInput style={styles.messageInput}
						placeholder='Write a message'
						placeholderTextColor='#a9a9a9'
						onChangeText={(text) => setText(text)}
						value={text}
					/>
					<TouchableOpacity style={styles.sendButton} onPress={() => {
						if (text !== '') {
							dispatch(SendTextMessage(route.params.username, text))
							setText('');
						}
					}}>
						<Feather name='arrow-up' size={30} color='#fff' />
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
    )
}