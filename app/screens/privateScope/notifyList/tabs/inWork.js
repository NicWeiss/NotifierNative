import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import OrderListInWorkContext from 'app/stores/orderList/inWork';

import OrderListSampleTab from './tabSample';


const OrderListInWorkTab = observer(props => {

  const {
    list, refreshData, loadMoreData,
    isLoading, isRefreshing, isLoadingMore,
    selectItem, deselectAllOrders
  } = useContext(OrderListInWorkContext);

  useEffect(() => {
    const { isSelected, multiselectState, changeMultiselectState } = props;

    if (isSelected && multiselectState.isDisabled) {
      deselectAllOrders();
      changeMultiselectState({ name: 'inWork', isDisabled: false, isVisible: false, isActive: false });
    }
  }, [props.isSelected]);

  return (
    <OrderListSampleTab
      emptyDataMessage='Список находящихся в работе заказов пуст'
      list={list}
      refreshData={refreshData}
      loadMoreData={loadMoreData}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      isLoadingMore={isLoadingMore}
      isMultiselectActive={props.multiselectState.isActive}
      selectItem={selectItem}
    />
  );
});

export default OrderListInWorkTab;
