import React, {useState, useEffect} from 'react';
import {View} from 'react-native-ui-lib';
import {FlatList, Text} from 'react-native';
import {firestore} from '../../../firebaseConfig';
import {customizeDataFavorite} from './CustomizeData';
import UUser from '../../system/UUser';
import {Header} from "../../components/common/Header";
import {MoviesItem, TextTitle} from "../../components/common/Element";
import UColor from "../../system/UColor";
import {convertStringHaveSpecialChars} from "../../system/UUtility";

export default function FavoriteFilm({navigation}){

    const [data, setData] = useState([]);
    const [textSearch, setTextSearch] = useState('');

    useEffect(() => {
        _getDataFromFirebase();
    }, []);

    const _getDataFromFirebase = async () => {
       firestore.favorites()
       .collection(UUser.userId)
            .onSnapshot((snapshot) => {
                let dataMovies = []
                snapshot.forEach((doc) => {
                    const docData = doc?.data();
                    const obj = {
                        ...docData,
                        id: doc.id
                    }
                    dataMovies.push(obj);
                })
                setData(customizeDataFavorite(dataMovies));
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
        <View style={{flex:1}}>
            <Header value={textSearch} onChangeText={(textSearch) => setTextSearch(textSearch)}/>

            <TextTitle>Favorite</TextTitle>
            <FlatList
                style={{paddingHorizontal: 20}}
                data={data}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={() => <View style={{height: 30}}/>}
                ItemSeparatorComponent={() => <View style={{height: 30}}/>}
                ListFooterComponent={() => <View style={{height: 20}}/>}

                ListEmptyComponent={() => (data.length===0?<View style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15}}>
                    <Text style={{fontSize:16, color:UColor.textDark, textAlign:'center'}}>Favorite film empty!</Text>
                </View>:null)}

                renderItem={
                    ({item}) => {
                        return <MoviesItem {...item} goToMoviesDetail={() => navigation.navigate('MoviesDetail', {id: item.id})}/>
                    }
                }
            />
        </View>
    );
}
