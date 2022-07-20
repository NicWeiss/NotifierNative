import React from 'react';
import { action, observable } from 'mobx';

import { Api, ProcessErrors, ValidateResponseData } from 'app/helpers';

import CategoryModel from '../models/categoryModel';

class CategoryStore {

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

  @action getlist = () => this.list;

  @action updateInList = (index, item) => {
    this.list[index] = item
  }

  @action deleteFromList = (index) => {
    this.list[index] = null
  }

  requestData = async () => {
    let response = null;

    try {
      response = await Api.doRequest('GET', '/categories?page=1&per_page=250');
    } catch (error) {
      ProcessErrors(error);

      return;
    }

    return ValidateResponseData(response.data.category, CategoryModel);
  }
}

const categoryStore = new CategoryStore();
const CategoryStoreContext = React.createContext(categoryStore);

export default CategoryStoreContext;
