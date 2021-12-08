import { Component } from 'react';
import UData from "../../system/UData";
const _ = require("lodash");

/**
 * Process almost logic for a list view connect to api, has refresh, load more, remove data duplicate
 */
export default class ListViewLogicExt extends Component {

    /**
     *
     * @type {number}
     */
    PAGE_MAX = 1000;
    PAGE_MIN = 1;

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false, // for RefreshControl only, used in flat list
            data: [], // list data
            isWaiting: false, // for show loading indication, normal in show in tab bar

            istFavorite: [],
            isAddFavorite: false,

            textSearch: '', // for display in text input only
            searchCount: 0,  // for display in result description
            showResultDescription: false,  // show/hide the result description
            page: 1,
            isLoading: false,
            isAddToast: false,
            docID: '',
            disable: false,
        };

        this.isCMounted = false; // for setState is safe

        this.loading = false; // for prevent call api two time with one paras only

        this.pageCurrent = 1; // for know position current to prepare for load more

        this.pageMax = this.PAGE_MAX; // maximum pages to display in list view, also variable detect ending page to lock load more

        this.pageMin = this.PAGE_MIN;

        this.getDataFunc = () => { }; // service get data function, to get data from api

        this.customizeDataFunc = () => { }; // function to adjust data before displaying

        this.alias = 'NA'; // for store data

        this.allowCacheData = false; // yes/no data storing, should use in list view on the Projects List Screen

        this.totalCount = 0; // for search only

        this.isSearch = false;

        this.textSearch = '';

        this.listMore = [];

        this.disable = false;


    }

    /**
     * DidMount do after constructor
     */


    /**
     *
     */
    getData = () => {

        // this.loadDataError = false;

        if ((this.pageCurrent < this.pageMax) && !this.loading) {

            this.loading = true;

            if (this.isSearch)
                this.getDataFunc(this.pageCurrent, this.afterLoadData, this.textSearch);
            else
                this.getDataFunc(this.pageCurrent, this.afterLoadData);
        }

    };

    /**
     *
     * @param isSuccess
     * @param res
     */
    afterLoadData = (isSuccess, res) => {

        if (isSuccess) {

            // get totalCount for search
            if (this.isSearch && (this.pageCurrent === 0) && res.headers['x-total-count']) {

                this.setState(
                    {
                        searchCount: res.headers['x-total-count'],
                        showResultDescription: true,
                        textSearchInResultDescription: this.textSearch
                    }
                );

            }

            if (res.data.length === 0) {

                this.pageMax = this.pageCurrent;

                if (this.allowCacheData && UData.cache[this.alias])
                    UData.cache[this.alias].pageMax = this.pageMax;

                if (this.pageCurrent === 0) { // only update project in favourite when

                    if (this.allowCacheData && UData.cache[this.alias])
                        UData.cache[this.alias] = { data: [], pageCurrent: this.pageCurrent, pageMax: this.pageMax };

                    if (this.isCMounted)
                        this.setState({ data: [] });
                }

            }
            else {
                let data = this.customizeData(res.data);

                if (this.pageCurrent !== 0) {

                    data = [...this.state.data, ...data];

                    data = _.uniqBy(data, 'id'); // remove item duplicate
                }


                if (this.allowCacheData && UData.cache[this.alias])
                    UData.cache[this.alias] = { data, pageCurrent: this.pageCurrent, pageMax: this.pageMax };

                if (this.isCMounted)
                    this.setState({ data });

                this.pageCurrent++;
            }
        }
        else {
            // this.loadDataError = true;
        }

        this.loading = false;
    };

    /**
     *
     * @param data
     */
    customizeData = (data) => {
        return this.customizeDataFunc(data);
    };

    /**
     * loadFirstPage used after init UI list view or refresh data by user
     */
    loadFirstPage = () => {

        if (!this.loading) { // IMPORTANCE

            this.pageCurrent = 0;

            this.pageMax = this.PAGE_MAX;

            this.getData();
        }
    };

    /**
     * loadMore called by flat list when user scroll to end of scroll view
     */
    loadMore = () => {
        this.getData();
    };
}
