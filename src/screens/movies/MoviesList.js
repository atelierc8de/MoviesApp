import React from 'react';
import {View} from 'react-native-ui-lib';
import {FlatList, RefreshControl} from "react-native";
import {customizeDataMovies} from './CustomizeData';
import {Header} from "../../components/common/Header";
import UServiceBase from "../../system/api";
import {toast} from "../../components/common/Toast";
import { auth } from '../../../firebaseConfig';
import UUser from '../../system/UUser';
import ListViewLogicExt from "../../components/common/ListViewLogicExt";
import {MoviesItem, TextTitle} from "../../components/common/Element";

export default class MoviesList extends ListViewLogicExt {

    /**
     *
     */
    componentDidMount() {
        this.getData();
    }

    /**
     *
     */
    getData = () => {
        if (this.pageCurrent < this.pageMax && !this.loading) {
            this.loading = true;
            UServiceBase.getMovieList({
                cb: (err, res) => {
                    if (!err) {
                        this.setState({data: res?.data?.results});
                    } else {
                        toast('error!');
                    }
                }
            });
        }

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

                <TextTitle>Popular</TextTitle>
                <FlatList
                    style={{paddingHorizontal: 20}}
                    data={customizeDataMovies(data)}
                    keyExtractor={(item, index) => item.id.toString()}
                    ListHeaderComponent={() => <View style={{height: 30}}/>}
                    ItemSeparatorComponent={() => <View style={{height: 30}}/>}
                    ListFooterComponent={() => <View style={{height: 20}}/>}

                    onEndReached={this.loadMore}

                    // extraData={this.state}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.loadFirstPage}
                            progressBackgroundColor="white"
                        />
                    }

                    renderItem={
                        ({item, index}) => {
                            return <MoviesItem {...item} goToMoviesDetail={() => navigation.navigate('MoviesDetail', {id: item.id})}/>
                        }
                    }
                />
            </View>
        );
    }
}
