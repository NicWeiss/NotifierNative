import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { getUniqueId } from 'react-native-device-info';
import { action, observable } from 'mobx';

import { Api, PopToLoginScreen, ProcessErrors, ShowToast, ValidateResponseData } from 'app/helpers';

import UserModel from './models/user';


class UserStore {
  @observable isLoading = true
  @observable isRefreshing = false
  @observable user = { ...UserModel }

  @action logIn = login => {
    const device_id = getUniqueId();

    return Api.doRequest(
      'POST', '/login',
      { data: { device_id, login } }
    );
  }

  @action logOut = async () => {
    try {
      await Api.doRequest('POST', '/logout');
    } catch (error) {
      ProcessErrors(error);
    }

    try {
      await AsyncStorage.removeItem('login');
      await AsyncStorage.removeItem('secret');
    } catch (error) {
      ProcessErrors(error);
    }

    PopToLoginScreen();
  }

  @action loadData = async () => {
    this.isLoading = true;

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
      response = await Api.doRequest('GET', '/courier');
    } catch (error) {
      this.logOut();
    }

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
