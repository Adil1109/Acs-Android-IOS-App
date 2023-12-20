import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import colors from '../../constants/colors';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import AuthContext from '../../context/AuthContext';
import secureStorage from '../../secureStorage';

function SigninScreen({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [hidden, setHidden] = useState(true);
	const [btnDisable, setBtnDisable] = useState(false);
	const [showIndicator, setShowIndicator] = useState(false);

	const authContext = useContext(AuthContext);

	const handleSubmit = async () => {
		setBtnDisable(true);
		setShowIndicator(true);
		try {
			const resp = await axios.post(
				`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/signin`,
				{
					email,
					password,
				}
			);
			setBtnDisable(false);
			setShowIndicator(false);
			const decodedUser = jwtDecode(resp.data.token);

			authContext.setToken(resp.data.token);
			authContext.setUser(decodedUser);

			secureStorage.setToken(resp.data.token);
			console.log(resp.data);
		} catch (error) {
			setBtnDisable(false);
			setShowIndicator(false);
			console.log(error.response.data);
		}
	};

	return (
		<View style={styles.view}>
			<KeyboardAvoidingView style={styles.view}>
				<Logo />
				<View style={styles.formView}>
					<Input
						leftIconName={'email'}
						placeholderText={'Email'}
						inputValue={email}
						onChangeFunction={(text) => setEmail(text)}
					/>

					<Input
						leftIconName={'lock'}
						rightIconName={hidden ? 'eye' : 'eye-off'}
						placeholderText={'Password'}
						inputValue={password}
						onChangeFunction={(text) => setPassword(text)}
						hidden={hidden}
						setHidden={setHidden}
					/>
					<Text
						onPress={() => navigation.navigate('ForgotPassword')}
						style={styles.forgotPasswordTxt}>
						Forgot password?
					</Text>

					<CustomButton
						onPressFunction={handleSubmit}
						btnDisable={btnDisable}
						showIndicator={showIndicator}
						btnTitle={'Login'}
						btnType={'primary'}
					/>
					<CustomButton
						onPressFunction={() => navigation.navigate('InitialSignup')}
						btnTitle={'Create an ACS account'}
						btnType={'secondary'}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default SigninScreen;

const styles = StyleSheet.create({
	view: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.primaryWhite,
	},
	formView: {
		marginTop: 20,
	},

	forgotPasswordTxt: {
		alignSelf: 'flex-end',
		margin: 2,
		fontSize: 16,
		color: colors.primaryColor,
	},
});
