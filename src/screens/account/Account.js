import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native-ui-lib';
import { StyleSheet } from "react-native";
import { firestore } from '../../../firebaseConfig';
import { customizeDataFavorite } from '../data-sample/DataSample';
import UStyle from "../../system/UStyle";



export default function Account() {

    const [data, setData] = useState([]);

    useEffect(() => {
        _getDataFromFirebase();
    }, [])

    const _getDataFromFirebase = async () => {
        const res = firestore.movies()
            .onSnapshot((snapshot) => {
                let dataMovies = []
                snapshot.forEach((doc) => {
                    const docData = doc?.data()
                    const obj = {
                        ...docData,
                        id: doc.id
                    }
                    dataMovies.push(obj)
                })
                setData(customizeDataFavorite(dataMovies));
            });
    }


    return (
        <View style={[styles.container]}>

            {
                data.map((item) => {
                    return (
                        <TouchableOpacity key={item.id} activeOpacity={0.8} style={{
                            paddingHorizontal: 15,
                            paddingTop: 15,
                            flexDirection: 'row',
                            backgroundColor: '#FFF',
                            borderRadius: 6, ...UStyle.shadow
                        }}>
                            <Image source={{ uri: item.image }} style={{ width: 120, height: 150, top: -25, borderRadius: 4 }} />
                            <View style={{ flex: 1, marginLeft: 20, paddingBottom: 25, paddingTop: 10, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: 'bold', color: '#242424', flex: 1 }}>{item.title}</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'orange' }}>{'idmb'}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ borderWidth: 1, borderColor: 'blue', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 6 }}>
                                        <Text style={{ fontSize: 11, color: 'blue', fontWeight: '400' }}>{'language'}</Text>
                                    </View>
                                    <View style={{ borderWidth: 1, borderColor: 'orange', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 6, marginLeft: 10 }}>
                                        <Text style={{ fontSize: 11, color: 'orange', fontWeight: '400' }}>IMAX</Text>
                                    </View>
                                </View>

                                <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '500', color: '#242424', opacity: 0.4 }}>Date: {'date'}</Text>

                                <Text style={{ fontSize: 14, fontWeight: '500', color: '#242424', opacity: 0.4 }}>Category: {'category' || 'NA'}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }


        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
