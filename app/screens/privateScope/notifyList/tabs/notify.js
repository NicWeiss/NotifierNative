import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

// import OrderListCompletedContext from 'app/stores/orderList/completed';

import NotifyListSampleTab from './tabSample';


const NotifyListNotifyTab = observer(props => {

  // const {
  //   list, refreshData, loadMoreData,
  //   isLoading, isRefreshing, isLoadingMore
  // } = useContext(OrderListCompletedContext);

  return (
    <NotifyListSampleTab
      emptyDataMessage='Список уведомлений пуст'
      // list={list}
    />
  );
});

export default NotifyListNotifyTab;
