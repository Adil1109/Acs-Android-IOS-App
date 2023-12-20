import React, { useState, useContext, useEffect } from 'react';
import {
	ScrollView,
	TextInput,
	Image,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import colors from '../../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import AuthContext from '../../context/AuthContext';
import SmallButton from '../../components/SmallButton';

const windowWidth = Dimensions.get('window').width;

function CreatePostScreen({ navigation }) {
	const [uploadProgress, setUploadProgress] = useState(0);
	const [selectedImage, setSelectedImage] = useState(null);
	const [postBody, setPostBody] = useState('');

	const authContext = useContext(AuthContext);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<SmallButton btnTitle={'Post'} onPressFunction={uploadPost} />
			),
		});
	}, [navigation, selectedImage, postBody]);

	const pickImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1.91, 1],
				quality: 1,
			});

			if (!result.canceled) {
				setSelectedImage(result.assets[0].uri);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const uploadPost = async () => {
		try {
			const formData = new FormData();

			if (postBody) {
				formData.append('postBody', postBody);
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

				formData.append('post-picture', {
					uri: selectedImage,
					name: filename,
					type: `image/${fileExtension}`,
				});
			}

			const url = `${process.env.EXPO_PUBLIC_BASE_URL}/api/posts/create-post`;
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
			navigation.goBack();
			console.log(response.data);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<ScrollView style={styles.container}>
			<TextInput
				style={[styles.postInput, { height: !selectedImage ? 200 : 100 }]}
				placeholder="What's on your mind?"
				multiline={true}
				onChangeText={(text) => setPostBody(text)}
				value={postBody}
			/>

			{selectedImage && (
				<Image
					source={{ uri: selectedImage }}
					style={styles.selectedImageStyle}
				/>
			)}

			<View style={styles.btnContainer}>
				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.btn}
					onPress={pickImage}>
					<MaterialIcons name='image' color={colors.primaryColor} size={40} />
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
		backgroundColor: colors.primaryWhite,
	},

	postInput: {
		marginVertical: 10,
		textAlignVertical: 'top',
		fontSize: 20,
		padding: 10,
	},
	btnContainer: {
		alignItems: 'flex-end',
		marginRight: 5,
	},
	btn: {
		marginRight: 6,
	},
	selectedImageStyle: {
		width: windowWidth - 20,
		maxWidth: 390,
		aspectRatio: 1,
	},
});

export default CreatePostScreen;
