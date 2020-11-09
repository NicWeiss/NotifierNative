import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import NotifyStoreContext from 'app/stores/lists/notify';

import NotifyListSampleTab from './tabSample';


const NotifyListNotifyTab = observer( () => {

  let { list, isLoading, isRefreshing,  refreshData } = useContext(NotifyStoreContext);

  return (
    <NotifyListSampleTab
      emptyDataMessage='Список уведомлений пуст'
      isLoading={isLoading}
      list={list}
      isRefreshing={isRefreshing}
      refreshData={refreshData}
      type='notify'
    />
  );
});

export default NotifyListNotifyTab;
