/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => {
	return (
		<Image source={require('../own-assets/logo.jpg')} style={styles.image} />
	);
};

export default Logo;

const styles = StyleSheet.create({
	image: {
		height: 128,
		width: 128,
	},
});
