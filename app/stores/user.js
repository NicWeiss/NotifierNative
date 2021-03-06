import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { action, observable } from 'mobx';

import { Api, PopToLoginScreen, ProcessErrors } from 'app/helpers';

import UserModel from './models/user';


class UserStore {
  @observable isLoading = true;
  @observable isRefreshing = false;
  @observable user = { ...UserModel };


  @action logIn = (login, password) => {

    return Api.doRequest(
      'POST', '/auth/login',
      { data: { 'email': login, 'password': password } }
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

  @action loadData = async () => {
    this.isLoading = true;
    console.log('TRY LOAD');
    await this.requestData();

    this.isLoading = false;
  }

  @action refreshData = async () => {
    this.isRefreshing = true;

    await this.requestData();

    this.isRefreshing = false;
  }

  requestData = async () => {
    let response = null;

    try {
      response = await Api.doRequest('GET', '/user');
    } catch (error) {
      this.logOut();
    }

    console.log(response);

    if (response) {
      const responseUser = response.data;

      this.user = ValidateResponseData(responseUser, UserModel);
      this.user.storageName = this.user.name.replace(' ', '');
    } else {
      ShowToast('Не удалось загрузить данные пользователя');
    }
  }
}

const userStore = new UserStore();
const UserStoreContext = React.createContext(userStore);

export default UserStoreContext;
