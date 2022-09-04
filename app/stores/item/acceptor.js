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

    this.item.status = this.item.status == '1' ? '0' : '1';
    let response = await this.query({ method: 'PUT', id: this.item.id, data: this.item });
    this.item = response;

    return this.item;
  }
}

const acceptorItemStore = new AcceptorItemStore();
const AcceptorItemContext = React.createContext(acceptorItemStore);

export default AcceptorItemContext;
