import React, { useState, useEffect } from 'react';
import {Text, View} from 'react-native-ui-lib';
import {StyleSheet, TouchableOpacity, FlatList, Image} from "react-native";
import {customizeData, dataSample} from '../data-sample/DataSample';
import UStyle from "../../system/UStyle";
import ServiceBase from '../../system/api';

export default function MoviesList() {

    const [data, setData] = useState([]);

    useEffect(async () => {
        ServiceBase.getMovieList({
            cb: (err, res) => {
                if (!err) {
                    setData(res?.data)
                } else {
                    console.log('res', err)
                }
            }
        });
    }, []);

    console.log('data', data)

    return(
        <View style={[styles.container, {paddingHorizontal:20}]}>
            <FlatList
                data={customizeData(dataSample.moviesList)}
                keyExtractor={(item, index) => item.id.toString()}

                renderItem={
                    ({item, index}) => {
                        return <MoviesListForm {...item} />
                    }
                }
            />
        </View>
    );
}



const MoviesListForm = ({title='', image, time, }) => {
    return(
        <TouchableOpacity style={{padding:15, backgroundColor:'#FFF', ...UStyle.shadow}}>
            <Text>{title}</Text>
            <Text>{time}</Text>
            <Image source={{uri: image}} style={{width:100, height:100}} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    }
})
