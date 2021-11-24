import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, TextInput, Text } from 'react-native';
import UStyle from "../../system/UStyle";
import Ionicons from '@expo/vector-icons/Ionicons';
import UColor from "../../system/UColor";
import { useSpring, animated } from '@react-spring/native';
import PropTypes from 'prop-types';

/**
 *
 * @param onChangeText
 * @param value
 * @constructor
 */
export const Header = ({ onChangeText, value }) => {
    const [showSearchForm, setShowSearchForm] = useState(false);

    const { height, opacity } = useSpring({
        from: { height: 0, opacity: 0, y: 0 },
        to: {
            height: showSearchForm ? 40 : 0,
            opacity: showSearchForm ? 1 : 0,
            y: showSearchForm ? 0 : 40,
        },
        delay: 100,
    });

    return (
        <>
            <View style={[styles.headerStyle, { marginTop: UStyle.statusBarHeight, paddingHorizontal: 20 }]}>
                <Image source={require('../../images/cinima.png')} style={{ width: 100, height: 50 }} />
                <TouchableOpacity activeOpacity={0.8} onPress={() => setShowSearchForm(!showSearchForm)} style={{ height: 50, width: 100, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Ionicons name={'search'} size={24} />
                </TouchableOpacity>

            </View>

            {showSearchForm &&
                (
                    <animated.View style={{ height: height, opacity, flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, borderWidth: 1, borderRadius: 4, borderColor: '#CAD3DB', backgroundColor: UColor.whiteColor }}>
                        <TextInput
                            disableFullscreenUI
                            placeholder='Search'
                            returnKeyType='search'
                            value={value}
                            style={{ flex: 1, height: 40, fontSize: 16, paddingHorizontal: 10 }}
                            clearButtonMode='always'
                            onChangeText={onChangeText}
                        />
                    </animated.View>
                )
            }
        </>
    );
};

Header.propTypes = {
    onChangeText: PropTypes.func,
    value: PropTypes.string
}

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
