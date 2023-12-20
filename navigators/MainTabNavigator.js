import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/tab-screens/HomeScreen';
import WatchScreen from '../screens/tab-screens/WatchScreen';
import MenuScreen from '../screens/tab-screens/MenuScreen';
import BooksScreen from '../screens/tab-screens/BooksScreen';
import TutorsScreen from '../screens/tab-screens/TutorsScreen';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: colors.primaryWhite,
					height: 60,
					position: 'absolute',
					right: 16,
					left: 16,
					bottom: 16,
					borderRadius: 10,
					elevation: 5,
				},
			}}>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<MaterialCommunityIcons
							name='home'
							size={focused ? 35 : 30}
							color={focused ? colors.primaryColor : 'gray'}
						/>
					),
				}}
				name='Home'
				component={HomeScreen}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<MaterialCommunityIcons
							name='human-greeting-variant'
							size={focused ? 35 : 30}
							color={focused ? colors.primaryColor : 'gray'}
						/>
					),
				}}
				name='Tutors'
				component={TutorsScreen}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<MaterialCommunityIcons
							name='motion-play-outline'
							size={focused ? 35 : 30}
							color={focused ? colors.primaryColor : 'gray'}
						/>
					),
				}}
				name='Watch'
				component={WatchScreen}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<MaterialCommunityIcons
							name='book-open-variant'
							size={focused ? 35 : 30}
							color={focused ? colors.primaryColor : 'gray'}
						/>
					),
				}}
				name='Books'
				component={BooksScreen}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<MaterialCommunityIcons
							name='menu'
							size={focused ? 35 : 30}
							color={focused ? colors.primaryColor : 'gray'}
						/>
					),
				}}
				name='Menu'
				component={MenuScreen}
			/>
		</Tab.Navigator>
	);
}

export default MainTabNavigator;
