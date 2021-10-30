import React, {useContext, useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoviesList from "../screens/movies/MoviesList";
import Ionicons from '@expo/vector-icons/Ionicons';
import Login from "../screens/account/Login";
import MoviesDetail from "../screens/movies/MoviesDetail";
import Teaser from "../screens/movies/Teaser";
import FavoriteFilm from "../screens/movies/FavoriteFilm";
import Register from "../screens/account/Register";
import Logout from "../screens/account/Logout";
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import {firebase} from "../../firebaseConfig";

const auth = firebase.auth();

export default function Navigation() {

    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
            try {
                await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
                setIsLoading(false);
            } catch (e) {
            }
        });

        return unsubscribeAuth;
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <MoviesNavigator/> : <UserNavigator/>}
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator();
/**
 *
 * @constructor
 */
export function MoviesNavigator() {
    return (
        <Stack.Navigator screenOptions={{gestureEnabled: false}}>
            <Stack.Screen name={'Movies'} component={BottomTabNavigator} options={{headerShown: false}}/>
            <Stack.Screen name={'MoviesDetail'} component={MoviesDetail} options={{headerShown: false}}/>
            <Stack.Group>
                <Stack.Screen name={'Teaser'} component={Teaser} options={{headerShown: false, presentation: 'transparentModal'}}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}

/**
 *
 * @constructor
 */
export function UserNavigator() {
    return (
        <Stack.Navigator screenOptions={{gestureEnabled: false}}>
            <Stack.Screen name={'Login'} component={Login} options={{headerShown: false}}/>
            <Stack.Screen name={'Register'} component={Register} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator();
/**
 *
 * @constructor
 */
function BottomTabNavigator() {
    return (
        <BottomTab.Navigator initialRouteName='Home' screenOptions={{}}>
            <BottomTab.Screen
                name={'Home'}
                component={MoviesList}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color}) => <TabBarIcon name="home" color={color}/>
                }}
            />
            <BottomTab.Screen
                name={'MoviesFavorite'}
                component={FavoriteFilm}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Favorite Film',
                    tabBarIcon: ({color}) => <TabBarIcon name="logo-closed-captioning" color={color}/>
                }}
            />
            <BottomTab.Screen
                name={'Logout'}
                component={Logout}
                options={{
                    // headerShown: false,
                    tabBarLabel: 'Account',
                    tabBarIcon: ({color}) => <TabBarIcon name="people" color={color}/>
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 *
 * @param name
 * @param color
 * @constructor
 */
const TabBarIcon = ({name = '', color}) => {
    return <Ionicons name={name} color={color} size={26} style={{marginBottom: -3}}/>
};
