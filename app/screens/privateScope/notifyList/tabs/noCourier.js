import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import OrderListNoCourierContext from 'app/stores/orderList/noCourier';

import OrderListSampleTab from './tabSample';


const OrderListNoCourierTab = observer(props => {

  const {
    list, refreshData, loadMoreData,
    isLoading, isRefreshing, isLoadingMore,
    selectItem, deselectAllOrders
  } = useContext(OrderListNoCourierContext);

  useEffect(() => {
    const { isSelected, multiselectState, changeMultiselectState } = props;

    if (isSelected && multiselectState.isDisabled) {
      deselectAllOrders();
      changeMultiselectState({ name: 'noCourier', isDisabled: false, isVisible: false, isActive: false });
    }
  }, [props.isSelected]);

  return (
    <OrderListSampleTab
      emptyDataMessage='Список заказов без курьера пуст'
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

export default OrderListNoCourierTab;
