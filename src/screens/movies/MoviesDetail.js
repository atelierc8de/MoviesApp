import React, {Component} from 'react';
import {Text, View, Button} from 'react-native-ui-lib';
import {StyleSheet, ImageBackground, TouchableOpacity} from "react-native";
import {toast} from "../../components/common/Toast";
import UServiceBase from "../../system/api";
import {imageUrl} from "../data-sample/DataSample";
import { LinearGradient } from 'expo-linear-gradient';
import UStyle from "../../system/UStyle";
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from "moment";

export default class MoviesDetail extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const {route} = this.props;
        UServiceBase.getMovieDetail({
            id: route?.params?.id,
            cb: (err, res) => {
                if (!err) {
                    this.setState({data: res?.data});
                } else {
                    toast('error!');
                }
            }
        });
    }

    render() {

        const {data} = this.state;
        const image = `${imageUrl}${data.poster_path}`;

        const production = data.production_companies;

        // console.log('data', data, production.logo_path);

        const {navigation} = this.props;

        return(
            <View style={[styles.container]}>
                <ImageBackground source={{uri: image}} style={{flex:1}}>
                    <View style={{marginTop: UStyle.statusBarHeight, paddingHorizontal:10}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.goBack()} style={{width:44, height:44, justifyContent:'center', alignItems:'center'}}>
                            <Ionicons name={'ios-arrow-back'} size={30} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={{flex:1, backgroundColor:'rgba(0,0,0,1)', position:'relative', paddingHorizontal:15}}>
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,1)']} style={{height:90, width:UStyle.deviceWidth, alignItems:'center', position:'absolute', top:-90, backgroundColor:'rgba(0,0,0,0.1)'}}>
                        <Text numberOfLines={1} style={{fontSize: 26, fontWeight: 'bold', color: '#fff'}}>{data.title}</Text>

                        <View style={{flexDirection:'row', marginTop:5}}>
                            <Text style={{fontSize: 16, fontWeight: '400', color: '#fff', opacity:0.8}}>{moment(data.release_date).format('YYYY')}</Text>
                            <Text style={{fontSize: 16, fontWeight: '400', color: '#fff', opacity:0.8, paddingHorizontal:3}}>&#8226;</Text>
                            <Text style={{fontSize: 16, fontWeight: '400', color: '#fff', opacity:0.8}}>{data.runtime} min</Text>
                        </View>
                        <View style={{flexDirection:'row', marginTop:5}}>
                            <Text style={{fontSize: 16, fontWeight: '500', color: 'yellow', opacity:0.8, marginRight:3}}>{data.vote_average}</Text>
                            {[0,1,2,3,4].map((item, i) => (
                                <Ionicons key={item.toString()} name={'star'} size={16} color={i===4?'gray':'yellow'} style={{opacity:0.8, marginLeft:2}} />
                            ))}
                        </View>
                    </LinearGradient>
                    <View style={{flex:1, marginTop:8}}>
                        <Text style={{fontSize: 14, fontWeight: '400', color: '#fff'}}>{data.overview}</Text>

                        <View>

                        </View>

                        <View style={{justifyContent:'center', alignItems:'center', marginTop:20}}>
                            <TouchableOpacity activeOpacity={0.9} onPress={()=>{}} style={{paddingHorizontal:25, paddingVertical:8, backgroundColor:'red', opacity:0.8, borderRadius:6}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>Watch Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
    }
});
