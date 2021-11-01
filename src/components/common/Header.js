import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native';
import UStyle from "../../system/UStyle";
import Ionicons from '@expo/vector-icons/Ionicons';
import UColor from "../../system/UColor";

export const Header = ({onChangeText, value}) => {
    const [showSearchForm, setShowSearchForm] = useState(false);
    return (
        <>
            <View style={[styles.headerStyle, {marginTop: UStyle.statusBarHeight, paddingHorizontal: 20}]}>
                <Image source={require('../../images/cinima.png')} style={{width: 100, height: 50}}/>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setShowSearchForm(!showSearchForm)}>
                    <Ionicons name={'search'} size={24}/>
                </TouchableOpacity>

            </View>

            {showSearchForm ?
                <View style={{height: 40, flexDirection: 'row', alignItems: 'center', paddingHorizontal:10, marginHorizontal:20, borderWidth: 1, marginTop:8, borderRadius:4, borderColor: '#CAD3DB', backgroundColor:UColor.whiteColor}}>
                    <TextInput
                        disableFullscreenUI
                        placeholder='Search'
                        returnKeyType='search'
                        value={value}
                        style={{
                            flex: 1,
                            height: 40,
                            fontSize: 16,
                        }}
                        clearButtonMode='always'
                        onChangeText={onChangeText}
                        autoFocus={true}
                    />
                </View> : null}
        </>
    );
};


const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
