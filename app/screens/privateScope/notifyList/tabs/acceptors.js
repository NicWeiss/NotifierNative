import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

// import OrderListCompletedContext from 'app/stores/orderList/completed';

import NotifyListSampleTab from './tabSample';


const NotifyListAcceptorsTab = observer(props => {

  // const {
  //   list, refreshData, loadMoreData,
  //   isLoading, isRefreshing, isLoadingMore
  // } = useContext(OrderListCompletedContext);


  return (
    <NotifyListSampleTab
      emptyDataMessage='Список получателей пуст'
      // list={list}
      // refreshData={refreshData}
      // loadMoreData={loadMoreData}
      // isLoading={isLoading}
      // isRefreshing={isRefreshing}
      // isLoadingMore={isLoadingMore}
    />
  );
});

export default NotifyListAcceptorsTab;
