// /* eslint-disable prettier/prettier */

import React, { useState, useCallback, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	Text,
	ScrollView,
	ActivityIndicator,
	StatusBar,
	TouchableOpacity,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import colors from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

export default function VideoPlayScreen({ route, navigation }) {
	const { title, description, playlistLink } = route.params;
	const [error, setError] = useState(false);
	const [playing, setPlaying] = useState(true);
	const [unstarted, setUnstarted] = useState(true);

	function extractPlaylistIdFromUrl(url) {
		const playlistIdPattern = /list=([a-zA-Z0-9_-]+)/;
		const match = url.match(playlistIdPattern);

		if (match && match.length >= 2) {
			return match[1];
		} else {
			return null;
		}
	}

	const playlistId = extractPlaylistIdFromUrl(playlistLink);

	const onStateChange = useCallback((state) => {
		if (state === 'ended') {
			setPlaying(false);
		}
	}, []);

	return (
		<View style={styles.container}>
			{unstarted ? (
				<ActivityIndicator
					style={{
						position: 'absolute',
						zIndex: 2,
						top: 5,
						left: windowWidth / 2 - 15,
					}}
					size='large'
					color={colors.primaryColor}
				/>
			) : null}
			<View style={styles.videoContainer}>
				<YoutubePlayer
					height={300}
					onReady={() => {
						setUnstarted(false);
					}}
					play={playing}
					playList={playlistId}
					onChangeState={onStateChange}
					unstarted={unstarted}
				/>

				{error ? (
					<Text
						style={{
							textAlign: 'center',
							color: 'red',
							fontSize: 18,
							padding: 10,
						}}>
						Cannot play video! Try browising from the link below!
					</Text>
				) : null}
			</View>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.line} />
			<ScrollView>
				<View style={styles.linkView}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.browseBtn}
						onPress={() =>
							navigation.navigate('Browse', {
								link: playlistLink,
							})
						}>
						<AntDesign name='earth' size={28} color='#eee' />
						<Text style={styles.browseText}>Browse</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.descriptionst}>{description}</Text>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primaryWhite,
	},

	title: {
		fontSize: 20,
		color: '#222',
		fontWeight: 'bold',
		margin: 15,
	},

	videoContainer: {
		backgroundColor: '#000',
		height: 300 - StatusBar.currentHeight - 30,
	},

	line: {
		height: 1,
		width: windowWidth,
		backgroundColor: '#ddd',
		marginBottom: 10,
		elevation: 3,
	},
	descriptionst: {
		fontSize: 16,
		color: '#1B1212',
		fontFamily: 'sans-serif',
		fontWeight: 'bold',
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
	},

	linkView: {
		margin: 10,
	},

	link: {
		color: '#0F52BA',
	},
	browseBtn: {
		height: 40,
		width: 200,
		backgroundColor: colors.primaryColor,
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		elevation: 5,
	},
	browseText: {
		color: '#eee',
		fontSize: 24,
		paddingLeft: 4,
	},
});
