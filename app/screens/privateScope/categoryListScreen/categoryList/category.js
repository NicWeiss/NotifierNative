import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Container, ScreenWrapper } from 'app/components';
import { FlalistWrapper } from 'app/components/lists';

import CategoryStoreContext from 'app/stores/lists/category';
import CategoryItemContext from 'app/stores/item/category';

import CategoryListItem from './categoryListItem';


const CategoryList = observer(() => {
  const { getlist, isLoading, isRefreshing, refreshData, updateById } = useContext(CategoryStoreContext);
  const { changeVisibility } = useContext(CategoryItemContext);

  const emptyDataMessage = 'Список категорий пуст';
  const [extraData] = React.useState(new Date())
  let list = getlist()

  const onChange = (index, item) => {
    updateById(index, item)
    list = getlist()
  }

  const onChangeVisibility = async (index, item) => {
    const newItem = await changeVisibility(item)
    updateById(index, newItem)
    list = getlist()
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
            <CategoryListItem
              item={item}
              index={index}
              onChange={onChange}
              onChangeVisibility={onChangeVisibility}
            />
          )}
          isRefreshing={isRefreshing}
          onRefresh={refreshData}
          isLoading={isLoading}
          extraData={extraData}
        />
      </Container>
    </ScreenWrapper>
  );
});

export default CategoryList;
