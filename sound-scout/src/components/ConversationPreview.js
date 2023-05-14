import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function ConversationPreview({ image_url, username, id }) {
    const navigation = useNavigation();
    const [latestMessage, setLatestMessage] = useState('');
    const { conversations } = useSelector((state) => state.Profile);

    useEffect(() => {
        const conversation = conversations.filter(function(conversation) { return conversation.id===id })[0];
        if (conversation.messages.length > 0) {
            if (conversation.messages[conversation.messages.length - 1].type==='text') {
                setLatestMessage(conversation.messages[conversation.messages.length - 1].text);
            } else {
                setLatestMessage(`${conversation.messages[conversation.messages.length - 1].track.name} - ${conversation.messages[conversation.messages.length - 1].track.artist}`);
            }
        } else {
            setLatestMessage('Start the conversation!');
        }
    }, [conversations,])

    return (
    <TouchableOpacity onPress={() => navigation.navigate('conversation', { username: username, image_url: image_url })}>
        <View style={styles.profileInstance}>
            <Image source={{ uri: image_url }} style={styles.profileIconLarge} />
            <View style={{ alignItems: 'flex-start' }}>
                <Text style={styles.usernameText} numberOfLines={2}>{username}</Text>
                <Text numberOfLines={1}>{latestMessage}</Text>
            </View>
        </View>
    </TouchableOpacity>
    )
}