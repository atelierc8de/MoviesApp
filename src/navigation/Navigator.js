import React from 'react';
import {TouchableOpacity} from 'react-native';
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
import { mobxUser } from '../mobx/mobxUser';
import { observer } from "mobx-react";
import UColor from "../system/UColor";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Navigation = observer(() => {
    return (
        <NavigationContainer>
            {!mobxUser.uID ? <UserNavigator/>:<MoviesNavigator/>}
        </NavigationContainer>
    );
});

const Stack = createNativeStackNavigator();
/**
 *
 * @constructor
 */
function MoviesNavigator() {
    return (
        <Stack.Navigator screenOptions={{gestureEnabled: false}}>
            <Stack.Screen name={'Movies'} component={BottomTabNavigator} options={{headerShown: false}}/>
            <Stack.Screen name={'MoviesDetail'} component={MoviesDetail} options={{headerShown: false}}/>
            <Stack.Group>
                <Stack.Screen name={'Teaser'} component={Teaser} options={{ headerShown: false, presentation: 'transparentModal' }} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

/**
 *
 * @constructor
 */
function UserNavigator() {
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

    const logout = async () => {
        mobxUser.uID = '';
        await AsyncStorage.removeItem('user_ID');
    };

    return (
        <BottomTab.Navigator initialRouteName='Home' screenOptions={{tabBarActiveTintColor: UColor.colorBottomNavigator}}>
            <BottomTab.Screen
                name={'Home'}
                component={MoviesList}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
                }}
            />
            <BottomTab.Screen
                name={'MoviesFavorite'}
                component={FavoriteFilm}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Favorite Film',
                    tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />
                }}
            />
            <BottomTab.Screen
                name={'Account'}
                component={Logout}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({color}) => <TabBarIcon name="people" color={color}/>,
                    headerRight: () => {
                        return <TouchableOpacity onPress={logout} style={{width:100, height:44, alignItems:'flex-end', justifyContent:'center', paddingRight:20}}>
                            <TabBarIcon name="power-sharp" color={UColor.favoriteColor}/>
                        </TouchableOpacity>
                    }
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
const TabBarIcon = ({ name = '', color }) => {
    return <Ionicons name={name} color={color} size={26} style={{ marginBottom: -3 }} />
};
