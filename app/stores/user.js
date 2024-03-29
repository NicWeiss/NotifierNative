import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { action, observable } from 'mobx';
import DeviceInfo from 'react-native-device-info'

import { Api, PopToLoginScreen, ProcessErrors, ShowToast } from 'app/helpers';

import UserModel from './models/user';


class UserStore {
  @observable isLoading = false;
  @observable isRefreshing = false;
  @observable user = { ...UserModel };


  @action logIn = (login, password) => {
    return Api.doRequest(
      'POST', '/auth/login',
      {
        data: {
          'email': login,
          'password': password,
          'is_from_mobile': true,
          'client': this.getInfoAboutDevice(),
        }
      }
    );
  }

  getInfoAboutDevice = () => {
    return {
      "client": 'Mobile client',
      "version": DeviceInfo.getVersion(),
      "mobile": true,
      "os": DeviceInfo.getSystemName(),
      "osVersion": DeviceInfo.getSystemVersion()
    }
  }

  @action checkSession = (session) => {
    return Api.doRequest(
      'GET', '/sessions',
      { data: {} }
    );
  }

  @action clearSession = async () => {
    try {
      await AsyncStorage.removeItem('login');
      await AsyncStorage.removeItem('session');
    } catch (error) {
      ProcessErrors(error);
    }
  }

  @action logOut = async () => {
    await this.clearSession()
    PopToLoginScreen();
  }

  @action loadData = async () => {
    this.isLoading = true;

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

    if (response) {
      const responseUser = response.data;

      this.user = ValidateResponseData(responseUser, UserModel);
      this.user.storageName = this.user.name.replace(' ', '');
    } else {
      ShowToast('Failed to load user data');
    }
  }

  getCode = async (email) => {
    this.isLoading = true;

    try {
      await Api.doRequest('POST', '/auth/get_code', {
        data: {
          'email': email,
        }
      });
    } catch (error) {
      this.isLoading = false;

      if (error.response.status == 403) {
        ShowToast('Code already sended');
        return;
      }

      if (error.response.status == 422) {
        ShowToast('Email is busy');
        return
      }

      ShowToast('Error on server');
      return;
    }

    ShowToast('Code sended');
    this.isLoading = false;
  }

  completeRegistration = async (data) => {
    this.isLoading = true;
    let response = null;

    try {
      response = await Api.doRequest('POST', '/auth/sign_up', { data });
    } catch (error) {
      if (error.response.status == 403) {
        this.isLoading = false;
        ShowToast('Code is wrong or outdated');
        return;
      }

      if (error.response.status == 422) {
        ShowToast('Email is busy');
        return
      }

      ShowToast('Error on server');
      return;
    }

    this.isLoading = false;
    return response.data
  }
}

const userStore = new UserStore();
const UserStoreContext = React.createContext(userStore);

export default UserStoreContext;
