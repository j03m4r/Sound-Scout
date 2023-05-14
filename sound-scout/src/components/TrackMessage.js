import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import { Ionicons } from "@expo/vector-icons";
import { PauseTrack, PlayTrack, ContinueTrack } from '../Redux/Actions/Spotify';

export default function TrackMessage({ track, createdAt, sender, isLast}) {
	const dispatch = useDispatch();
	const [hasPlayed, setHasPlayed] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const { username } = useSelector((state) => state.Authentication);
	return (
		<View>
			{sender===username ?
                isLast ? 
				<View style={[styles.senderTrackMessage, styles.senderShadowPropWithMargin]}>
					<Image source={{ uri: track.img_url }} style={styles.track}/>
					<View style={styles.trackPlayerContainer}>
						<Text numberOfLines={1} style={[styles.textMessage, { margin: 15, fontWeight: 'bold', maxWidth: 150 }]}>{track.name}</Text>
						{!isPlaying ?
						<TouchableOpacity style={styles.playButtonContainer} onPress={() => {
							if (!hasPlayed) {
								dispatch(PlayTrack(track.song_id))
								setHasPlayed(true);
							} else {
								dispatch(ContinueTrack());
							}
							setIsPlaying(true);
						}}>
							<Ionicons name='play' size={15} color='#fff' style={{ marginLeft: 2 }}/>
						</TouchableOpacity>
						:
						<TouchableOpacity style={styles.playButtonContainer} onPress={() => {dispatch(PauseTrack()), setIsPlaying(false)}}>
							<Ionicons name='pause' size={15} color='#fff' style={{ marginLeft: 1 }}/>
						</TouchableOpacity>
						}
					</View>
				</View>
                :
				<View style={[styles.senderTrackMessage, styles.senderShadowProp]}>
					<Image source={{ uri: track.img_url }} style={styles.track}/>
					<View style={styles.trackPlayerContainer}>
						<Text numberOfLines={1} style={[styles.textMessage, { margin: 15, fontWeight: 'bold', maxWidth: 150}]}>{track.name}</Text>
						{!isPlaying ?
						<TouchableOpacity style={styles.playButtonContainer} onPress={() => {
							if (!hasPlayed) {
								dispatch(PlayTrack(track.song_id))
								setHasPlayed(true);
							} else {
								dispatch(ContinueTrack());
							}
							setIsPlaying(true);
						}}>
							<Ionicons name='play' size={15} color='#fff' style={{ marginLeft: 2 }}/>
						</TouchableOpacity>
						:
						<TouchableOpacity style={styles.playButtonContainer} onPress={() => {dispatch(PauseTrack()), setIsPlaying(false)}}>
							<Ionicons name='pause' size={15} color='#fff' style={{ marginLeft: 1 }}/>
						</TouchableOpacity>
						}	
					</View>
				</View>
            :
                isLast ?
				<View style={[styles.receiverTrackMessage, styles.receiverShadowPropWithMargin]}>
					<Image source={{ uri: track.img_url }} style={styles.track}/>
					<View style={styles.trackPlayerContainer}>
						<Text numberOfLines={1} style={[styles.textMessage, { margin: 15, fontWeight: 'bold', maxWidth: 150 }]}>{track.name}</Text>
						{!isPlaying ?
						<TouchableOpacity style={styles.playButtonContainer} onPress={() => {
							if (!hasPlayed) {
								dispatch(PlayTrack(track.song_id))
								setHasPlayed(true);
							} else {
								dispatch(ContinueTrack());
							}
							setIsPlaying(true);
						}}>
							<Ionicons name='play' size={15} color='#fff' style={{ marginLeft: 2 }}/>
						</TouchableOpacity>
						:
						<TouchableOpacity style={styles.playButtonContainer} onPress={() => {dispatch(PauseTrack()), setIsPlaying(false)}}>
							<Ionicons name='pause' size={15} color='#fff' style={{ marginLeft: 1 }}/>
						</TouchableOpacity>
						}
					</View>
				</View>
                :
				<View style={[styles.receiverTrackMessage, styles.receiverShadowProp]}>
					<Image source={{ uri: track.img_url }} style={styles.track}/>
					<View style={styles.trackPlayerContainer}>
						<Text style={[styles.textMessage, { margin: 15, fontWeight: 'bold', maxWidth: 150}]}>{track.name}</Text>
						{!isPlaying ?
						<TouchableOpacity style={styles.playButtonContainer} onPress={() => {
							if (!hasPlayed) {
								dispatch(PlayTrack(track.song_id))
								setHasPlayed(true);
							} else {
								dispatch(ContinueTrack());
							}
							setIsPlaying(true);
						}}>
							<Ionicons name='play' size={15} color='#fff' style={{ marginLeft: 2 }}/>
						</TouchableOpacity>
						:
						<TouchableOpacity style={styles.playButtonContainer} onPress={() => {dispatch(PauseTrack()), setIsPlaying(false)}}>
							<Ionicons name='pause' size={15} color='#fff' style={{ marginLeft: 1 }}/>
						</TouchableOpacity>
						}
					</View>
				</View>
            }
		</View>
	)
}