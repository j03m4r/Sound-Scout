import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { styles } from './styles';

export default function TextMessage({ text, createdAt, sender, isLast}) {
    const { username } = useSelector((state) => state.Authentication);
    return (
        <View>
            {sender===username ?
                isLast ? 
                <View style={[styles.senderMessage, styles.senderShadowPropWithMargin]}>
                    <Text style={styles.textMessage}>{text}</Text>
                </View>
                :
                <View style={[styles.senderMessage, styles.senderShadowProp]}>
                    <Text style={styles.textMessage}>{text}</Text>
                </View>
            :
                isLast ?
                <View style={[styles.receiverMessage, styles.receiverShadowPropWithMargin]}>
                    <Text style={styles.textMessage}>{text}</Text>
                </View>
                :
                <View style={[styles.receiverMessage, styles.receiverShadowProp]}>
                    <Text style={styles.textMessage}>{text}</Text>
                </View>
            }
        </View>
    )
}