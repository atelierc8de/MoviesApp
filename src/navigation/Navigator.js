import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoviesList from "../screens/movies/MoviesList";
import Ionicons from '@expo/vector-icons/Ionicons';
import Login from "../screens/account/Login";
import Account from "../screens/account/Account";
import MoviesDetail from "../screens/movies/MoviesDetail";
import Teaser from "../screens/movies/Teaser";

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
        <Stack.Navigator screenOptions={{gestureEnabled: false}}>
            <Stack.Screen name={'Login'} component={Login} options={{ headerShown: false }} />
            <Stack.Screen name={'Root'} component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name={'MoviesDetail'} component={MoviesDetail} options={{ headerShown: false }} />
            <Stack.Group>
                <Stack.Screen name={'Teaser'} component={Teaser} options={{ headerShown: false, presentation: 'transparentModal' }} />
            </Stack.Group>
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
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
                }}
            />
            <BottomTab.Screen
                name={'List Favorite'}
                component={Account}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="people-sharp" color={color} />
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
    return <Ionicons name={name} color={color} size={26} style={{ marginBottom: -3 }} />
};
