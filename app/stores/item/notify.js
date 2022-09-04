import React from 'react';
import { action } from 'mobx';

import BaseItemStore from './baseItem';
import NotifyModel from '../models/notifyModel';


class NotifyItemStore extends BaseItemStore {

  constructor(props) {
    super(props);

    this.model = NotifyModel;
    this.entity = 'notify';
    this.entityInUrl = 'notifies'
  }

  @action changeState = async () => {
    this.item.status = String(this.item.status) == '1' ? '0' : '1';
    let response = await this.query({ method: 'PUT', id: this.item.id, data: this.item });
    this.item = response;

    return this.item;
  }
}

const notifyItemStore = new NotifyItemStore();
const NotifyItemContext = React.createContext(notifyItemStore);

export default NotifyItemContext;
