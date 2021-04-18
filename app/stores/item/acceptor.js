import React from 'react';
import { action, observable } from 'mobx';

import { Api, ProcessErrors, ValidateResponseData } from 'app/helpers';

import AcceptorListItemModel from '../models/acceptorsListItem';


class AcceptorItemStore {

  @observable isLoading = true
  @observable isRefreshing = false;
  @observable item = []


  @action loadData = async (id) => {
    this.isLoading = true;

    let responce = await this.requestData(id);
    if (responce) {
      this.item = responce;
      this.isLoading = false;
    }
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
      response = await Api.doRequest('GET', '/acceptors/' + id);
    } catch (error) {
      ProcessErrors(error);
      console.log('ERROR -------->>>>>>', error);
      return;
    }
    console.log('DATA ---------------------->', response.data.acceptor);
    return ValidateResponseData(response.data.acceptor, AcceptorListItemModel);
  }
}

const acceptorItemStore = new AcceptorItemStore();
const AcceptorItemContext = React.createContext(acceptorItemStore);

export default AcceptorItemContext;
