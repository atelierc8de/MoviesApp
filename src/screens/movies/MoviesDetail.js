import React, { Component } from 'react';
import { Text, View } from 'react-native-ui-lib';
import { ImageBackground, TouchableOpacity } from "react-native";
import { toast } from "../../components/common/Toast";
import UServiceBase from "../../system/api";
import { imageUrl } from "../data-sample/DataSample";
import { LinearGradient } from 'expo-linear-gradient';
import UStyle from "../../system/UStyle";
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from "moment";
import { firestore } from '../../../firebaseConfig';


export default class MoviesDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false
        };
    }

    componentDidMount() {
        const { route } = this.props;
        UServiceBase.getMovieDetail({
            id: route?.params?.id,
            cb: (err, res) => {
                if (!err) {
                    this.setState({ data: res?.data });
                } else {
                    toast('error!');
                }
            }
        });
    }

    addMoviesFavorite = () => {
        const { data } = this.state;
        firestore.movies().add({
            id: data?.id || 438631,
            title: data?.title || 'Dune',
            poster_path: data?.poster_path || '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"',
            release_date: data?.release_date,
            runtime: data.runtime,
            vote_average: data?.vote_average,
            vote_count: data?.vote_count,
            original_language: data?.original_language,
        });

        /**
         * add data favorite AsyncStorage fake
         */
        // const dataFavorite = {
        //     id: data?.id || 438631,
        //     title: data?.title || 'Dune',
        //     poster_path: data?.poster_path || '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"',
        //     release_date: data?.release_date,
        //     runtime: data.runtime,
        //     vote_average: data?.vote_average,
        //     vote_count: data?.vote_count,
        //     original_language: data?.original_language,
        // };
        //
        // UUser.dataUser.push(dataFavorite);
        // AsyncStorage.setItem(
        //     'DataUser',
        //     JSON.stringify(UUser.dataUser)
        // );
        toast('Add Film Favorite Success!');
    }

    render() {

        const { data } = this.state;
        const dataVideos = data.videos;
        const {poster_path, title, release_date:date, runtime, vote_average:vote, overview} = data;
        const { navigation } = this.props;

        return (
            <View style={{flex:1}}>
                <ImageBackground source={{ uri: `${imageUrl}${poster_path}` }} style={{ flex: 1 }}>
                    <View style={{ marginTop: UStyle.statusBarHeight, paddingHorizontal: 10 }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name={'ios-arrow-back'} size={30} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,1)', position: 'relative' }}>
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,1)']} style={{ height: 90, width: UStyle.deviceWidth, alignItems: 'center', position: 'absolute', top: -90, backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <Text numberOfLines={1} style={{ fontSize: 26, fontWeight: 'bold', color: '#fff' }}>{title}</Text>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: '400', color: '#fff', opacity: 0.8 }}>{moment(date).format('YYYY')}</Text>
                            <Text style={{ fontSize: 16, fontWeight: '400', color: '#fff', opacity: 0.8, paddingHorizontal: 3 }}>&#8226;</Text>
                            <Text style={{ fontSize: 16, fontWeight: '400', color: '#fff', opacity: 0.8 }}>{Math.floor(runtime / 60)}h {runtime % 60}min</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'yellow', opacity: 0.8, marginRight: 3 }}>{vote}</Text>
                            {[0, 1, 2, 3, 4].map((item, i) => (
                                <Ionicons key={item.toString()} name={'star'} size={16} color={i === 4 ? 'gray' : 'yellow'} style={{ opacity: 0.8, marginLeft: 2 }} />
                            ))}
                        </View>
                    </LinearGradient>
                    <View style={{ flex: 1, marginTop: 8, paddingHorizontal:15 }}>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#fff' }}>{data.overview}</Text>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Teaser', { dataVideos: dataVideos })} style={{ paddingHorizontal: 25, paddingVertical: 8, backgroundColor: 'red', opacity: 0.8, borderRadius: 6 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>Watch Now</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.9} onPress={this.addMoviesFavorite} style={{ marginTop: 20, paddingHorizontal: 25, paddingVertical: 8, backgroundColor: 'green', opacity: 0.8, borderRadius: 6 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>Add Favorite</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
