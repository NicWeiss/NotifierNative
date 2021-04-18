import React from 'react';
import { action, observable } from 'mobx';

import { Api, ProcessErrors, ValidateResponseData } from 'app/helpers';

import NotifyListItemModel from '../models/notifyListItem';


class NotifyItemStore {

  @observable isLoading = true
  @observable isRefreshing = false;
  @observable item = []


  @action loadData = async (id) => {
    this.isLoading = true;

    let responce = await this.requestData(id);
    this.item = responce;

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
      response = await Api.doRequest('GET', '/notifies/' + id);
    } catch (error) {
      ProcessErrors(error);

      return;
    }

    return ValidateResponseData(response.data.notify, NotifyListItemModel);
  }
}

const notifyItemStore = new NotifyItemStore();
const NotifyItemContext = React.createContext(notifyItemStore);

export default NotifyItemContext;
