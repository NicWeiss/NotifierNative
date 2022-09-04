import React from 'react';
import { action } from 'mobx';

import BaseItemStore from './baseItem';
import { Api } from 'app/helpers';

import CategoryModel from '../models/categoryModel';


class CategoryItemStore extends BaseItemStore {

  constructor(props) {
    super(props);

    this.model = CategoryModel;
    this.entity = 'category';
    this.entityInUrl = 'categories'

    // Override deleteItem function
    this.superDeleteItem = this.deleteItem;
    this.deleteItem = this.customDeleteItem;
  }

  @action changeVisibility = async (item) => {
    if (item) {
      this.item = item;
    }

    this.item.is_hidden = this.item.is_hidden == '1' ? '0' : '1';
    await this.query({ method: 'PUT', id: this.item.id, data: this.item });

    return this.item;
  }

  @action customDeleteItem = async (item, withNotify) => {
    if (item) {
      this.item = item;
    }

    if (withNotify) {
      await Api.doRequest('DELETE', '/notifies/delete_by_category_id',
        { 'data': { 'category_id': this.item.id } }
      );
    } else {
      await Api.doRequest('DELETE', '/notifies/reset_from_category_id',
        { 'data': { 'category_id': this.item.id } }
      );
    }

    this.superDeleteItem(this.item);
  };
}

const categoryItemStore = new CategoryItemStore();
const CategoryItemContext = React.createContext(categoryItemStore);

export default CategoryItemContext;
