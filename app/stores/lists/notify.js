import React from 'react';
import { action } from 'mobx';

import BaseListItem from './baseListItem';
import NotifyModel from '../models/notifyModel';

class NotifyStore extends BaseListItem {

  constructor(props) {
    super(props);

    this.model = NotifyModel;
    this.entity = 'notify';
    this.entityInUrl = 'notifies'
  }

  @action loadData = async (id = 0) => {
    this.queryParamas.category_id = id;
    this.isLoading = true;
    this.lastId = id

    this.requestData(id);
  }
}

const notifyStore = new NotifyStore();
const NotifyStoreContext = React.createContext(notifyStore);

export default NotifyStoreContext;
