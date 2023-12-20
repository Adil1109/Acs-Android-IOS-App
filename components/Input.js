import { StyleSheet, View, TextInput, Dimensions } from 'react-native';
import React, { useState } from 'react';
import colors from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

const Input = ({
	placeholderText,
	leftIconName,
	rightIconName,
	inputValue,
	onChangeFunction,
	hidden,
	setHidden,
	inputHeight,
	...props
}) => {
	const [focusedColor, setFocusedColor] = useState('gray');

	return (
		<View style={[styles.field, { borderColor: focusedColor }]}>
			<MaterialCommunityIcons
				name={leftIconName}
				size={28}
				color={focusedColor}
			/>
			<TextInput
				placeholder={placeholderText}
				onFocus={() => setFocusedColor(colors.primaryColor)}
				onBlur={() => setFocusedColor('gray')}
				value={inputValue}
				onChangeText={onChangeFunction}
				style={[styles.textBox, { height: inputHeight ? inputHeight : 50 }]}
				secureTextEntry={hidden}
				{...props}
			/>
			{rightIconName ? (
				hidden ? (
					<MaterialCommunityIcons
						onPress={() => setHidden(false)}
						name={rightIconName}
						size={28}
						color={focusedColor}
					/>
				) : (
					<MaterialCommunityIcons
						onPress={() => setHidden(true)}
						name={rightIconName}
						size={28}
						color={focusedColor}
					/>
				)
			) : null}
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	field: {
		width: windowWidth - 20,
		maxWidth: 390,
		flexDirection: 'row',
		alignItems: 'center',
		margin: 5,
		paddingHorizontal: 5,
		backgroundColor: colors.secondaryWhite,
		borderWidth: 0,
		borderBottomWidth: 2,
		borderRadius: 5,
	},
	textBox: {
		flex: 1,
		fontSize: 20,
		borderWidth: 0,
		alignContent: 'center',
		color: 'black',
		paddingLeft: 5,
	},
});
