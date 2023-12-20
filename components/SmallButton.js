import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const SmallButton = ({ btnTitle, onPressFunction }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={styles.btn}
			onPress={onPressFunction}>
			<Text style={styles.btnTxt}>{btnTitle}</Text>
		</TouchableOpacity>
	);
};

export default SmallButton;

const styles = StyleSheet.create({
	btn: {
		backgroundColor: colors.primaryColor,
		width: 65,
		height: 40,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		zIndex: 2,
		right: 10,
		top: 3,
	},
	btnTxt: {
		color: colors.secondaryWhite,
		fontWeight: 'bold',
		fontSize: 18,
	},
});
