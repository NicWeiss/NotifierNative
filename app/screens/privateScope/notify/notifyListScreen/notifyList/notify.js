import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Container, ScreenWrapper } from 'app/components';
import { FlalistWrapper } from 'app/components/lists';
import NotifyStoreContext from 'app/stores/lists/notify';
import { NavigateTo } from 'app/helpers';

import NotifyListItem from './notifyListItem';
import AddButton from './addButton';


const NotifyList = observer(({ onRefresh }) => {
  let [extraData, setExtraData] = useState(new Date())
  let { list, isLoading, isRefreshing, refreshData, updateById } = useContext(NotifyStoreContext);
  const emptyDataMessage = 'List of notifications is empty';

  const handleRefresh = () => {
    refreshData();
    onRefresh();
    setExtraData(new Date())
  }

  const onChange = async (index, item) => {
    await updateById(index, item)
    handleRefresh()
  }

  const handleCreateNew = () => NavigateTo('NotifyEdit', {
    notifyId: null,
    onchange: onChange
  });


  return (
    <ScreenWrapper
      isTab={true}
      isLoading={isLoading}
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
      isDataEmpty={!list || list.length === 0}
      emptyDataMessage={emptyDataMessage}
      emptyDataButton={AddButton}
      onEmptyDataButtonPress={handleCreateNew}
    >
      <Container>
        <FlalistWrapper
          list={list}
          renderItem={({ item, index }) => (
            <NotifyListItem item={item} index={index} onChange={onChange} handleRefresh={handleRefresh} />
          )}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          isLoading={isLoading}
          extraData={extraData}
        />
      </Container>
      <AddButton onPress={handleCreateNew} />
    </ScreenWrapper>
  );
});

export default NotifyList;
