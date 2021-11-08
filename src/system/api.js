import axios from "axios";
import Config from "./UConfig";

export default class ServiceBase {

    /**
     *
     * @returns {{headers: {Authorization: string, "Content-Type": string}}}
     */
    static getRequestConfig = () => {

        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Config.token}`
            },
        }
    };

    /**
     *
     * @param endPoint
     * @returns {"https://api.themoviedb.org/3/movie/NA"}
     */
    static url = (endPoint = 'NA') => {
        return `${Config.urlAPI}${endPoint}`
    }

    static urlSearch = (endPoint = 'NA') => {
        return `${Config.urlAPISearch}${endPoint}`
    }

    /**
     *
     * @param endpoint
     * @param cb
     * @param requestConfig
     * @param url
     * @returns {Promise<void>}
     */
    static get = async ({endpoint, cb, requestConfig = ServiceBase.getRequestConfig(), url}) => {

        if (!url) url = ServiceBase.url(endpoint);
        await axios.get(url, endpoint, requestConfig)
            .then(res => {
                console.log('url', url)
                cb && cb(null, res);
                return res;
            })
            .catch(error => {
                cb && cb(error);
            })
    }

    static getSearch = async ({endpoint, cb, requestConfig = ServiceBase.getRequestConfig(), url}) => {

        if (!url) url = ServiceBase.urlSearch(endpoint);
        await axios.get(url, endpoint, requestConfig)
            .then(res => {
                // console.log('urlSearch', url, res?.data)
                cb && cb(null, res);
                return res;
            })
            .catch(error => {
                cb && cb(error);
            })
    }

    /**
     *
     * @param cb
     * @param page
     */
    static getMovieList = ({cb, page = 1}) => {
        ServiceBase.get({endpoint: `popular?api_key=${Config.api_key}&page=${page}`, cb});
    }

    /**
     *
     * @param cb
     * @param id
     */
    static getMovieDetail = ({cb, id}) => {
        ServiceBase.get({endpoint: `${id}?api_key=${Config.api_key}&append_to_response=videos,credits`, cb});
    }

    static searchMovie = ({cb, key}) => {
        ServiceBase.getSearch({endpoint: `api_key=${Config.api_key}&query=${key}`, cb});
    }
    
}
