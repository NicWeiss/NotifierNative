import React from 'react';
import { action, observable } from 'mobx';

import { Api, ProcessErrors, ValidateResponseData } from 'app/helpers';

import CategoryModel from '../models/categoryModel';


class CategoryItemStore {

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

  @action changeVisibility = async (item) => {
    if (item) {
      this.item = item;
    }

    this.item.is_hidden = this.item.is_hidden == '1' ? '0' : '1';
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
      response = await Api.doRequest('GET', '/categories/' + id);
    } catch (error) {
      ProcessErrors(error);

      return;
    }

    return ValidateResponseData(response.data.category, CategoryModel);
  }

  updateData = async () => {

    let response = null;

    try {
      response = await Api.doRequest('PUT',
        '/categories/' + this.item.id,
        {
          data: { category: this.item }
        });
    } catch (error) {
      ProcessErrors(error);
      return;
    }

    return ValidateResponseData(response.data.category, CategoryModel);
  }
}

const categoryItemStore = new CategoryItemStore();
const CategoryItemContext = React.createContext(categoryItemStore);

export default CategoryItemContext;
