import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import OrderListCompletedContext from 'app/stores/orderList/completed';

import OrderListSampleTab from './tabSample';


const OrderListCompletedTab = observer(props => {

  const {
    list, refreshData, loadMoreData,
    isLoading, isRefreshing, isLoadingMore
  } = useContext(OrderListCompletedContext);

  useEffect(() => {
    const { isSelected, multiselectState, changeMultiselectState } = props;

    if (isSelected && !multiselectState.isDisabled) {
      changeMultiselectState({ name: 'completed', isDisabled: true, isVisible: false, isActive: false });
    }
  }, [props.isSelected]);

  return (
    <OrderListSampleTab
      emptyDataMessage='Список завершенных заказов пуст'
      list={list}
      refreshData={refreshData}
      loadMoreData={loadMoreData}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      isLoadingMore={isLoadingMore}
    />
  );
});

export default OrderListCompletedTab;
