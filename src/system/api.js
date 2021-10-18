import axios from "axios";
import UConfig from "./config";


export default class UServiceBase {


    static getRequestConfig = () => {

        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${UConfig.token}`
            },
        }
    };


    static url = (endPoint = 'NA') => {
        return `${UConfig.urlAPI}${endPoint}`
    }

    static get = async ({ endpoint, cb, requestConfig = UServiceBase.getRequestConfig(), url }) => {

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
    static getMovieList = ({ cb, page=1 }) => {
        UServiceBase.get({ endpoint: `popular?api_key=${UConfig.api_key}&page=${page}`, cb });
    }

    static getMovieDetail = ({ cb, id }) => {
        UServiceBase.get({ endpoint: `${id}?api_key=${UConfig.api_key}`, cb });
    }

}


