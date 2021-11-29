import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Navigation} from './src/navigation/Navigator';
import { RootSiblingParent } from 'react-native-root-siblings';
import UUser from './src/system/UUser';
import { mobxUser } from './src/mobx/mobxUser';
// import StorybookUIRoot from "./storybook";

function App() {

    const autoLogin = () => {
        mobxUser.saveUID(UUser.userId);
        mobxUser.saveUser(UUser.email);
    };
    UUser.initDataFromStorage(autoLogin).then();

    return (
        <RootSiblingParent>
            <Navigation />
            <StatusBar style="auto" />
        </RootSiblingParent>
    );
}

module.exports = App;
