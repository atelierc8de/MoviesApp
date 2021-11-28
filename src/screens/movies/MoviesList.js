import React from 'react';
import { View } from 'react-native-ui-lib';
import { FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { customizeDataMovies } from './CustomizeData';
import { Header } from "../../components/header";
import UServiceBase from "../../system/api";
import { toast } from "../../components/common/Toast/Toast";
import { auth } from '../../../firebaseConfig';
import UUser from '../../system/UUser';
import ListViewLogicExt from "../../components/common/ListViewLogicExt";
import { TextTitle } from "../../components/common/Styled";
import { MoviesItem } from './movies-component';


export default class MoviesList extends ListViewLogicExt {

    /**
     *
     */
    componentDidMount() {
        this.getDataMovie();
    }

    /**
     *
     */
    getDataMovie = () => {
        this.setState({ isLoading: true });
        if (this.state.page <= this.pageMax) {
            UServiceBase.getMovieList({
                page: this.state.page,
                cb: (err, res) => {
                    if (!err) {
                        const result = res?.data?.results;
                        this.setState({
                            data: this.state.data.concat(result),
                            isLoading: false
                        });
                    } else {
                        toast('error!');
                    }
                }
            });

            this.onGetUserID();
        } else {
            toast('No page to be found!');
        }

    };

    handleLoadMore = () => {
        if (this.state.page <= this.pageMax) {
            this.setState({ page: this.state.page + 1, isLoading: true }, this.getDataMovie);
        } else {
            toast('There are no more any page to load')
        }

    }

    handleRefresh = () => {
        this.setState({ page: 1, data: [] }, this.getDataMovie);
    }

    onGetUserID = () => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                UUser.userId = user.uid
            } else {
                toast('error!');
            }
        });
    };

    onSearch = (textSearch) => {
        this.setState({ textSearch });
        if (textSearch.length > 0) {
            UServiceBase.searchMovie({
                key: textSearch,
                cb: (err, res) => {
                    if (!err) {
                        const result = res?.data?.results;
                        this.setState({
                            data: result,
                            isLoading: false
                        });

                    } else {
                        toast('error!');
                    }
                }
            })
        } else {
            UServiceBase.getMovieList({
                page: this.state.page,
                cb: (err, res) => {
                    if (!err) {
                        const result = res?.data?.results;
                        this.setState({
                            data: result,
                            isLoading: false
                        });
                    } else {
                        toast('error!');
                    }
                }
            });
        }

    }



    render() {

        const { data, textSearch, isLoading } = this.state;
        const { navigation } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <Header value={textSearch} onChangeText={(textSearch) => this.onSearch(textSearch)} />
                <TextTitle>Popular</TextTitle>
                <FlatList
                    style={{ paddingHorizontal: 20 }}
                    data={customizeDataMovies(data)}
                    keyExtractor={(item, index) => item.id.toString()}
                    ListHeaderComponent={() => <View style={{ height: 30 }} />}
                    ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
                    ListFooterComponent={isLoading ? () => <ActivityIndicator size="large" animating={true} color={'red'} style={{ paddingVertical: 10 }} /> : () => <View style={{ height: 30 }} />}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={1}
                    extraData={data}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                            progressBackgroundColor="white"
                        />
                    }

                    renderItem={
                        ({ item, index }) => {
                            return <MoviesItem {...item} goToMoviesDetail={() => navigation.navigate('MoviesDetail', { id: item.id })} />
                        }
                    }
                />
            </View>
        );
    }
}
