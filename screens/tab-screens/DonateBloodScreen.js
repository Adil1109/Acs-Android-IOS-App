import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const BloodDonateScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 25 }}>
				Blood Donate Screen is under development!
			</Text>
		</View>
	);
};

export default BloodDonateScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
