import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';

import DatePicker from '@react-native-community/datetimepicker';

import RadioButton from '../../components/RadioButton';
import Input from '../../components/Input';
import Logo from '../../components/Logo';
import CustomButton from '../../components/CustomButton';

function InitialSignupScreen({ navigation }) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const [birthday, setBirthday] = useState(new Date('2023-01-01'));
	const [open, setOpen] = useState(false);
	const [showBirthday, setShowBirthday] = useState(false);

	const [option, setOption] = useState(null);

	const declareDate = ({ type }, selectedDate) => {
		if (type == 'set') {
			setOpen(false);
			setShowBirthday(true);
			setBirthday(selectedDate);
		} else {
			setOpen(false);
			setShowBirthday(false);
		}
	};

	const handleSubmit = () => {
		navigation.navigate('Signup', {
			firstName,
			lastName,
			birthday: birthday.toLocaleDateString(),
			gender: option,
		});
	};

	return (
		<View style={styles.view}>
			<KeyboardAvoidingView style={styles.view}>
				<Logo />

				<View style={styles.formView}>
					<Input
						leftIconName={'account-circle'}
						placeholderText={'First Name'}
						inputValue={firstName}
						onChangeFunction={(text) => setFirstName(text)}
					/>
					<Input
						leftIconName={'account-circle'}
						placeholderText={'Last Name'}
						inputValue={lastName}
						onChangeFunction={(text) => setLastName(text)}
					/>
					<TouchableOpacity activeOpacity={0.8} onPress={() => setOpen(true)}>
						<Input
							leftIconName={'calendar-cursor'}
							placeholderText={'Birthday'}
							inputValue={showBirthday ? birthday.toLocaleDateString() : null}
							editable={false}
						/>
					</TouchableOpacity>

					{open && (
						<DatePicker
							value={birthday}
							mode='date'
							display='spinner'
							minimumDate={new Date('1923-01-01')}
							maximumDate={new Date(`${new Date().getFullYear() - 7}-01-15`)}
							onChange={declareDate}
						/>
					)}

					<RadioButton
						fieldName='Gender'
						data={['Male', 'Female', 'Custom']}
						onSelect={(value) => setOption(value)}
					/>

					<CustomButton
						onPressFunction={handleSubmit}
						btnTitle={'Next'}
						btnType={'primary'}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default InitialSignupScreen;

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
