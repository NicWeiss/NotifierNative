import React from 'react';

import { Container, ScreenWrapper } from 'app/components';
import { FlalistWrapper } from 'app/components/lists';
import { NotifyListItem } from 'app/components/listItems';
import { AcceptorsListItem } from 'app/components/listItems';


const NotifyListSampleTab = ({
  list, isLoading, isRefreshing, emptyDataMessage, refreshData, type
}) => {

  handleRenderItem = item => {
    console.log(type);
    if (type == 'notify') {
      return NotifyListItem(item);
    } else if (type == 'acceptors') {
      return AcceptorsListItem(item);
    }
  }

  return (
    <ScreenWrapper
      isTab={true}
      isLoading={isLoading}
      isDataEmpty={list.length === 0}
      emptyDataMessage={emptyDataMessage}
    >
      <Container>
        <FlalistWrapper
          list={list}
          renderItem={handleRenderItem}
          isRefreshing={isRefreshing}
          onRefresh={refreshData}
          isLoading={isLoading}
        />
      </Container>
    </ScreenWrapper>
  );
};

export default NotifyListSampleTab;
