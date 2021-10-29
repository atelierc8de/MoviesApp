import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Process cache, storage
 */
export default class UUser {

    /**
     *
     * @param key
     * @param value
     * @returns {Promise<void>}
     */
    static storeUser = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
        }
    };

    /**
     *
     * @param key
     * @param defaultValue
     * @returns {Promise<*>}
     */
    static getUser = async (key, defaultValue = null) => {
        let _return = defaultValue;

        try {
            const value = await AsyncStorage.getItem(key);
            if(value !== null) {
                _return = JSON.parse(value);
            }
            return _return
        } catch(e) {
        }

        return  _return;
    };

    /**
     *
     * @type {{}}
     */
    static cache = {};

    static dataUser = [];


    /**
     *
     * @type {string}
     * @private
     */
    static _token = '';

    /**
     *
     * @param value
     */
    static set token(value) {
        UUser._token = value;
        if (__DEV__) {
            UUser.storeUser('user_token', value).then();
        }
    };

    /**
     *
     * @returns {null|string}
     */
    static get token() {
        return UUser._token;
    };

        /**
     *
     * @type {string}
     * @private
     */
         static _userId = '';

         /**
          *
          * @param value
          */
         static set userId(value) {
             UUser._userId = value;
             if (__DEV__) {
                 UUser.storeUser('user_ID', value).then();
             }
         };
     
         /**
          *
          * @returns {null|string}
          */
         static get userId() {
             return UUser._userId;
         };

}
