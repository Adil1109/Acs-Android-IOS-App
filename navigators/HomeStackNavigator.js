import { createStackNavigator } from '@react-navigation/stack';
import SearchFormScreen from '../screens/tab-screens/SearchFormScreen';
import MainTabNavigator from './MainTabNavigator';
import CreatePostScreen from '../screens/tab-screens/CreatePostScreen';
import CommentsScreen from '../screens/tab-screens/CommentsScreen';
import SmallButton from '../components/SmallButton';
import SearchResultsScreen from '../screens/tab-screens/SearchResultsScreen';
import CreatePlaylistScreen from '../screens/tab-screens/CreatePlaylistScreen';
import PlaylistsScreen from '../screens/tab-screens/PlaylistsScreen';
import VideoPlayScreen from '../screens/tab-screens/VideoPlayScreen';
import CreateBookScreen from '../screens/tab-screens/CreateBookScreen';
import BrowseScreen from '../screens/tab-screens/BrowseScreen';
import ViewBookScreen from '../screens/tab-screens/ViewBookScreen';
import ProfileScreen from '../screens/tab-screens/ProfileScreen';
import BloodDonateScreen from '../screens/tab-screens/DonateBloodScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='MainTab' component={MainTabNavigator} />
			<Stack.Screen name='SearchForm' component={SearchFormScreen} />
			<Stack.Screen name='SearchResults' component={SearchResultsScreen} />
			<Stack.Screen name='Playlists' component={PlaylistsScreen} />
			<Stack.Screen name='VideoPlay' component={VideoPlayScreen} />
			<Stack.Screen name='Profile' component={ProfileScreen} />
			<Stack.Screen name='BloodDonate' component={BloodDonateScreen} />
			<Stack.Screen
				name='ViewBook'
				component={ViewBookScreen}
				options={{
					presentation: 'modal',
					headerShown: true,
					headerLeft: null,
					headerTitle: 'Read',
					headerTitleAlign: 'center',
					headerStyle: {
						borderBottomWidth: 1,
						borderBottomColor: 'lightgray',
					},
				}}
			/>
			<Stack.Screen
				name='Browse'
				component={BrowseScreen}
				options={{
					presentation: 'modal',
					headerShown: true,
					headerTitle: 'Browse',
					headerTitleAlign: 'center',
					headerStyle: {
						borderBottomWidth: 1,
						borderBottomColor: 'lightgray',
					},
				}}
			/>
			<Stack.Screen
				name='CreateBook'
				component={CreateBookScreen}
				options={{
					presentation: 'modal',
					headerShown: true,
					headerLeft: null,
					headerTitle: 'Create Book',
					headerTitleAlign: 'center',
					headerStyle: {
						borderBottomWidth: 1,
						borderBottomColor: 'lightgray',
					},
				}}
			/>
			<Stack.Screen
				name='CreatePlaylist'
				component={CreatePlaylistScreen}
				options={{
					presentation: 'modal',
					headerShown: true,
					headerLeft: null,
					headerTitle: 'Create Playlist',
					headerTitleAlign: 'center',
					headerStyle: {
						borderBottomWidth: 1,
						borderBottomColor: 'lightgray',
					},
				}}
			/>
			<Stack.Screen
				name='CreatePost'
				component={CreatePostScreen}
				options={{
					presentation: 'modal',
					headerTitle: 'Create Post',
					headerRight: () => <SmallButton btnTitle='Post' />,
					headerShown: true,
					headerStyle: {
						borderBottomWidth: 1,
						borderBottomColor: 'lightgray',
					},
				}}
			/>
			<Stack.Screen
				name='Comments'
				component={CommentsScreen}
				options={{
					presentation: 'modal',
					headerTitleAlign: 'center',
					headerLeft: null,
					headerBackTitle: null,
					headerShown: true,
					headerStyle: {
						borderBottomWidth: 1,
						borderBottomColor: 'lightgray',
					},
				}}
			/>
		</Stack.Navigator>
	);
};

export default HomeStackNavigator;
