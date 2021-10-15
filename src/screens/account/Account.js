import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {StyleSheet} from "react-native";


export default function Account() {

    return(
        <View style={styles.container}>
            <Text>Account</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
