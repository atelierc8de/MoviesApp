import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Navigation} from './src/navigation/Navigator';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
    return (
        <RootSiblingParent>
            <Navigation />
            <StatusBar style="auto" />
        </RootSiblingParent>
    );
}
