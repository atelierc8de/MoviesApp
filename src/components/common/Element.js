import React from 'react';
import UStyle from "../../system/UStyle";
import {Image, TouchableOpacity} from "react-native";
import {Text, View} from "react-native-ui-lib";
import styled from "styled-components/native";
import UColor from "../../system/UColor";

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

const TextTitle = styled.Text`
  font-size: 20px; 
  color: ${UColor.textDark}; 
  font-weight: bold; 
  padding: 0 20px; 
  margin-top: 20px;
`;

export {MoviesItem, TextTitle}
