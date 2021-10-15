import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoviesList from "../screens/movies/MoviesList";
import Ionicons from '@expo/vector-icons/Ionicons';
import Login from "../screens/account/Login";
import MoviesDetail from "../screens/movies/MoviesDetail";
import Account from "../screens/account/Account";

export default function Navigation(){
    return(
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator();
/**
 *
 * @constructor
 */
function RootNavigator(){
    return(
        <Stack.Navigator>
            <Stack.Screen name={'Login'} component={Login} options={{ headerShown: false }} />
            <Stack.Screen name={'Root'} component={BottomTabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator();
/**
 *
 * @constructor
 */
function BottomTabNavigator(){
    return(
        <BottomTab.Navigator initialRouteName='MoviesList' screenOptions={{}}>
            <BottomTab.Screen
                name={'MoviesList'}
                component={MoviesList}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
                }}
            />
            <BottomTab.Screen
                name={'MoviesDetail'}
                component={MoviesDetail}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="film-sharp" color={color} />
                }}
            />
            <BottomTab.Screen
                name={'Account'}
                component={Account}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="film-sharp" color={color} />
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
const TabBarIcon = ({name='', color}) => {
    return <Ionicons name={name} color={color} size={30} style={{ marginBottom: -3 }} />
};
