import React from 'react';

import BaseList from './baseList';
import CategoryModel from '../models/categoryModel';

class CategoryStore extends BaseList {

  constructor(props) {
    super(props);

    this.model = CategoryModel;
    this.entity = 'category';
    this.entityInUrl = 'categories'
  }
}

const categoryStore = new CategoryStore();
const CategoryStoreContext = React.createContext(categoryStore);

export default CategoryStoreContext;
