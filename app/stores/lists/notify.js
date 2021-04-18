import React from 'react';
import { action, observable } from 'mobx';

import { Api, ProcessErrors, ValidateResponseData } from 'app/helpers';

import NotifyListItemModel from '../models/notifyListItem';

class NotifyStore {

  @observable isLoading = true
  @observable isRefreshing = false
  @observable list = []

  @action loadData = async () => {
    this.isLoading = true;

    let responce = await this.requestData();
    this.list = responce;

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
      response = await Api.doRequest('GET', '/notifies?page=1&per_page=25');
    } catch (error) {
      ProcessErrors(error);

      return;
    }

    return ValidateResponseData(response.data.notify, NotifyListItemModel);
  }
}

const notifyStore = new NotifyStore();
const NotifyStoreContext = React.createContext(notifyStore);

export default NotifyStoreContext;
