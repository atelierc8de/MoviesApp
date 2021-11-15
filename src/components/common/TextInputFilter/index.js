import {View} from "react-native-ui-lib";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {number, text, color} from "@storybook/addon-knobs";
import PropTypes from 'prop-types';

/**
 *
 * @param children
 * @param iconName
 * @param iconColor
 * @param top
 * @constructor
 */
export const TextInputForm = ({children, iconName = '', iconColor='', top }) => {
    return (
        <View style={{
            height: number('height', 50),
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: top ? 20 : 0,
            borderRadius: number('borderRadius', 4),
            backgroundColor: color('backgroundColor', '#FFF'),
            paddingHorizontal: 15,
            opacity: 0.7,
        }}>
            <Ionicons name={text('iconName', iconName)} size={number('size', 24)} color={color('iconColor', iconColor)} style={{ marginRight: 5 }} />
            {children}
        </View>
    );
};
TextInputForm.propTypes = {
    children: PropTypes.object,
    iconName: PropTypes.string,
    iconColor: PropTypes.string,

    top: PropTypes.bool,
}
