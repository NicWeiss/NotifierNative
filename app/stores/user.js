import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { action, observable } from 'mobx';

import { Api, PopToLoginScreen, ProcessErrors } from 'app/helpers';

import UserModel from './models/user';


class UserStore {
  @observable isLoading = true
  @observable isRefreshing = false
  @observable user = { ...UserModel }

  @action logIn = (login, password) => {

    return Api.doRequest(
      'POST', '/auth/login',
      { data: {'email': login, 'password': password} }
    );
  }

  @action logOut = async () => {

    try {
      await AsyncStorage.removeItem('login');
      await AsyncStorage.removeItem('session');
    } catch (error) {
      ProcessErrors(error);
    }

    PopToLoginScreen();
  }
}

const userStore = new UserStore();
const UserStoreContext = React.createContext(userStore);

export default UserStoreContext;
