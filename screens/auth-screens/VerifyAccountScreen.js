import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import colors from '../../constants/colors';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';

function VerifyAccountScreen({ route, navigation }) {
	const email = route.params?.email;

	const [providedCode, setProvidedCode] = useState('');
	const [btnDisable, setBtnDisable] = useState(false);
	const [showIndicator, setShowIndicator] = useState(false);

	const sendVerificationEmail = async () => {
		try {
			const resp = await axios.patch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/send-verification-code`,
				{
					email,
				}
			);

			console.log(resp.data.message);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	useEffect(() => {
		sendVerificationEmail();
	}, []);

	const handleSubmit = async () => {
		setBtnDisable(true);
		setShowIndicator(true);
		try {
			const resp = await axios.patch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/verify-verification-code`,
				{
					email,
					providedCode,
				}
			);
			setBtnDisable(false);
			setShowIndicator(false);

			console.log(resp.data);
			if (resp.data.success) {
				navigation.reset({
					index: 0,
					routes: [{ name: 'Signin' }],
				});
			}
		} catch (error) {
			setBtnDisable(false);
			setShowIndicator(false);
			console.log(error.response);
		}
	};

	return (
		<View style={styles.view}>
			<KeyboardAvoidingView style={styles.view}>
				<Logo />
				<View style={styles.formView}>
					<Input
						leftIconName={'message-text-lock'}
						placeholderText={'Enter Code'}
						inputValue={providedCode}
						onChangeFunction={(text) => setProvidedCode(text)}
						autoFocus
						keyboardType='numeric'
					/>

					<CustomButton
						onPressFunction={handleSubmit}
						btnDisable={btnDisable}
						showIndicator={showIndicator}
						btnTitle={'Verify Account'}
						btnType={'primary'}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default VerifyAccountScreen;

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
