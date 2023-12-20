import React, { useCallback, useContext, useEffect, useState } from 'react';

import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
	StatusBar,
	Dimensions,
	Image,
} from 'react-native';
import colors from '../../constants/colors';
import axios from 'axios';
import { RefreshControl } from 'react-native';
import AuthContext from '../../context/AuthContext';
import { FlashList } from '@shopify/flash-list';

const windowWidth = Dimensions.get('window').width;
const blurhash = 'LLOW$,j[~qof~Wj[M{j[WBfQIUay';

const PlaylistsScreen = ({ route, navigation }) => {
	const [playlists, setPlaylists] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState('');
	const [end, setEnd] = useState(false);

	const authContext = useContext(AuthContext);

	const errColor = refreshing ? colors.primaryWhite : '#ee0000';

	const fetchData = async (page) => {
		try {
			const resp = await axios.get(
				`${process.env.EXPO_PUBLIC_BASE_URL}/api/playlists/get-teacher-playlists/${route.params.userId}/?page=${page}`,
				{
					headers: {
						authorization: `Bearer ${authContext.token}`,
						client: 'MOBILE',
					},
				}
			);

			setLoading(false);
			setRefreshing(false);
			const respData = resp.data.data;

			if (!respData) {
				setError('Data not received');
			}
			if (respData.length < 1) {
				setEnd(true);
			}
			if (!resp.data.success) {
				setError(data.message);
			}
			setPlaylists((prev) => (page == 1 ? respData : [...prev, ...respData]));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setLoading(true);
		fetchData(1);
	}, []);

	const loadMoreItem = () => {
		if (!end) {
			setLoading(true);
			const nextPage = page + 1;
			fetchData(nextPage);
			setPage(nextPage);
		}
	};

	const onRefresh = useCallback(() => {
		setEnd(false);
		setPage(1);
		setRefreshing(true);
		fetchData(1);
	});

	const renderLoader = () => {
		return loading ? (
			<View>
				<ActivityIndicator size='large' color={colors.primaryColor} />
			</View>
		) : end ? (
			<Text style={[styles.error, { color: errColor }]}>
				No more playlists!
			</Text>
		) : (
			<Text style={styles.error}>{error}</Text>
		);
	};

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={() =>
					navigation.navigate('VideoPlay', {
						title: item.title,
						description: item.description,
						playlistLink: item.playlistLink,
					})
				}>
				<View
					style={styles.card}
					onPress={() => {
						navigation.navigate('Playlists');
					}}>
					<Image
						style={styles.profileImage}
						source={{
							uri: `${item.thumbnailLink}`,
						}}
						placeholder={blurhash}
						contentFit='cover'
						transition={1000}
					/>

					<View style={styles.profileTitle}>
						<Text style={styles.profileTitleMain}>{item.title}</Text>
						<Text style={styles.profileTitleSecondary}>Physics</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		// HEADER CODE
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<Text style={styles.searchTitle}>Playlists</Text>
			</View>

			{/* LIST CODE */}
			{/* LIST CODE */}
			<FlashList
				data={playlists}
				refreshControl={
					<RefreshControl
						colors={[colors.primaryColor]}
						progressBackgroundColor={colors.primaryWhite}
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				renderItem={renderItem}
				keyExtractor={(item) => String(item._id)}
				ListFooterComponent={renderLoader}
				onEndReached={loadMoreItem}
				onEndReachedThreshold={0.1}
				estimatedItemSize={50}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primaryWhite,
		marginTop: StatusBar.currentHeight,
	},
	FAB: {
		backgroundColor: colors.primaryColor,
		width: 60,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 100,
		elevation: 5,
		position: 'absolute',
		bottom: 100,
		right: 16,
		zIndex: 2,
	},
	logoContainer: {
		backgroundColor: colors.secondaryWhite,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 10,
	},
	searchTitle: {
		fontSize: 20,
		margin: 15,
	},

	card: {
		width: windowWidth - 10,
		maxWidth: 390,
		minHeight: 100,
		flexDirection: 'row',
		alignItems: 'center',
		margin: 5,
		padding: 5,
		backgroundColor: colors.secondaryWhite,
		borderRadius: 10,
		elevation: 5,
	},

	profileImage: {
		height: 80,
		borderRadius: 10,
		aspectRatio: 1.77777777778,
		borderColor: 'lightgray',
		borderWidth: 2,
	},
	profileTitle: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginLeft: 10,
	},

	profileTitleMain: {
		fontWeight: '500',
		color: colors.primaryColor,
		fontSize: 25,
	},
	profileTitleSecondary: {
		fontWeight: '500',
		color: colors.secondaryColor,
		fontSize: 18,
	},

	error: {
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 90,
	},
});

export default PlaylistsScreen;
