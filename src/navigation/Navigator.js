import React, { useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import UUser from '../system/UUser';
import UServiceBase from '../system/api';
const _ = require("lodash");
import moment from "moment";

import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_FETCH_TASK = 'background-fetch';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export const Navigation = observer(() => {

    const notificationListener = useRef();
    const responseListener = useRef();

    async function registerBackgroundFetchAsync() {
        return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
            minimumInterval: 60 * 1, // 8 hours
            stopOnTerminate: false, // android only,
            startOnBoot: true, // android only
        });
    };



    sendPushNotification = async (title, releaseDate) => {
        const message = {
            to: UUser.tokenPushNotification,
            sound: 'default',
            title: 'New Film',
            body: `Upcoming movies: ${title} will release in ${releaseDate}. Watch trailer! `,
            data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }

    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
        UUser._movieIDNotification = await UUser.getUser('movieIDNotification', null);
        const now = Date.now();
        const hours = new Date(now).getHours();
        if (hours > 7 && hours < 18) {
            UServiceBase.getMovieList({
                page: 1,
                cb: (err, res) => {
                    if (!err) {
                        const result = res?.data?.results;
                        const moviesList = _.sortBy(result, function (o) { return new moment(o.release_date); }).reverse();
                        const title = moviesList[0]?.title;
                        const release_date = moviesList[0]?.release_date;
                        const dateCompare = moment().diff(release_date, 'days');

                        if (dateCompare <= 0 && (UUser.movieIDNotification !== moviesList[0]?.id) && (moviesList[0]?.id !== UUser.firstMovieID)) {
                            UUser.movieIDNotification = moviesList[0]?.id;
                            sendPushNotification(title, release_date)
                        }

                    } else {
                        toast('error push notification!');
                    }
                }
            });
        }

    });



    useEffect(() => {

        checkStatusAsync();

        registerForPushNotificationsAsync().then(token => {
            UUser.tokenPushNotification = token;
        });

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);




    const checkStatusAsync = async () => {
        await registerBackgroundFetchAsync();
    };



    return (
        <NavigationContainer>
            <MoviesNavigator />
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
        <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
            <Stack.Screen name={'Movies'} component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name={'MoviesDetail'} component={MoviesDetail} options={{ headerShown: false }} />
            <Stack.Group>
                <Stack.Screen name={'Teaser'} component={Teaser} options={{ headerShown: false, presentation: 'transparentModal' }} />
            </Stack.Group>
            <Stack.Screen name={'Login'} component={Login} options={{ headerShown: false }} />
            <Stack.Screen name={'Register'} component={Register} options={{ headerShown: false }} />
            <Stack.Screen name={'Logout'} component={Logout} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}


const BottomTab = createBottomTabNavigator();
/**
 *
 * @constructor
 */
const BottomTabNavigator = observer((navigation) => {

    const logout = async () => {

        // navigation.navigation.navigate('Movies');
        mobxUser.logOut();
        await AsyncStorage.removeItem('user_ID');

    };

    return (
        <BottomTab.Navigator initialRouteName='Home' screenOptions={{ tabBarActiveTintColor: UColor.colorBottomNavigator }}>
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
                component={mobxUser.uID ? FavoriteFilm : Login}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Favorite Film',
                    tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />
                }}
            />
            {mobxUser.uID ? (
                <BottomTab.Screen
                    name={'Account'}
                    component={Logout}
                    options={{
                        tabBarLabel: 'Account',
                        tabBarIcon: ({ color }) => <TabBarIcon name="people" color={color} />,
                        headerRight: () => {
                            return <TouchableOpacity onPress={logout} style={{ width: 100, height: 44, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20 }}>
                                <TabBarIcon name="power-sharp" color={UColor.favoriteColor} />
                            </TouchableOpacity>
                        }
                    }}
                />
            ) : (
                null
            )
            }

        </BottomTab.Navigator>
    );
})

/**
 *
 * @param name
 * @param color
 * @constructor
 */
const TabBarIcon = ({ name = '', color }) => {
    return <Ionicons name={name} color={color} size={26} style={{ marginBottom: -3 }} />
};


const registerForPushNotificationsAsync = async () => {

    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: 'red',
        });
    }

    return token;
}