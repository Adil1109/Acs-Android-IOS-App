import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';
import * as ScreenCapture from 'expo-screen-capture';
import { useIsFocused } from '@react-navigation/native';

export default ViewBookScreen = ({ route, navigation }) => {
	const isFocused = useIsFocused();

	const activate = async () => {
		await ScreenCapture.preventScreenCaptureAsync();
	};

	const deactivate = async () => {
		await ScreenCapture.allowScreenCaptureAsync();
	};

	if (isFocused) {
		activate();
	} else {
		deactivate();
	}
	return (
		<View style={styles.container}>
			<Pdf
				source={{
					uri: route.params.bookLink,
					cache: true,
				}}
				trustAllCerts={false}
				onLoadComplete={(numberOfPages, filePath) => {
					// console.log(`Number of pages: ${numberOfPages}`);
				}}
				onPageChanged={(page, numberOfPages) => {
					// console.log(`Current page: ${page}`);
				}}
				onError={(error) => {
					console.log(error);
				}}
				onPressLink={(uri) => {
					navigation.navigate('Browse', {
						link: uri,
					});
				}}
				style={styles.pdf}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 25,
	},
	pdf: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
});
