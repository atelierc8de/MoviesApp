import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Navigation from "./src/navigation/Navigator";
import { RootSiblingParent } from 'react-native-root-siblings';
import {AuthenticatedUserProvider} from "./src/navigation/AuthenticatedUserProvider";

export default function App() {
    return (
        <RootSiblingParent>
            <AuthenticatedUserProvider>
                <Navigation/>
                <StatusBar style="auto"/>
            </AuthenticatedUserProvider>
        </RootSiblingParent>
    );
}
