import React from 'react';

import BaseList from './baseList';
import AcceptorModel from '../models/acceptorModel';

class AcceptorsStore extends BaseList {

  constructor(props) {
    super(props);

    this.model = AcceptorModel;
    this.entity = 'acceptor';
    this.entityInUrl = 'acceptors'
  }
}

const acceptorsStore = new AcceptorsStore();
const AcceptorsStoreContext = React.createContext(acceptorsStore);

export default AcceptorsStoreContext;
