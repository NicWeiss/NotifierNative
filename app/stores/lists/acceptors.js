import React from 'react';
import { action, observable, makeAutoObservable } from 'mobx';

import { Api, ProcessErrors, ValidateResponseData } from 'app/helpers';

import AcceptorsListItemModel from '../models/acceptorsListItem';

class AcceptorsStore {

  @observable isLoading = true
  @observable list = []

  constructor() {
    // makeAutoObservable(this);
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
      response = await Api.doRequest('GET', '/acceptor');
    } catch (error) {
      ProcessErrors(error);

      return;
    }

    // const responseNotify = processOrders(
    //   response.data.orders
    // );
    return ValidateResponseData(response.data.acceptor, AcceptorsListItemModel);
  }
}

const acceptorsStore = new AcceptorsStore();
const AcceptorsStoreContext = React.createContext(acceptorsStore);

export default AcceptorsStoreContext;
