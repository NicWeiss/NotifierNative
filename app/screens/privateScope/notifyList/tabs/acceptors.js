import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import AcceptorsStoreContext from 'app/stores/lists/acceptors';

import NotifyListSampleTab from './tabSample';


const NotifyListAcceptorsTab = observer( () => {

  let { list, isLoading, isRefreshing,  refreshData } = useContext(AcceptorsStoreContext);

  return (
    <NotifyListSampleTab
      emptyDataMessage='Список получателей пуст'
      isLoading={isLoading}
      list={list}
      isRefreshing={isRefreshing}
      refreshData={refreshData}
      type='acceptors'
    />
  );
});

export default NotifyListAcceptorsTab;
