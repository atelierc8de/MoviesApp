import React, { useState, useEffect } from 'react';
import { View } from 'react-native-ui-lib';
import { FlatList, Text, ActivityIndicator } from 'react-native';
import { firestore } from '../../../firebaseConfig';
import { customizeDataFavorite } from './CustomizeData';
import UUser from '../../system/UUser';
import { Header } from "../../components/header";
import { TextTitle } from "../../components/common/Styled";
import UColor from "../../system/UColor";
import { convertStringHaveSpecialChars } from "../../system/UUtility";
import { MoviesItem } from './movies-component';
import { useNavigation } from '@react-navigation/native';

export default function FavoriteFilm() {

    const [data, setData] = useState([]);
    const [textSearch, setTextSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setLoading(true);
        _getDataFromFirebase();
    }, []);

    const _getDataFromFirebase = async () => {
        firestore.favorites()
            .collection(UUser.userId)
            .onSnapshot((snapshot) => {
                let dataMovies = [];
                snapshot.forEach((doc) => {
                    const docData = doc?.data();
                    const obj = {
                        ...docData,
                        id: doc.id
                    }
                    dataMovies.push(obj);
                })
                setData(customizeDataFavorite(dataMovies));
                setLoading(false);
            });
    }

    /**
     * Data searching Favorite Film
     * @type {*[]}
     */
    const dataFiltered = data.filter(item => {
        return (
            item.title.toString().match(new RegExp(convertStringHaveSpecialChars(textSearch), 'i'))
        );
    });


    return (
        <View style={{ flex: 1 }}>
            <Header value={textSearch} onChangeText={(textSearch) => setTextSearch(textSearch)} />

            <TextTitle>Favorite</TextTitle>
            {
                loading ? (
                    <ActivityIndicator size="large" animating={true} color={'red'} />
                ) : (
                    <FlatList
                        style={{ paddingHorizontal: 20 }}
                        data={dataFiltered}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={() => <View style={{ height: 30 }} />}
                        ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
                        ListFooterComponent={() => <View style={{ height: 20 }} />}

                        ListEmptyComponent={() => (data.length === 0 ? <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 }}>
                            <Text style={{ fontSize: 16, color: UColor.textDark, textAlign: 'center' }}>Favorite film empty!</Text>
                        </View> : null)}

                        renderItem={
                            ({ item }) => {
                                return <MoviesItem {...item} goToMoviesDetail={() => navigation.navigate('MoviesDetail', { id: item.id })} />
                            }
                        }
                    />
                )
            }


        </View>
    );
}
