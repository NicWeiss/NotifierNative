import React from 'react';
import { action } from 'mobx';

import BaseItemStore from './baseItem';
import AcceptorModel from '../models/acceptorModel';


class AcceptorItemStore extends BaseItemStore {

  constructor(props) {
    super(props);

    this.model = AcceptorModel;
    this.entity = 'acceptor';
    this.entityInUrl = 'acceptors'
  }

  @action changeVisibility = async (item) => {
    if (item) {
      this.item = item;
    }

    this.item.is_disabled = this.item.is_disabled == false ? true : false;
    await this.query({ method: 'PUT', id: this.item.id, data: this.item });

    return this.item;
  }
}

const acceptorItemStore = new AcceptorItemStore();
const AcceptorItemContext = React.createContext(acceptorItemStore);

export default AcceptorItemContext;
