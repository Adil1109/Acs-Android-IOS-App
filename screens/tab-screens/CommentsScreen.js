import {
	Dimensions,
	Image,
	KeyboardAvoidingView,
	Platform,
	RefreshControl,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native';
import colors from '../../constants/colors';
import { TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const blurhash = 'LLOW$,j[~qof~Wj[M{j[WBfQIUay';

const CommentsScreen = ({ route, navigation }) => {
	const [comments, setComments] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState('');
	const [end, setEnd] = useState(false);
	const [voting, setVoting] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [selectedImage, setSelectedImage] = useState(null);
	const [commentBody, setCommentBody] = useState('');

	const authContext = useContext(AuthContext);
	const { postId } = route.params;

	const errColor = refreshing ? colors.primaryWhite : '#ee0000';

	const fetchData = async (page) => {
		try {
			const resp = await axios.get(
				`${process.env.EXPO_PUBLIC_BASE_URL}/api/comments/${postId}/get-comments/?page=${page}`,
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
			console.log(respData);
			if (!respData) {
				setError('Data not received');
			}
			if (respData.length < 1) {
				setEnd(true);
			}
			if (!resp.data.success) {
				setError(data.message);
			}
			setComments((prev) => (page == 1 ? respData : [...prev, ...respData]));
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

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1.91, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
		}
	};

	const uploadComment = async () => {
		try {
			const formData = new FormData();

			if (commentBody) {
				formData.append('commentBody', commentBody);
			}

			if (selectedImage) {
				const filename = selectedImage.split('/').pop();
				const fileExtension = filename.split('.').pop().toLowerCase();

				const allowedExtensions = ['jpg', 'png', 'jpeg'];
				if (!allowedExtensions.includes(fileExtension)) {
					console.log(
						'Invalid image format. Please select a jpg, png, or jpeg image.'
					);
					return;
				}

				formData.append('comment-picture', {
					uri: selectedImage,
					name: filename,
					type: `image/${fileExtension}`,
				});
			}

			setCommentBody('');
			setSelectedImage(null);

			const url = `${process.env.EXPO_PUBLIC_BASE_URL}/api/comments/${postId}/create-comment`;
			const headers = {
				authorization: `Bearer ${authContext.token}`,
				client: 'MOBILE',
				'Content-Type': 'multipart/form-data',
			};

			const response = await axios.post(url, formData, {
				headers,
				onUploadProgress: (progressEvent) => {
					const progress = Math.round(
						(progressEvent.loaded / progressEvent.total) * 100
					);
					setUploadProgress(progress);
				},
			});

			console.log(uploadProgress);

			console.log(response.data);
		} catch (error) {
			console.log(error.response);
		}
	};

	const renderLoader = () => {
		return loading ? (
			<View>
				<ActivityIndicator size='large' color={colors.primaryColor} />
			</View>
		) : end ? (
			<Text style={[styles.error, { color: errColor }]}>No more comments!</Text>
		) : (
			<Text style={styles.error}>{error}</Text>
		);
	};

	const renderItem = ({ item }) => {
		const handleUpvoteDownvote = async () => {
			if (voting) return;
			if (item.upvoted) {
				if (item.upvotedBy !== authContext.user.userId) return;
			}
			try {
				setVoting(true);

				const updatedComments = comments.map((comment) => {
					if (comment._id === item._id) {
						if (comment.upvoted === false) {
							comment.upvoted = true;
						} else {
							comment.upvoted = false;
						}
					}
					return comment;
				});

				const route = item.upvoted ? 'add-upvote' : 'remove-upvote';

				const resp = await axios.patch(
					`${process.env.EXPO_PUBLIC_BASE_URL}/api/comments/${route}/${item._id}/${item.userId._id}`,
					null,
					{
						headers: {
							authorization: `Bearer ${authContext.token}`,
							client: 'MOBILE',
						},
					}
				);
				setVoting(false);
				setComments(updatedComments);
			} catch (error) {
				setVoting(false);
			}
		};

		return (
			<View style={styles.card}>
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
				</View>
				<View style={styles.commentContainer}>
					<View style={styles.profileTitle}>
						<Text style={styles.profileTitleMain}>
							{item.userId.firstName + ' ' + item.userId.lastName + ' '}
						</Text>
					</View>
					{item.commentBody ? (
						<Text style={styles.commentBodyText}>{item.commentBody}</Text>
					) : null}
					{item.commentPicture ? (
						<Image
							style={styles.commentImage}
							source={{
								uri: `${process.env.EXPO_PUBLIC_BASE_URL}/${item.commentPicture}`,
							}}
							placeholder={blurhash}
							contentFit='cover'
							transition={1000}
						/>
					) : null}
					<TouchableOpacity
						activeOpacity={0.8}
						style={{ alignSelf: 'flex-end', padding: 5, paddingBottom: 10 }}
						onPress={handleUpvoteDownvote}
						disabled={voting}>
						<MaterialCommunityIcons
							name='arrow-up-bold-circle'
							size={35}
							color={item.upvoted ? colors.primaryColor : 'gray'}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<FlashList
				data={comments}
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
				estimatedItemSize={200}
			/>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.commentBoxView}>
				{selectedImage && (
					<Image
						source={{ uri: selectedImage }}
						style={styles.selectedImageStyle}
					/>
				)}
				<TextInput
					placeholder='Write a Comment'
					style={styles.commentBox}
					multiline={true}
					onChangeText={(text) => setCommentBody(text)}
					value={commentBody}
				/>
				<View style={styles.btnContainer}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.btn}
						onPress={pickImage}>
						<MaterialCommunityIcons
							name='image'
							color={colors.primaryColor}
							size={35}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.btn}
						onPress={uploadComment}>
						<MaterialCommunityIcons
							name='send'
							color={colors.primaryColor}
							size={35}
						/>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default CommentsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primaryWhite,
	},
	card: {
		width: windowWidth - 10,
		flexDirection: 'row',
		alignItems: 'flex-start',
		maxWidth: 390,
		minHeight: 80,
		marginTop: 10,
		padding: 5,
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
		flexDirection: 'row',
		alignItems: 'center',
	},

	profileTitleMain: {
		fontWeight: '500',
		color: colors.primaryColor,
		fontSize: 20,
	},
	commentContainer: {
		flexGrow: 1,
		marginLeft: 6,
		backgroundColor: colors.secondaryWhite,
		borderRadius: 10,
		elevation: 3,
		paddingHorizontal: 10,
	},

	commentBodyText: {
		fontSize: 18,
		padding: 2,
		marginTop: 5,
		marginBottom: 5,
		color: colors.secondaryColor,
	},

	commentImage: {
		width: 250,
		aspectRatio: 1,
		alignSelf: 'center',
		borderRadius: 10,
		marginTop: 5,
		marginBottom: 10,
		backgroundColor: '#0553',
		borderColor: 'lightgray',
		borderWidth: 3,
	},
	commentBoxView: {
		marginHorizontal: 15,
		marginBottom: 15,
	},
	commentBox: {
		backgroundColor: colors.secondaryWhite,
		height: 40,
		fontSize: 18,
		padding: 10,
		borderRadius: 10,
	},
	selectedImageStyle: {
		width: 100,
		margin: 5,
		aspectRatio: 1,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	error: {
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 90,
	},
});
