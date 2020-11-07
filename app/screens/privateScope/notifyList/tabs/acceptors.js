import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import AcceptorsStoreContext from 'app/stores/lists/acceptors';

import NotifyListSampleTab from './tabSample';


const NotifyListAcceptorsTab = observer( () => {

  let { list, isLoading } = useContext(AcceptorsStoreContext);

  return (
    <NotifyListSampleTab
      emptyDataMessage='Список получателей пуст'
      isLoading={isLoading}
      list={list}
    />
  );
});

export default NotifyListAcceptorsTab;
