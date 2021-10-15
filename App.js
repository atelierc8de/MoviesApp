import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Navigation from "./src/navigation/Navigator";

export default function App() {
    return (
        <>
            <Navigation/>
            <StatusBar style="auto"/>
        </>
    );
}
