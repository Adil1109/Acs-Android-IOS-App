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
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { RefreshControl } from 'react-native';
import AuthContext from '../../context/AuthContext';
import { FlashList } from '@shopify/flash-list';

const windowWidth = Dimensions.get('window').width;
const blurhash = 'LLOW$,j[~qof~Wj[M{j[WBfQIUay';

const HomeScreen = ({ navigation }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState('');
	const [end, setEnd] = useState(false);
	const [liking, setLiking] = useState(false);

	const authContext = useContext(AuthContext);

	const errColor = refreshing ? colors.primaryWhite : '#ee0000';

	const fetchData = async (page) => {
		try {
			const resp = await axios.get(
				`${process.env.EXPO_PUBLIC_BASE_URL}/api/posts/get-posts/?page=${page}`,
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
			setPosts((prev) => (page == 1 ? respData : [...prev, ...respData]));
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
			<Text style={[styles.error, { color: errColor }]}>No more posts!</Text>
		) : (
			<Text style={styles.error}>{error}</Text>
		);
	};

	const renderItem = ({ item }) => {
		const handleLikeUnlike = async () => {
			if (liking) return;
			try {
				setLiking(true);

				const updatedPosts = posts.map((post) => {
					if (post._id === item._id) {
						if (!post.likes.includes(authContext.user.userId)) {
							post.likes.push(authContext.user.userId);
						} else {
							const index = post.likes.indexOf(authContext.user.userId);
							post.likes.splice(index, 1);
						}
					}
					return post;
				});

				await axios.patch(
					`${process.env.EXPO_PUBLIC_BASE_URL}/api/posts/${
						item.likes.includes(authContext.user.userId) ? 'like' : 'unlike'
					}-post/${item._id}`,
					{
						headers: {
							authorization: `Bearer ${authContext.token}`,
							client: 'MOBILE',
						},
					}
				);

				setLiking(false);
				setPosts(updatedPosts);
			} catch (error) {
				console.log(error);
				setLiking(false);
			}
		};

		return (
			<View style={styles.card}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => navigation.navigate('Profile')}>
					<View style={styles.profileInfo}>
						{item.userId.profilePicture === 'no-profile-photo' ? (
							<Image
								style={styles.smallProfileImage}
								source={require('../../own-assets/profilePic.jpg')}
							/>
						) : (
							<Image
								style={styles.smallProfileImage}
								source={{
									uri: `${process.env.EXPO_PUBLIC_BASE_URL}/${item.userId.profilePicture}`,
								}}
								placeholder={blurhash}
								contentFit='cover'
								transition={1000}
							/>
						)}
						<View style={styles.profileTitle}>
							<Text style={styles.profileTitleMain}>
								{item.userId.firstName + ' ' + item.userId.lastName + ' '}
							</Text>
							{item.pictureType === 'profile-picture' && (
								<Text style={styles.profileTitleSecondary}>
									updated his profile picture.
								</Text>
							)}
						</View>
					</View>
				</TouchableOpacity>
				<View style={styles.postContainer}>
					<Text style={styles.postBodyText}>{item.postBody}</Text>
					{item.postPicture ? (
						<Image
							style={styles.postImage}
							source={{
								uri: `${process.env.EXPO_PUBLIC_BASE_URL}/${item.postPicture}`,
							}}
							placeholder={blurhash}
							contentFit='cover'
							transition={1000}
						/>
					) : null}
				</View>
				<View style={styles.LCContainer}>
					<Text style={styles.LCText}>
						{item.likes.length} {item.likes.length > 1 ? 'Likes' : 'Like'}
					</Text>
					<Text
						style={styles.LCText}
						onPress={() =>
							navigation.navigate('Comments', {
								postId: item._id,
							})
						}>
						{item.commentsCount} Comments
					</Text>
				</View>
				<View style={styles.LCActivityContainer}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.LCActivity}
						onPress={handleLikeUnlike}
						disabled={liking}>
						<AntDesign
							name='like1'
							size={26}
							color={
								item.likes.includes(authContext.user.userId)
									? colors.primaryColor
									: 'gray'
							}
						/>
						<Text
							style={[
								styles.LCActivityText,
								{
									color: item.likes.includes(authContext.user.userId)
										? colors.primaryColor
										: 'gray',
								},
							]}>
							Like
						</Text>
					</TouchableOpacity>

					<View style={styles.LCActivity}>
						<FontAwesome name='comment' size={26} color={'gray'} />
						<Text style={styles.LCActivityText}>Comment</Text>
					</View>
				</View>
			</View>
		);
	};

	return (
		// HEADER CODE
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<Image
					style={styles.logo}
					source={require('../../own-assets/logo.jpg')}
				/>
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => {
						navigation.navigate('SearchForm');
					}}>
					<AntDesign
						name='search1'
						style={styles.search}
						size={30}
						color='#555'
					/>
				</TouchableOpacity>
			</View>
			<View style={{ height: 75 }} />

			<TouchableOpacity
				activeOpacity={0.9}
				style={styles.FAB}
				onPress={() => {
					navigation.navigate('CreatePost');
				}}>
				<FontAwesome
					name='pencil-square-o'
					size={30}
					color={colors.primaryWhite}
				/>
			</TouchableOpacity>

			{/* LIST CODE */}
			{/* LIST CODE */}
			<FlashList
				data={posts}
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
				onEndReachedThreshold={0.5}
				estimatedItemSize={200}
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

	card: {
		width: windowWidth - 10,
		maxWidth: 390,
		minHeight: 150,
		margin: 5,
		marginTop: 10,
		padding: 15,
		paddingBottom: 6,
		backgroundColor: colors.secondaryWhite,
		borderRadius: 10,
		elevation: 5,
	},
	profileInfo: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	smallProfileImage: {
		width: 35,
		borderRadius: 100,
		aspectRatio: 1,
		borderColor: 'lightgray',
		borderWidth: 2,
	},
	profileTitle: {
		marginLeft: 6,
		flexDirection: 'row',
		alignItems: 'center',
	},

	profileTitleMain: {
		fontWeight: '500',
		color: colors.primaryColor,
		fontSize: 20,
	},
	profileTitleSecondary: {
		fontSize: 18,
		color: '#444',
	},

	postContainer: {
		flexGrow: 1,
	},

	postBodyText: {
		fontSize: 18,
		padding: 2,
		marginTop: 5,
		marginBottom: 5,
		color: colors.secondaryColor,
	},

	postImage: {
		width: 200,
		aspectRatio: 1,
		alignSelf: 'center',
		borderRadius: 100,
		marginTop: 5,
		marginBottom: 10,
		backgroundColor: '#0553',
		borderColor: 'lightgray',
		borderWidth: 3,
	},

	LCContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 4,
	},
	LCText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#5a5a5a',
	},
	LCActivityContainer: {
		height: 40,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'space-between',
		borderTopWidth: 1,
		borderTopColor: 'gray',
	},
	LCActivity: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 5,
	},
	LCActivityText: {
		marginLeft: 3,
		fontSize: 17,
		color: 'gray',
		fontWeight: 'bold',
	},
	search: {
		margin: 15,
	},
	logoContainer: {
		flex: 1,
		width: windowWidth,
		maxWidth: 390,
		height: 75,
		marginBottom: 75,
		backgroundColor: colors.primaryWhite,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		position: 'absolute',
		elevation: 5,
		zIndex: 2,
	},
	logo: {
		height: 60,
		width: 60,
		margin: 15,
		borderRadius: 10,
	},

	error: {
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 90,
	},
});

export default HomeScreen;
