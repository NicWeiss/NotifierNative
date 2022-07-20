import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert } from 'react-native';

import { Container, ScreenWrapper } from 'app/components';
import { FlalistWrapper } from 'app/components/lists';

import CategoryStoreContext from 'app/stores/lists/category';
import CategoryItemContext from 'app/stores/item/category';

import CategoryListItem from './categoryListItem';


const CategoryList = observer(() => {
  const { getlist, isLoading, isRefreshing, refreshData, updateInList, deleteFromList } = useContext(CategoryStoreContext);
  const { changeVisibility, deleteItem } = useContext(CategoryItemContext);

  const emptyDataMessage = 'Список категорий пуст';
  let [extraData] = React.useState(new Date())
  let list = getlist()

  const onChange = (index, item) => {
    updateById(index, item)
    list = getlist()
  }

  const onChangeVisibility = async (index, item) => {
    const newItem = await changeVisibility(item)
    updateInList(index, newItem)
    list = getlist()
  }

  const onDelete = (index, item) => {
    Alert.alert("", `Catedory ${item.name} will be deleted`, [
      {
        text: "Cancel",
        onPress: () => { },
        style: "cancel"
      },
      {
        text: "With",
        onPress: () => deleteCategory(index, item, true)
      },
      {
        text: "Without",
        onPress: () => deleteCategory(index, item, false)
      }
    ]);
  }

  const deleteCategory = async (index, item, withNotify) => {
    await deleteItem(item, withNotify)
    deleteFromList(index)
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
              onDelete={onDelete}
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
