import React from 'react';
import { action, observable } from 'mobx';

import { Api, ProcessErrors, ValidateResponseData } from 'app/helpers';

import AcceptorsListItemModel from '../models/acceptorsListItem';

class AcceptorsStore {

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
      response = await Api.doRequest('GET', '/acceptors?page=1&per_page=25');
    } catch (error) {
      ProcessErrors(error);

      return;
    }

    return ValidateResponseData(response.data.acceptor, AcceptorsListItemModel);
  }
}

const acceptorsStore = new AcceptorsStore();
const AcceptorsStoreContext = React.createContext(acceptorsStore);

export default AcceptorsStoreContext;
