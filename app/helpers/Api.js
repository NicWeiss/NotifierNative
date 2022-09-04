import axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage';

import { domain, apiPrefix } from '../../env.json';


const baseURL = `${domain}/${apiPrefix}`;


export default class Api {
  static destructure(obj) {
    if ([NaN, null, undefined].includes(obj)) {
      return obj
    }

    if (['string', 'boolean', 'number'].includes(typeof obj)) {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map(element => {
        return this.destructure(element);
      });
    }

    if (typeof obj == 'object') {
      const simpleObj = {};

      for (let key in obj) {
        simpleObj[key] = this.destructure(obj[key]);
      }

      return simpleObj;
    }
  }

  static async doRequest(method, url, data = null) {
    const session = await AsyncStorage.getItem('session') || '';

    let headers = {
      'session': session
    };

    if (['PUT', 'POST'].includes(method)) {
      headers['Content-Type'] = 'application/json';
    }

    // console.log('Headers: ', headers);
    // console.log('Method: ', method);
    // console.log('API url: ', baseURL);
    // console.log('Query url: ', url);

    try {
      data = this.destructure(data)
      // console.log('Data:');
      // console.log(JSON.stringify(data, null, 4));
    } catch (e) {
      console.log(e);
    }

    const config = {
      headers, method, baseURL, url,
      ...data
    };

    let answer = axios(config);
    return answer;
  }
};
