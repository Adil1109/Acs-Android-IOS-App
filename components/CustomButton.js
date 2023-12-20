import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ActivityIndicator,
	Dimensions,
} from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const windowWidth = Dimensions.get('window').width;

const CustomButton = ({
	onPressFunction,
	btnDisable,
	showIndicator,
	btnTitle,
	btnType,
}) => {
	return (
		<View style={styles.btnField}>
			<TouchableOpacity
				onPress={onPressFunction}
				disabled={btnDisable}
				activeOpacity={0.9}
				style={btnType === 'primary' ? styles.btn : styles.secondaryBtn}>
				<Text
					style={
						btnType === 'primary' ? styles.btnText : styles.secondaryBtnText
					}>
					{btnTitle}
				</Text>
				{showIndicator ? (
					<ActivityIndicator
						style={{ paddingLeft: 5 }}
						size={25}
						color='white'
					/>
				) : null}
			</TouchableOpacity>
		</View>
	);
};

export default CustomButton;

const styles = StyleSheet.create({
	btnField: {
		width: windowWidth - 20,
		maxWidth: 390,
		flexDirection: 'row',
		margin: 5,
		marginTop: 20,
		elevation: 5,
	},
	btn: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.primaryColor,
		borderRadius: 10,
		padding: 10,
	},
	btnText: {
		alignSelf: 'center',
		color: 'white',
		fontSize: 20,
	},
	secondaryBtn: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.primaryWhite,
		borderWidth: 2,
		borderColor: colors.primaryColor,
		borderRadius: 10,
		padding: 10,
	},
	secondaryBtnText: {
		alignSelf: 'center',
		fontSize: 20,
		color: colors.primaryColor,
	},
});
