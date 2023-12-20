import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import colors from '../../constants/colors';
import MenuCard from '../../components/MenuCard';
import secureStorage from '../../secureStorage';
import AuthContext from '../../context/AuthContext';

const MenuScreen = ({ navigation }) => {
	const authContext = useContext(AuthContext);

	const handleLogout = () => {
		authContext.setUser(null);
		secureStorage.removeToken();
	};
	return (
		<View style={styles.container}>
			<Text style={styles.screenTitle}>Menu</Text>
			<MenuCard
				cardText={'Donate Blood'}
				cardIconName={'water-plus'}
				onPressFunction={() => navigation.navigate('BloodDonate')}
			/>
			<MenuCard
				cardText={'Log Out'}
				cardIconName={'logout'}
				onPressFunction={handleLogout}
			/>
		</View>
	);
};

export default MenuScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		backgroundColor: colors.primaryWhite,
		margin: 0,
		marginTop: StatusBar.currentHeight,
	},
	screenTitle: {
		alignSelf: 'flex-start',
		fontSize: 25,
		margin: 20,
		fontWeight: '900',
		color: colors.secondaryBlack,
	},
});
