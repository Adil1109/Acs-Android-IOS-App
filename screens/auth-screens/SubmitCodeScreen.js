import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import colors from '../../constants/colors';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';

function SubmitCodeScreen({ route, navigation }) {
	const email = route.params?.email;

	const [providedCode, setProvidedCode] = useState('');
	const [btnDisable, setBtnDisable] = useState(false);
	const [showIndicator, setShowIndicator] = useState(false);

	const handleSubmit = () => {
		setShowIndicator(true);
		setBtnDisable(true);
		navigation.navigate('SetNewPassword', {
			email,
			providedCode,
		});
		setShowIndicator(false);
		setBtnDisable(false);
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
						btnTitle={'Next'}
						btnType={'primary'}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default SubmitCodeScreen;

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
