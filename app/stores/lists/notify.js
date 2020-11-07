import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { action, observable, makeAutoObservable } from 'mobx';

import { Api, ProcessErrors, ValidateResponseData } from 'app/helpers';

import NotifyListItemModel from '../models/notifyListItem';

class NotifyStore {

  @observable isLoading = true
  @observable list = []

  constructor() {
    makeAutoObservable(this);
  }

  @action loadData = async () => {
    this.isLoading = true;
    console.log('START LOAD');

    let responce = await this.requestData();
    this.list = responce;
    console.log('FINISH LOAD');
    this.isLoading = false;
  }

  @action refreshData = async () => {
    this.isEndOfTheListReached = false;
    this.list = [];
    this.isRefreshing = true;

    let responce = await this.requestData();
    this.list = responce;

    this.isRefreshing = false;
  }

  requestData = async () => {
    let response = null;

    try {
      response = await Api.doRequest('GET', '/notify');
    } catch (error) {
      ProcessErrors(error);

      return;
    }

    // const responseNotify = processOrders(
    //   response.data.orders
    // );
    return ValidateResponseData(response.data.notify, NotifyListItemModel);
  }
}

const notifyStore = new NotifyStore();
const NotifyStoreContext = React.createContext(notifyStore);

export default NotifyStoreContext;
