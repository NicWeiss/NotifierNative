import React from 'react';

import { Container, ScreenWrapper } from 'app/components';
import { FlalistWrapper } from 'app/components/lists';
import { OrderListItem } from 'app/components/listItems';


const OrderListSampleTab = ({
  list,
  refreshData, loadMoreData,
  isLoading, isRefreshing, isLoadingMore,
  emptyDataMessage,
  isMultiselectActive, selectItem
}) => {

  handleRenderItem = item => OrderListItem(
    item, isMultiselectActive, selectItem
  );

  return (
    <ScreenWrapper
      isTab={true}
      isWithTopPanel={true}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      refreshData={refreshData}
      isDataEmpty={list.length === 0}
      emptyDataMessage={emptyDataMessage}
    >
      <Container>
        <FlalistWrapper
          list={list}
          renderItem={handleRenderItem}
          isRefreshing={isRefreshing}
          onRefresh={refreshData}
          isLoadingMore={isLoadingMore}
          handleLoadMore={loadMoreData}
        />
      </Container>
    </ScreenWrapper>
  );
};

export default OrderListSampleTab;
