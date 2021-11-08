import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { mobxUser } from '../../mobx/mobxUser';
import UStyle from "../../system/UStyle";
import UColor from "../../system/UColor";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Logout(){

    return (
        <View style={{flex: 1, justifyContent:'center'}}>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', height:44, marginHorizontal:20, paddingLeft:15, borderRadius:6, backgroundColor:'#FFF', ...UStyle.shadow}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:UColor.textDark, fontWeight:'bold'}}>Email:</Text>
                    <Text style={{fontSize:16, color:UColor.textDark, fontWeight:'500', marginLeft:10}}>{mobxUser.user}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{}} style={{height:44, width:44, justifyContent:'center', alignItems:'center'}}>
                    <Ionicons name={'md-create'} size={24} />
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', height:44, marginHorizontal:20, paddingLeft:15, borderRadius:6, backgroundColor:'#FFF', marginTop:20, ...UStyle.shadow}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:UColor.textDark, fontWeight:'bold'}}>Password:</Text>
                    <Text style={{fontSize:16, color:UColor.textDark, fontWeight:'500', marginLeft:10}}>{'N/A'}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{}} style={{height:44, width:44, justifyContent:'center', alignItems:'center'}}>
                    <Ionicons name={'md-create'} size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
