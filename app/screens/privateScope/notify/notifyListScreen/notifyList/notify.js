import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Container, ScreenWrapper } from 'app/components';
import { FlalistWrapper } from 'app/components/lists';
import NotifyStoreContext from 'app/stores/lists/notify';

import NotifyListItem from './notifyListItem';


const NotifyList = observer(({ onRefresh }) => {
  let { getlist, isLoading, isRefreshing, refreshData, updateById } = useContext(NotifyStoreContext);
  const emptyDataMessage = 'Список уведомлений пуст';

  const [extraData, setExtraData] = React.useState(new Date())

  let list = getlist()
  const onChange = (index, item) => {
    updateById(index, item)
    list = getlist()
    // setExtraData(new Date())
  }

  const handleRefresh = () => {
    refreshData();
    onRefresh();
  }

  return (
    <ScreenWrapper
      isTab={true}
      isLoading={isLoading}
      isDataEmpty={!list || list.length === 0}
      emptyDataMessage={emptyDataMessage}
    >
      <Container>
        <FlalistWrapper
          list={list}
          renderItem={({ item, index }) => (
            <NotifyListItem item={item} index={index} onChange={onChange} />
          )}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          isLoading={isLoading}
          extraData={extraData}
        />
      </Container>
    </ScreenWrapper>
  );
});

export default NotifyList;
