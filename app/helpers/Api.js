import axios from 'axios';
// import CryptoJS from 'crypto-js';

import AsyncStorage from '@react-native-community/async-storage';

import { domain, apiPrefix } from '../../env.json';


const baseURL = `${domain}/${apiPrefix}`;

// const getSignature = async (method, secret, url, data) => {
//   const message = `${method}${domain}/${apiPrefix}${url}${data !== null ? JSON.stringify(data.data) : ''}`;

//   return CryptoJS.HmacMD5(message, secret).toString();
//   // return 'wefrwerfwerfwe';
// };


export default class Api {

  static async doRequest(method, url, data = null) {
    const login = await AsyncStorage.getItem('login');
    const session = await AsyncStorage.getItem('session');
    const secret = await AsyncStorage.getItem('secret');

    if (data !== null && data.params) {
      if (!data.params.search_query) {
        delete data.params.search_query;
      }

      const paramsKeys = Object.keys(data.params);

      if (paramsKeys.length) {
        paramsKeys.forEach((key, index) => {
          url += `${index === 0 ? '?' : '&'}${key}=${data.params[key]}`;
        });

        data = null;
      }
    }

    let signature = '';

    // try {
    //   signature = await getSignature(method, secret, url, data)
    // } catch (error) {
    //   console.log('Ошибка при подписи запроса: ', error);
    // }

    let headers = {
      'Authorization': login,
      'X-HMAC-Signature': signature,
      'session': session
    };

    if (['PUT', 'POST'].includes(method)) {
      headers['Content-Type'] = 'application/json';
    }

    const config = {
      headers, method, baseURL, url,
      ...data
    };

    return axios(config);
  }
};
