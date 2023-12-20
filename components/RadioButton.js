import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../constants/colors';

const RadioButton = ({ fieldName, data, onSelect }) => {
	const [selected, setSelected] = useState(null);
	return (
		<View style={styles.field}>
			<Text style={styles.text}>{fieldName + ':'}</Text>
			{data.map((item) => {
				return (
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.btnField}
						onPress={() => {
							setSelected(item);
							onSelect(item);
						}}
						key={item}>
						<MaterialCommunityIcons
							style={{ marginLeft: 6 }}
							name={
								selected === item
									? 'checkbox-marked-circle'
									: 'checkbox-blank-circle-outline'
							}
							size={28}
							color={colors.primaryColor}
						/>
						<Text style={styles.btnText}> {item}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default RadioButton;

const styles = StyleSheet.create({
	field: {
		flexDirection: 'row',
		width: 360,
		justifyContent: 'space-between',
		margin: 5,
	},
	text: {
		fontSize: 20,
	},
	btnText: {
		fontSize: 18,
		marginRight: 2,
	},
	btnField: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
