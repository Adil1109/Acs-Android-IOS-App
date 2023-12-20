import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import colors from '../../constants/colors';
import axios from 'axios';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';

function SignupScreen({ route, navigation }) {
	const firstName = route.params?.firstName;
	const lastName = route.params?.lastName;
	const birthday = route.params?.birthday;
	const gender = route.params?.gender;

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [hidden, setHidden] = useState(true);
	const [btnDisable, setBtnDisable] = useState(false);
	const [showIndicator, setShowIndicator] = useState(false);

	const handleSubmit = async () => {
		setBtnDisable(true);
		setShowIndicator(true);
		try {
			const resp = await axios.post(
				`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/signup`,
				{
					firstName,
					lastName,
					email,
					password,
					birthday,
					gender,
				}
			);
			setBtnDisable(false);
			setShowIndicator(false);
			console.log(resp.data);
			if (resp.data.success) {
				navigation.navigate('VerifyAccount', {
					email: email,
				});
			}
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

					<CustomButton
						onPressFunction={handleSubmit}
						btnDisable={btnDisable}
						showIndicator={showIndicator}
						btnTitle={'Register'}
						btnType={'primary'}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default SignupScreen;

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
