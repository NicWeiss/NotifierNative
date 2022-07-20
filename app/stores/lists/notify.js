import React from 'react';
import { action, observable } from 'mobx';

import { Api, ProcessErrors, ValidateResponseData } from 'app/helpers';

import NotifyModel from '../models/notifyModel';

class NotifyStore {

  @observable isLoading = true
  @observable isRefreshing = false
  @observable list = []

  @action loadData = async (id = 0) => {
    this.isLoading = true;
    this.lastId = id

    let responce = await this.requestData(id);
    this.list = responce;

    this.isLoading = false;
  }

  @action refreshData = async () => {
    this.isEndOfTheListReached = false;
    this.list = [];
    this.isRefreshing = true;

    let responce = await this.requestData(this.lastId);
    this.list = responce;

    this.isRefreshing = false;
  }

  @action updateListFromDetailView = async (item) => {
    let targetItemId = null;

    this.list.forEach((element, id) => {
      if (item.id == element.id) {
        targetItemId = id;
      }
    });
    this.list[targetItemId] = item;
  }

  @action getlist = () => this.list;

  @action updateById = (index, item) => {
    this.list[index] = item
  }

  requestData = async (id = 0) => {
    let response = null;

    try {
      response = await Api.doRequest('GET', `/notifies?category_id=${id}&page=1&per_page=25`);
    } catch (error) {
      ProcessErrors(error);

      return;
    }

    return ValidateResponseData(response.data.notify, NotifyModel);
  }
}

const notifyStore = new NotifyStore();
const NotifyStoreContext = React.createContext(notifyStore);

export default NotifyStoreContext;
