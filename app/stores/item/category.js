import React from 'react';
import { action, observable } from 'mobx';

import { Api, ProcessErrors, ValidateResponseData } from 'app/helpers';

import CategoryModel from '../models/categoryModel';


class CategoryItemStore {

  @observable isLoading = true
  @observable isRefreshing = false;
  @observable item = []

  @action getItem = () => this.item;

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


  @action deleteItem = async (item, withNotify) => {
    if (item) {
      this.item = item;
    }

    this.deleteData(withNotify)
  };

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

  deleteData = async (withNotify = false) => {
    try {
      if (withNotify) {
        await Api.doRequest('DELETE', '/notifies/delete_by_category_id',
          { 'data': { 'category_id': this.item.id } }
        );
      } else {
        await Api.doRequest('DELETE', '/notifies/reset_from_category_id',
          { 'data': { 'category_id': this.item.id } }
        );
      }

      await Api.doRequest('DELETE', '/categories/' + this.item.id);
    } catch (error) {
      ProcessErrors(error);
    }
  }
}

const categoryItemStore = new CategoryItemStore();
const CategoryItemContext = React.createContext(categoryItemStore);

export default CategoryItemContext;
