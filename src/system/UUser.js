import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Process cache, storage
 */
export default class UUser {

    static initDataFromStorage = async (cb) => {
        UUser._userId = await UUser.getUser('user_ID', null);
        cb();
    };

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
            if (value !== null) {
                _return = JSON.parse(value);
            }
            return _return
        } catch (e) {
        }

        console.log('_return', _return);

        return _return;
    };

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
        UUser.storeUser('user_ID', value).then();
    };

    /**
     *
     * @returns {null|string}
     */
    static get userId() {
        return UUser._userId;
    };

}
