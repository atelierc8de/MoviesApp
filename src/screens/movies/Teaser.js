import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList, Linking} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import UStyle from "../../system/UStyle";
import moment from "moment";

const youtubeUrl = 'https://www.youtube.com/watch?v=';

const customizeData = (data) => {
    return data.map((item, index) => {
        return{
            id: item.id,
            keyUrl: `${youtubeUrl}${item.key}`,
            name: item.name,
            quality: item.size,
            dateUpload: moment(item.published_at).format('DD-MMM-YYYY')
        }
    });
};

export default class Teaser extends Component{

    constructor(props) {
        super(props);
        const {route} = this.props;

        this.state = {
            dataVideos: route.params.dataVideos?.results
        };
    }

    render() {

        const {navigation} = this.props;
        const {dataVideos} = this.state;

        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'transparent'}}>

                <View style={{minWidth:UStyle.deviceWidth-80, maxWidth: UStyle.deviceWidth-80, maxHeight:UStyle.deviceHeight-100, justifyContent:'center', backgroundColor:'#FFF', borderRadius:6, overflow:'hidden'}}>

                    <View style={{height:50, flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:'#242424', paddingHorizontal:15, borderTopLeftRadius:6, borderTopRightRadius:6}}>
                        <Text style={{fontSize:18, fontWeight:'bold', color:'#FFF'}}>TEASER</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.goBack()}>
                            <Ionicons name={'close'} size={24} color={'#FFF'} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        style={{}}
                        data={customizeData(dataVideos)}
                        keyExtractor={(item, index) => item.id.toString()}
                        ListHeaderComponent={() => <View style={{}}/>}
                        ItemSeparatorComponent={() => <View style={{height:1, backgroundColor:'#242424', opacity:0.5}}/>}
                        ListFooterComponent={() => <View style={{}}/>}

                        renderItem={
                            ({item, index}) => {
                                return <TeaserForm {...item} />
                            }
                        }
                    />

                </View>
            </View>
        );
    }
}

/**
 *
 * @param keyUrl
 * @param name
 * @param dateUpload
 * @constructor
 */
const TeaserForm = ({keyUrl, name='', dateUpload}) => {
    return(
        <TouchableOpacity activeOpacity={0.8} onPress={()=>Linking.openURL(keyUrl)} style={{backgroundColor:'#FFF', paddingHorizontal:15, paddingVertical:8}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text numberOfLines={1} style={{color:'#242424', fontSize:16, fontWeight:'bold'}}>{name}</Text>
            </View>
            <Text style={{color:'#242424', fontSize:14, marginTop:5, opacity:0.7}}>{dateUpload}</Text>
        </TouchableOpacity>
    );
};
