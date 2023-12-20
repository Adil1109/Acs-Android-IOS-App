import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../constants/colors';
import Input from '../../components/Input';

const SearchFormScreen = ({ navigation }) => {
	const [term, setTerm] = useState('');
	return (
		<View style={styles.container}>
			<View>
				<Input
					placeholderText={'Search'}
					minLength={3}
					inputValue={term}
					autoFocus={true}
					onChangeFunction={(text) => setTerm(text)}
				/>
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => navigation.navigate('SearchResults', { term })}
					style={styles.btnContainer}>
					<AntDesign
						name='search1'
						style={styles.search}
						size={30}
						color='white'
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default SearchFormScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.primaryWhite,
	},

	btnContainer: {
		height: 60,
		width: 60,
		backgroundColor: colors.primaryColor,
		marginTop: 15,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50,
	},
	btn: {
		textAlign: 'center',
		marginTop: 20,
		fontSize: 20,
		borderWidth: 2,
		elevation: 5,
	},
});
