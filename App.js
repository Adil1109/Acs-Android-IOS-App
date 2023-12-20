import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import secureStorage from './secureStorage';
import jwtDecode from 'jwt-decode';

import { LogBox } from 'react-native';

import AuthNavigator from './navigators/AuthNavigator';
import AuthContext from './context/AuthContext';
import HomeStackNavigator from './navigators/HomeStackNavigator';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [user, setUser] = useState();
	const [token, setToken] = useState();

	const [appIsReady, setAppIsReady] = useState(false);

	const restoreToken = async () => {
		const token = await secureStorage.getToken();
		if (!token) return;
		setToken(token);
		setUser(jwtDecode(token));
	};

	useEffect(() => {
		async function prepare() {
			try {
				restoreToken();
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<AuthContext.Provider value={{ user, setUser, token, setToken }}>
				<NavigationContainer>
					<StatusBar style='auto' />
					{user ? <HomeStackNavigator /> : <AuthNavigator />}
				</NavigationContainer>
			</AuthContext.Provider>
		</View>
	);
}

LogBox.ignoreLogs(['new NativeEventEmitter']);
