import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ProfileScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 25 }}>
				Profile Screen and profile picture uploading is under development.
				server side is complete. you can test with Postman.
				{`
				
				`}
				route:
				"https://edtechapi-c72z.onrender.com/api/posts/create-profile-picture-post".
				{`
				
				`}
				formData accepts "postBody" and "profile-picture" field
			</Text>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
