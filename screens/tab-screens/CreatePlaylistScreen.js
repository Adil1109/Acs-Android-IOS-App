import React, { useContext, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import colors from '../../constants/colors';

import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

function CreatePlaylistScreen({ navigation }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [thumbnailLink, setThumbnailLink] = useState('');
	const [playlistLink, setPlaylistLink] = useState('');
	const [btnDisable, setBtnDisable] = useState(false);
	const [showIndicator, setShowIndicator] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);

	const authContext = useContext(AuthContext);

	const handleSubmit = async () => {
		setBtnDisable(true);
		setShowIndicator(true);
		try {
			const url = `${process.env.EXPO_PUBLIC_BASE_URL}/api/playlists/create-playlist`;
			const headers = {
				authorization: `Bearer ${authContext.token}`,
				client: 'MOBILE',
			};

			const resp = await axios.post(
				url,
				{ title, description, thumbnailLink, playlistLink },
				{
					headers,
					onUploadProgress: (progressEvent) => {
						const progress = Math.round(
							(progressEvent.loaded / progressEvent.total) * 100
						);
						setUploadProgress(progress);
					},
				}
			);

			setBtnDisable(false);
			setShowIndicator(false);

			console.log(resp.data);
		} catch (error) {
			setBtnDisable(false);
			setShowIndicator(false);
			console.log(error.response.data);
		}
	};

	return (
		<KeyboardAvoidingView style={styles.view}>
			<View style={styles.formView}>
				<Input
					leftIconName={'label-variant'}
					placeholderText={'Title'}
					inputValue={title}
					onChangeFunction={(text) => setTitle(text)}
					multiline={true}
				/>
				<Input
					leftIconName={'card-text'}
					placeholderText={'Description'}
					inputValue={description}
					onChangeFunction={(text) => setDescription(text)}
					multiline={true}
					inputHeight={100}
				/>
				<Input
					leftIconName={'folder-image'}
					placeholderText={'Thumbnail link'}
					inputValue={thumbnailLink}
					onChangeFunction={(text) => setThumbnailLink(text)}
				/>
				<Input
					leftIconName={'link-plus'}
					placeholderText={'Playlist link'}
					inputValue={playlistLink}
					onChangeFunction={(text) => setPlaylistLink(text)}
				/>

				<CustomButton
					onPressFunction={handleSubmit}
					btnDisable={btnDisable}
					showIndicator={showIndicator}
					btnTitle={'Create'}
					btnType={'primary'}
				/>
			</View>
		</KeyboardAvoidingView>
	);
}

export default CreatePlaylistScreen;

const styles = StyleSheet.create({
	view: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.primaryWhite,
	},
	formView: {
		marginTop: 20,
	},
});
