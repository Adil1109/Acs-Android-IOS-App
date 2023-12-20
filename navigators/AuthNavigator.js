import React from 'react';
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';
import SignupScreen from '../screens/auth-screens/SignupScreen';
import SigninScreen from '../screens/auth-screens/SigninScreen';
import colors from '../constants/colors';
import InitialSignupScreen from '../screens/auth-screens/InitialSignupScreen';
import ForgotPasswordScreen from '../screens/auth-screens/ForgotPasswordScreen';
import VerifyAccountScreen from '../screens/auth-screens/VerifyAccountScreen';
import SubmitCodeScreen from '../screens/auth-screens/SubmitCodeScreen';
import SetNewPasswordScreen from '../screens/auth-screens/SetNewPasswordScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTintColor: colors.primaryWhite,
				headerStyle: { backgroundColor: colors.primaryColor },
				gestureEnabled: true,
				gestureDirection: 'horizontal',
				...TransitionPresets.SlideFromRightIOS,
			}}>
			<Stack.Screen name='Signin' component={SigninScreen} />
			<Stack.Screen
				name='InitialSignup'
				options={{
					headerTitle: 'Your Details',
				}}
				component={InitialSignupScreen}
			/>
			<Stack.Screen name='Signup' component={SignupScreen} />
			<Stack.Screen
				name='VerifyAccount'
				options={{ headerTitle: 'Verify Account' }}
				component={VerifyAccountScreen}
			/>
			<Stack.Screen
				name='ForgotPassword'
				options={{ headerTitle: 'Forgot Password' }}
				component={ForgotPasswordScreen}
			/>
			<Stack.Screen
				name='SubmitCode'
				options={{ headerTitle: 'Submit Code' }}
				component={SubmitCodeScreen}
			/>
			<Stack.Screen
				name='SetNewPassword'
				options={{ headerTitle: 'Set New Password' }}
				component={SetNewPasswordScreen}
			/>
		</Stack.Navigator>
	);
};

export default AuthNavigator;
