import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import UStyle from "../../system/UStyle";
import Ionicons from '@expo/vector-icons/Ionicons';

// const SpaceBottom = 20;
export const Header = ({}) => {
    return(
        <View style={[styles.headerStyle, {marginTop:UStyle.statusBarHeight, paddingHorizontal:20}]}>
            <Image source={require('../../images/cinima.png')} style={{width:100, height:50}} />
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{}}>
                <Ionicons name={'search'} size={24} />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
