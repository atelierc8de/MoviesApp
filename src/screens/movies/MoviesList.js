import React, {Component} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {TouchableOpacity, FlatList, Image} from "react-native";
import {customizeData} from '../data-sample/DataSample';
import UStyle from "../../system/UStyle";
import {Header} from "../../components/common/Header";
import UServiceBase from "../../system/api";
import {toast} from "../../components/common/Toast";
import { auth } from '../../../firebaseConfig';
import UUser from '../../system/UUser';

export default class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        UServiceBase.getMovieList({
            cb: (err, res) => {
                if (!err) {
                    this.setState({data: res?.data?.results});
                } else {
                    toast('error!');
                }
            }
        });
        this.onGetUserID();
    }

    onGetUserID = () => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                UUser.userId = user.uid
            } else {
                toast('error!');
            }
        });
    }

    render() {

        const {data} = this.state;
        const {navigation} = this.props;

        return (
            <View style={{flex:1}}>
                <Header/>

                <FlatList
                    style={{paddingHorizontal: 20}}
                    data={customizeData(data)}
                    keyExtractor={(item, index) => item.id.toString()}
                    ListHeaderComponent={() => <View style={{height: 30}}/>}
                    ItemSeparatorComponent={() => <View style={{height: 30}}/>}
                    ListFooterComponent={() => <View style={{height: 20}}/>}

                    renderItem={
                        ({item, index}) => {
                            return <MoviesListForm {...item} onPress={() => navigation.navigate('MoviesDetail', {id: item.id})}/>
                        }
                    }
                />
            </View>
        );
    }
}

/**
 *
 * @param title
 * @param image
 * @param vote
 * @param date
 * @param language
 * @param idmb
 * @param onPress
 * @constructor
 */
const MoviesListForm = ({
                            title = '', image, vote, date, language, idmb, onPress = () => {
    }
                        }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{
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
                    <View style={{borderWidth: 1, borderColor: 'orange', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 6, marginLeft: 10}}>
                        <Text style={{fontSize: 11, color: 'orange', fontWeight: '400'}}>IMAX</Text>
                    </View>
                </View>

                <Text numberOfLines={1} style={{fontSize: 14, fontWeight: '500', color: '#242424', opacity: 0.4}}>Date: {date}</Text>

                <Text style={{fontSize: 14, fontWeight: '500', color: '#242424', opacity: 0.4}}>Vote: {vote || 'NA'}</Text>
            </View>
        </TouchableOpacity>
    );
};
