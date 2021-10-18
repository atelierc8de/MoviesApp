import axios from "axios";
import UConfig from "./config";


export default class UServiceBase {

    /**
     *
     * @returns {{headers: {Authorization: string, "Content-Type": string}}}
     */
    static getRequestConfig = () => {

        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${UConfig.token}`
            },
        }
    };

    /**
     *
     * @param endPoint
     * @returns {"https://api.themoviedb.org/3/movie/NA"}
     */
    static url = (endPoint = 'NA') => {
        return `${UConfig.urlAPI}${endPoint}`
    }

    /**
     *
     * @param endpoint
     * @param cb
     * @param requestConfig
     * @param url
     * @returns {Promise<void>}
     */
    static get = async ({endpoint, cb, requestConfig = UServiceBase.getRequestConfig(), url}) => {

        if (!url) url = UServiceBase.url(endpoint);
        await axios.get(url, endpoint, requestConfig)
            .then(res => {
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
        UServiceBase.get({endpoint: `popular?api_key=${UConfig.api_key}&page=${page}`, cb});
    }

    /**
     *
     * @param cb
     * @param id
     */
    static getMovieDetail = ({cb, id}) => {
        UServiceBase.get({endpoint: `${id}?api_key=${UConfig.api_key}`, cb});
    }

}


