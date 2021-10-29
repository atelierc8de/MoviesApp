import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import {firestore} from '../../../firebaseConfig';
import {customizeDataFavorite} from '../data-sample/DataSample';
import UStyle from "../../system/UStyle";
import UUser from '../../system/UUser';
import {Header} from "../../components/common/Header";


export default function FavoriteFilm({navigation}){

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

    console.log('dataListFa', data)

    return (
        <View style={{flex:1}}>
            <Header/>
            <FlatList
                style={{paddingHorizontal: 20}}
                data={data}
                keyExtractor={(item, index) => item.id.toString()}
                ListHeaderComponent={() => <View style={{height: 30}}/>}
                ItemSeparatorComponent={() => <View style={{height: 30}}/>}
                ListFooterComponent={() => <View style={{height: 20}}/>}

                // onEndReached={this.loadMore}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={this.state.refreshing}
                //         onRefresh={()=>{
                //             this.setState({data: UUser.dataUser})
                //         }}
                //         progressBackgroundColor="white"
                //     />
                // }

                renderItem={
                    ({item, index}) => {
                        return <FavoriteFilmItem {...item} onPress={() => navigation.navigate('MoviesDetail', {id: item.id})}/>
                    }
                }
            />
        </View>
    );
}

/**
 *
 * @param image
 * @param title
 * @param idmb
 * @param language
 * @param date
 * @param vote
 * @param onPress
 * @constructor
 */
const FavoriteFilmItem = ({image, title, idmb, language='', date, vote, onPress}) => {

    console.log('FavoriteFilmItem',image, title, idmb, language='', date, vote, onPress )
    return(
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
