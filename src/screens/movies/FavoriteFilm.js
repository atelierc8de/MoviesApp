import React, {useState, useEffect} from 'react';
import {View} from 'react-native-ui-lib';
import {FlatList} from 'react-native';
import {firestore} from '../../../firebaseConfig';
import {customizeDataFavorite} from './CustomizeData';
import UUser from '../../system/UUser';
import {Header} from "../../components/common/Header";
import {MoviesItem, TextTitle} from "../../components/common/Element";

export default function FavoriteFilm({}){

    const [data, setData] = useState([]);

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

    return (
        <View style={{flex:1}}>
            <Header/>

            <TextTitle>Favorite</TextTitle>
            <FlatList
                style={{paddingHorizontal: 20}}
                data={data}
                keyExtractor={(item, index) => item.id.toString()}
                ListHeaderComponent={() => <View style={{height: 30}}/>}
                ItemSeparatorComponent={() => <View style={{height: 30}}/>}
                ListFooterComponent={() => <View style={{height: 20}}/>}

                renderItem={
                    ({item, index}) => {
                        return <MoviesItem {...item}/>
                    }
                }
            />
        </View>
    );
}
