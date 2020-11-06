import React from 'react';

import NotifyListStoreSample from './storeSample';


class NotifyListNotifyStore extends NotifyListStoreSample {

  constructor(props) {
    super(props);
  }
};


const notifyListNotifyStore = new NotifyListNotifyStore();
const NotifyListNotifyContext = React.createContext(notifyListNotifyStore);

export default NotifyListNotifyContext;
