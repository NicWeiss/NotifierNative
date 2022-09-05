import React from 'react';

import BaseList from './baseList';
import SystemModel from '../models/systemModel';

class SystemStore extends BaseList {

  constructor(props) {
    super(props);

    this.model = SystemModel;
    this.entity = 'system';
    this.entityInUrl = 'systems'
  }
}

const sysstemStore = new SystemStore();
const SystemStoreContext = React.createContext(sysstemStore);

export default SystemStoreContext;
