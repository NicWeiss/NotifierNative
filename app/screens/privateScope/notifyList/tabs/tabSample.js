import React from 'react';

import { Container, ScreenWrapper } from 'app/components';
import { FlalistWrapper } from 'app/components/lists';
import { NotifyListItem } from 'app/components/listItems';


const NotifyListSampleTab = ({
  list, isLoading, isRefreshing, emptyDataMessage
}) => {

  handleRenderItem = item => NotifyListItem(item);

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
          isLoading={isLoading}
        />
       </Container>
     </ScreenWrapper>
  );
};

export default NotifyListSampleTab;
