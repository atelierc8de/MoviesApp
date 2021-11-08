import React from 'react';
import UStyle from "../../system/UStyle";
import {Image, TouchableOpacity} from "react-native";
import {Text, View} from "react-native-ui-lib";
import styled from "styled-components/native";
import UColor from "../../system/UColor";
import Ionicons from "@expo/vector-icons/Ionicons";

/**
 *
 * @param title
 * @param image
 * @param vote
 * @param date
 * @param language
 * @param idmb
 * @param goToMovieDetails
 * @constructor
 */
const MoviesItem = ({title = '', image, vote, date, language, idmb, goToMoviesDetail = () => {}}) => {
    return(
        <TouchableOpacity activeOpacity={0.8} onPress={goToMoviesDetail} style={{
            paddingHorizontal: 15,
            paddingTop: 15,
            flexDirection: 'row',
            backgroundColor: '#FFF',
            borderRadius: 6, ...UStyle.shadow
        }}>
            <Image source={{uri: image}} style={{width: 120, height: 150, top: -25, borderRadius: 4}}/>
            <View style={{flex: 1, marginLeft: 20, paddingBottom: 25, paddingTop: 10, justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text numberOfLines={1} style={{fontSize: 18, fontWeight: 'bold', color: '#242424', flex:1}}>{title}</Text>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: 'orange'}}>{idmb}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{borderWidth: 1, borderColor: 'blue', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 6}}>
                        <Text style={{fontSize: 11, color: 'blue', fontWeight: '400'}}>{language.toUpperCase()}</Text>
                    </View>
                </View>

                <Text numberOfLines={1} style={{fontSize: 14, fontWeight: '500', color: '#242424', opacity: 0.4}}>Date: {date}</Text>

                <Text style={{fontSize: 14, fontWeight: '500', color: '#242424', opacity: 0.4}}>Vote: {vote || 'NA'}</Text>
            </View>
        </TouchableOpacity>
    );
};

/**
 *
 * @param children
 * @param iconName
 * @param iconColor
 * @param top
 * @constructor
 */
const TextInputForm = ({ children, iconName = '', iconColor, top }) => {
    return (
        <View style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: top ? 20 : 0,
            borderRadius: 4,
            backgroundColor: '#FFF',
            paddingHorizontal: 15,
            opacity: 0.7
        }}>
            <Ionicons name={iconName} size={24} color={iconColor} style={{ marginRight: 5 }} />
            {children}
        </View>
    );
};

const TextTitle = styled.Text`
  font-size: 20px; 
  color: ${UColor.textDark}; 
  font-weight: bold; 
  padding: 0 20px; 
  margin: 10px 0 5px 0;
`;


const TrailerButton = styled.TouchableOpacity`
  height: 40px;
  flex-direction: row; 
  position: absolute; 
  align-items: center; 
  background-color: rgba(255,255,255,0.2); 
  right: 0;
  padding: 0 10px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  z-index: 100;
`;

const TextMoviesDetail = styled.Text`
  font-size: 16px;
  font-weight: ${props => props.fontWeight ? props.fontWeight : '400'};
  opacity: 0.8;
  color: ${props => props.UColor};
`;

export {MoviesItem, TextTitle, TextInputForm, TrailerButton, TextMoviesDetail}
