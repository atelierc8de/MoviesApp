import {View} from "react-native-ui-lib";
import {color, number, text} from "@storybook/addon-knobs";
import Ionicons from "@expo/vector-icons/Ionicons";
import {TextInput} from "react-native";
import PropTypes from "prop-types";
import React from "react";

/**
 *
 * @param iconName
 * @param iconColor
 * @param placeholder
 * @param textContentType
 * @param keyboardType
 * @param returnKeyType
 * @param value
 * @param secureTextEntry
 * @param onChangeText
 * @param onSubmitEditing
 * @param top
 * @returns {JSX.Element}
 * @constructor
 */
export const TextInputForm = ({iconName = '', iconColor='', placeholder='', textContentType, keyboardType, returnKeyType, value, secureTextEntry, onChangeText=()=>{}, onSubmitEditing=()=>{}, top }) => {
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
            borderWidth:1,
            marginHorizontal:number('marginHorizontal', 20),
        }}>
            <Ionicons name={text('iconName', iconName||'home')} size={number('size', 24)} color={color('iconColor', iconColor)} style={{ marginRight: 5 }} />
            <TextInput
                style={{ flex: 1, fontSize: 16 }}
                placeholder={text('placeholder', placeholder||'Enter...')}
                placeholderTextColor={color('placeholderTextColor', '#6B7B8B')}
                textContentType={text('textContentType', textContentType)}
                keyboardType={text('keyboardType', keyboardType)}
                returnKeyType={text('returnKeyType', returnKeyType)}
                value={value}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    );
};
TextInputForm.propTypes = {
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    textContentType: PropTypes.string,
    keyboardType: PropTypes.string,
    returnKeyType: PropTypes.string,

    ref: PropTypes.func,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,

    top: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
}
