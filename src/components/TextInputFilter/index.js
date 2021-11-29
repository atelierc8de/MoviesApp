import {View} from "react-native-ui-lib";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import PropTypes from 'prop-types';

/**
 *
 * @param children
 * @param iconName
 * @param iconColor
 * @param height
 * @param borderRadius
 * @param backgroundColor
 * @param style
 * @param top
 * @constructor
 */
export const TextInputForm = ({children, iconName = '', iconColor='', height=50, borderRadius=4, backgroundColor='#FFF', style, top }) => {
    return (
        <View style={{
            height: height,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: top ? 20 : 0,
            borderRadius: borderRadius,
            backgroundColor: backgroundColor,
            paddingHorizontal: 15,
            opacity: 0.7,
            ...style
        }}>
            <Ionicons name={iconName} size={24} color={iconColor} style={{ marginRight: 5 }} />
            {children}
        </View>
    );
};
TextInputForm.propTypes = {
    children: PropTypes.object,

    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    backgroundColor: PropTypes.string,

    height: PropTypes.number,
    borderRadius: PropTypes.number,

    top: PropTypes.bool,
    style: PropTypes.object,
}
