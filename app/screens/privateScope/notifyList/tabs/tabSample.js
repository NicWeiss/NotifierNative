import React from 'react';
import { Text } from 'react-native';

import { Container, ScreenWrapper } from 'app/components';
import { FlalistWrapper } from 'app/components/lists';
import react from 'react';
// import { NotifyListItem } from 'app/components/listItems';


const NotifyListSampleTab = ({
  // list,
  // refreshData, loadMoreData,
  // isLoading, isRefreshing, isLoadingMore,
  emptyDataMessage
}) => {

  // handleRenderItem = item => NotifyListItem(item);

  return (
    <ScreenWrapper
      isTab={true}
      emptyDataMessage={emptyDataMessage}
    >
       <Container>
         {/* <FlalistWrapper
          list={list}
          renderItem={handleRenderItem}
          isRefreshing={isRefreshing}
          onRefresh={refreshData}
          isLoadingMore={isLoadingMore}
          handleLoadMore={loadMoreData}
        /> */}
       </Container>
     </ScreenWrapper>
  );
};

export default NotifyListSampleTab;
