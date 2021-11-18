import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import { Image, ImageBackground, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { observer } from "mobx-react";
import { toast } from "../../components/common/Toast/Toast";
import UServiceBase from "../../system/api";
import { imageUrl } from "./CustomizeData";
import { LinearGradient } from 'expo-linear-gradient';
import UStyle from "../../system/UStyle";
import UUser from '../../system/UUser';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from "moment";
import { firestore } from '../../../firebaseConfig';
import ListViewLogicExt from "../../components/common/ListViewLogicExt";
import UColor from "../../system/UColor";
import { mobxUser } from "../../mobx/mobxUser";
import { TextMoviesDetail, TrailerButton } from "../../components/common/Styled";

export default class MoviesDetail extends ListViewLogicExt {

    /**
     *
     */
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

        this.getListFavorite().then();
    }

    getListFavorite = async () => {
        const { route } = this.props;
        const paramID = route?.params?.id
        firestore.favorites()
            .collection(mobxUser.uID)
            .onSnapshot((snapshot) => {
                let moviesFavorite = []
                snapshot.forEach((doc) => {
                    const docData = doc?.data();
                    const obj = {
                        ...docData,
                        id: doc.id
                    }
                    moviesFavorite.push(obj);
                });

                const moviesFilter = moviesFavorite?.filter(item => item.movieID === paramID);
                this.setState({ listFavorite: moviesFavorite, isAddFavorite: paramID === moviesFilter[0]?.movieID ? true : false, docID: moviesFilter[0]?.id })
            });
    };

    addMoviesFavorite = () => {
        mobxUser.disableAddMovie = true;
        const { data, isAddFavorite, docID } = this.state;

        if (!isAddFavorite) {
            firestore.favorites()
                .collection(UUser.userId)
                .add({
                    id: data?.id || 438631,
                    movieID: data?.id || 438631,
                    title: data?.title || 'Dune',
                    poster_path: data?.poster_path || '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"',
                    release_date: data?.release_date,
                    runtime: data.runtime,
                    vote_average: data?.vote_average,
                    vote_count: data?.vote_count,
                    original_language: data?.original_language,
                })
                .then(() => {
                    toast('Add Film Favorite Success!');
                    mobxUser.disableAddMovie = false;


                }).catch((error) => {
                    toast('Error add Film Favorite!');
                });


        } else {
            firestore.favorites()
                .collection(UUser.userId)
                .doc(docID)
                .delete()
                .then(() => {
                    toast('Remove Film Favorite Success!');
                    mobxUser.disableAddMovie = false;
                }).catch((error) => {
                    toast('Error removing Film Favorite!');
                });
        }
    };

    render() {

        const { data, isAddFavorite } = this.state;
        const { poster_path, title, release_date: date, runtime, vote_average: vote, overview, genres = [] } = data;
        const { navigation } = this.props;
        const dataCast = data.credits?.cast;

        const TypeItem = () => {
            return (
                <FlatList
                    style={{ marginTop: 3 }}
                    data={genres}
                    horizontal={true}
                    keyExtractor={(item, index) => item.id.toString()}
                    ItemSeparatorComponent={() => <View
                        style={{ width: 1, height: 17, marginHorizontal: 7, backgroundColor: UColor.whiteColor, opacity: 0.8 }} />}

                    renderItem={
                        ({ item, index }) => {
                            return <Text style={{ fontSize: 14, color: UColor.whiteColor, fontWeight: '400', opacity: 0.8 }}>{item.name}</Text>
                        }
                    }
                />
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={{ uri: `${imageUrl}${poster_path}` }} style={{ flex: 1 }}>
                    <LinearGradient colors={['rgba(0,0,0,0.4)', 'transparent']}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: UStyle.statusBarHeight, paddingHorizontal: 10 }}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}
                                style={{ width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name={'ios-arrow-back'} size={30} color={UColor.whiteColor} />
                            </TouchableOpacity>
                            <AddFavorite onPress={this.addMoviesFavorite} isAddFavorite={isAddFavorite} />
                        </View>
                    </LinearGradient>

                    <TrailerButton activeOpacity={0.8} style={{ top: UStyle.topBarAndStatusBarHeight + 20 + 40 + 40 + 20 }} onPress={() => navigation.navigate('Teaser', { dataTeaser: data.videos })}>
                        <View style={{
                            backgroundColor: UColor.whiteColor,
                            opacity: 0.8,
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Ionicons name={'play-circle'} size={20} color={UColor.favoriteColor} style={{ right: -1 }} />
                        </View>
                        <Text style={{ fontSize: 14, color: UColor.whiteColor, fontWeight: '600', marginLeft: 8, opacity: 0.8 }}>Watch Trailer</Text>
                    </TrailerButton>
                </ImageBackground>

                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,1)', position: 'relative' }}>
                    <LinearGradient colors={UColor.gradientMoviesDetail} style={{
                        height: 110,
                        width: UStyle.deviceWidth,
                        alignItems: 'center',
                        position: 'absolute',
                        top: -110,
                        backgroundColor: 'rgba(0,0,0,0.1)'
                    }}>
                        <Text numberOfLines={1} style={{ fontSize: 26, fontWeight: 'bold', color: '#fff' }}>{title}</Text>
                        <TypeItem />
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <TextMoviesDetail UColor={UColor.whiteColor}>{moment(date, 'YYYY-MM-DD').format('YYYY')}</TextMoviesDetail>
                            <TextMoviesDetail UColor={UColor.whiteColor} style={{ paddingHorizontal: 3 }}>&#8226;</TextMoviesDetail>
                            <TextMoviesDetail UColor={UColor.whiteColor}>{Math.floor(runtime / 60)}h {runtime % 60}min</TextMoviesDetail>
                        </View>
                        <TextMoviesDetail UColor={UColor.yellow} fontWeight={500} style={{ marginTop: 5 }}>{vote} IDMB</TextMoviesDetail>
                    </LinearGradient>
                    <View style={{ flex: 1, marginTop: 8, paddingHorizontal: 15 }}>
                        <ScrollView>
                            <Text style={{ fontSize: 16, color: UColor.whiteColor, fontWeight: '600' }}>Plot Summary</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: UColor.whiteColor, marginTop: 15 }}>{overview}</Text>

                            <View style={{ marginTop: 30, marginBottom: UStyle.bottomSpace }}>
                                <Text style={{ fontSize: 16, color: UColor.whiteColor, fontWeight: '600' }}>Cast</Text>
                                <FlatList
                                    style={{ marginTop: 15 }}
                                    data={dataCast}
                                    horizontal={true}
                                    keyExtractor={(item, index) => item.id.toString()}
                                    ItemSeparatorComponent={() => <View style={{ width: 25 }} />}

                                    renderItem={
                                        ({ item, index }) => {
                                            return <CastItem {...item} />
                                        }
                                    }
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

/**
 *
 * @param image
 * @param name
 * @param character
 * @constructor
 */
const CastItem = ({ profile_path: image, name, character }) => {

    const scaleImage = 50;
    const borderRadius = scaleImage / 2;

    return (
        <View style={{ alignItems: 'center' }}>
            {image ? <Image source={{ uri: `${imageUrl}${image}` }} style={{ width: scaleImage, height: scaleImage, borderRadius: borderRadius }} /> :
                <View style={{
                    width: scaleImage,
                    height: scaleImage,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: borderRadius,
                    backgroundColor: UColor.whiteColor
                }}>
                    <Ionicons name={'people-circle'} size={30} />
                </View>}
            <Text style={{ color: UColor.whiteColor, fontSize: 11, fontWeight: '500', marginTop: 5 }}>{name}</Text>
            <Text style={{ color: UColor.whiteColor, fontSize: 9, fontWeight: '500', marginTop: 5, opacity: 0.8 }}>{character}</Text>
        </View>
    );
};

/**
 *
 * @type {function({onPress: *, isAddFavorite: *}): *}
 */
const AddFavorite = observer(({onPress, isAddFavorite}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} disabled={mobxUser.disableAddMovie} onPress={onPress}
            style={{ width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name={'heart'} size={30} color={isAddFavorite ? UColor.favoriteColor : UColor.whiteColor} />
        </TouchableOpacity>
    );
});
