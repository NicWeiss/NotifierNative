import React from 'react';
import { action, observable } from 'mobx';

import { Api, ProcessErrors, ValidateResponseData } from 'app/helpers';

import NotifyModel from '../models/notifyModel';


class NotifyItemStore {

  @observable isLoading = true
  @observable isRefreshing = false;
  @observable item = []

  @action clear = () => {
    this.item = [];
    this.isRefreshing = false;
    this.isLoading = true;
  }

  @action loadData = async (id) => {
    this.isLoading = true;

    let response = await this.requestData(id);
    this.item = response;

    this.isLoading = false;
  }

  @action changeState = async () => {
    this.item.status = String(this.item.status) == '1' ? '0' : '1';
    let response = await this.updateData();
    this.item = response;

    return this.item;
  }

  @action refreshData = async () => {
    this.isEndOfTheListReached = false;
    this.item = [];
    this.isRefreshing = true;

    let responce = await this.requestData();
    this.item = responce;

    this.isLoading = false;
  }

  @action getItem = () => this.item;

  requestData = async (id) => {
    let response = null;

    try {
      response = await Api.doRequest('GET', '/notifies/' + id);
    } catch (error) {
      ProcessErrors(error);

      return;
    }

    return ValidateResponseData(response.data.notify, NotifyModel);
  }

  updateData = async () => {

    let response = null;

    try {
      response = await Api.doRequest('PUT',
        '/notifies/' + this.item.id,
        {
          data: { notify: this.item }
        });
    } catch (error) {
      ProcessErrors(error);
      return;
    }

    return ValidateResponseData(response.data.notify, NotifyModel);
  }
}

const notifyItemStore = new NotifyItemStore();
const NotifyItemContext = React.createContext(notifyItemStore);

export default NotifyItemContext;
