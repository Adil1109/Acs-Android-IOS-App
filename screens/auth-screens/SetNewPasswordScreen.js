import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import colors from '../../constants/colors';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';

function SetNewPasswordScreen({ route, navigation }) {
	const email = route.params?.email;
	const providedCode = route.params?.providedCode;

	const [password, setPassword] = useState('');
	const [hidden, setHidden] = useState(true);
	const [btnDisable, setBtnDisable] = useState(false);
	const [showIndicator, setShowIndicator] = useState(false);

	const handleSubmit = async () => {
		setBtnDisable(true);
		setShowIndicator(true);
		try {
			const resp = await axios.patch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/verify-forgot-password-code`,
				{
					email,
					providedCode,
					newPassword: password,
				}
			);
			setBtnDisable(false);
			setShowIndicator(false);
			if (resp.data.success) {
				navigation.reset({
					index: 0,
					routes: [{ name: 'Signin' }],
				});
			}

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
						leftIconName={'lock'}
						rightIconName={hidden ? 'eye' : 'eye-off'}
						placeholderText={'Enter a new Password'}
						inputValue={password}
						onChangeFunction={(text) => setPassword(text)}
						hidden={hidden}
						setHidden={setHidden}
						autoFocus
					/>

					<CustomButton
						onPressFunction={handleSubmit}
						btnDisable={btnDisable}
						showIndicator={showIndicator}
						btnTitle={'Update Password'}
						btnType={'primary'}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default SetNewPasswordScreen;

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
});
