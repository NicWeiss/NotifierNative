import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { action, observable, makeAutoObservable } from 'mobx';

import { Api, ProcessErrors, ValidateResponseData } from 'app/helpers';

import NotifyListItemModel from '../models/notifyListItem';

class NotifyItemStore {

  @observable isLoading = true
  @observable item = []

  constructor() {
    // makeAutoObservable(this);
  }

  @action loadData = async (id) => {
    this.isLoading = true;
    console.log('START LOAD' , id);

    let responce = await this.requestData(id);
    this.item = responce;

    console.log('FINISH LOAD');
    this.isLoading = false;
  }

  @action refreshData = async () => {
    this.isEndOfTheListReached = false;
    this.item = [];
    this.isRefreshing = true;

    let responce = await this.requestData();
    this.item = responce;

    this.isRefreshing = false;
  }

  requestData = async (id) => {
    let response = null;

    try {
      response = await Api.doRequest('GET', '/notify/' + id);
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

const notifyItemStore = new NotifyItemStore();
const NotifyItemContext = React.createContext(notifyItemStore);

export default NotifyItemContext;
