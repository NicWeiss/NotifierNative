import axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage';

import { domain, apiPrefix } from '../../env.json';


const baseURL = `${domain}/${apiPrefix}`;


export default class Api {

  static async doRequest(method, url, data = null) {
    const session = await AsyncStorage.getItem('session');

    let headers = {
      'session': session
    };

    if (['PUT', 'POST'].includes(method)) {
      headers['Content-Type'] = 'application/json';
    }

    console.log(headers);
    console.log(method);
    console.log(baseURL);
    console.log(url);
    console.log(data);

    const config = {
      headers, method, baseURL, url,
      ...data
    };

    let answer = axios(config);
    return answer;
  }
};
