import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {StyleSheet} from "react-native";

export default function MoviesDetail(){

    return(
        <View style={styles.container}>
            <Text>MoviesDetail</Text>
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
