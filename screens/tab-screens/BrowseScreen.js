import React, { useState, useEffect, useRef } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	ActivityIndicator,
	BackHandler,
	Platform,
} from 'react-native';

import { WebView } from 'react-native-webview';
import colors from '../../constants/colors';

const ActivityIndicatorElement = () => {
	return (
		<View style={styles.activityIndicatorStyle}>
			<ActivityIndicator color={colors.primaryColor} size='large' />
		</View>
	);
};

const BrowseScreen = ({ route, navigation }) => {
	const { link } = route.params;
	const [visible, setVisible] = useState(false);

	//

	const webViewRef = useRef(null);
	const onAndroidBackPress = () => {
		if (webViewRef.current) {
			webViewRef.current.goBack();
			return true;
		}
		return false;
	};

	useEffect(() => {
		if (Platform.OS === 'android') {
			BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
			return () => {
				BackHandler.removeEventListener(
					'hardwareBackPress',
					onAndroidBackPress
				);
			};
		}
	}, []);

	//
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<WebView
					ref={webViewRef}
					style={{ flex: 1 }}
					//Loading URL
					source={{ uri: link }}
					//Enable Javascript support
					javaScriptEnabled={true}
					//For the Cache
					domStorageEnabled={true}
					onLoadStart={() => setVisible(true)}
					onLoad={() => setVisible(false)}
					setSupportMultipleWindows={false}
					javaScriptCanOpenWindowsAutomatically={true}
					allowsFullscreenVideo={true}
					allowFileAccess={true}
					allowFileAccessFromFileURLs={true}
					allowUniversalAccessFromFileURLs={true}
				/>
				{visible ? <ActivityIndicatorElement /> : null}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
	},
	activityIndicatorStyle: {
		flex: 1,
		position: 'absolute',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 'auto',
		marginBottom: 'auto',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		justifyContent: 'center',
	},
});

export default BrowseScreen;
