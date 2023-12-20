import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import colors from '../constants/colors';

const windowWidth = Dimensions.get('window').width;

const MenuCard = ({ cardText, cardIconName, onPressFunction }) => {
	return (
		<TouchableOpacity
			onPress={onPressFunction}
			style={styles.menuCardContainer}
			activeOpacity={0.9}>
			<View style={styles.menuCard}>
				<MaterialCommunityIcons
					name={`${cardIconName}`}
					size={30}
					color='black'
				/>
				<Text style={styles.cardTxt}>{cardText}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default MenuCard;

const styles = StyleSheet.create({
	menuCardContainer: {
		width: windowWidth - 20,
		maxWidth: 390,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		margin: 5,
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: colors.secondaryWhite,
		borderWidth: 0,
		borderRadius: 5,
		elevation: 5,
	},
	menuCard: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
	},
	cardTxt: {
		fontSize: 20,
		fontWeight: '500',
		marginLeft: 5,
		color: '#0f0f0f',
	},
});
