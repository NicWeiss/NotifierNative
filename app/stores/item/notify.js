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
    this.item.is_disabled = this.item.is_disabled == false ? true : false;
    await this.query({ method: 'PUT', id: this.item.id, data: this.item });

    return this.item;
  }
}

const notifyItemStore = new NotifyItemStore();
const NotifyItemContext = React.createContext(notifyItemStore);

export default NotifyItemContext;
