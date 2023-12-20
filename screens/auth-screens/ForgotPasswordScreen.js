import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import colors from '../../constants/colors';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';

function ForgotPasswordScreen({ navigation }) {
	const [email, setEmail] = useState('');
	const [btnDisable, setBtnDisable] = useState(false);
	const [showIndicator, setShowIndicator] = useState(false);

	const handleSubmit = async () => {
		setBtnDisable(true);
		setShowIndicator(true);
		try {
			const resp = await axios.patch(
				`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/send-forgot-password-code`,
				{
					email,
				}
			);

			console.log(resp.data);

			if (resp.data.success) {
				setBtnDisable(false);
				setShowIndicator(false);
				navigation.navigate('SubmitCode', {
					email,
				});
			}

			console.log(resp.data.message);
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

					<CustomButton
						onPressFunction={handleSubmit}
						btnDisable={btnDisable}
						showIndicator={showIndicator}
						btnTitle={'Request Code'}
						btnType={'primary'}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default ForgotPasswordScreen;

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
