import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, Animated, StyleSheet } from 'react-native';

import { Container, ScreenWrapper } from 'app/components';
import { FlalistWrapper } from 'app/components/lists';
import { AwaitableAnimation } from 'app/helpers';

import CategoryStoreContext from 'app/stores/lists/category';
import CategoryItemContext from 'app/stores/item/category';

import CategoryListItem from './categoryListItem';
import CategoryEditModal from '../../CategoryEditModal';
import AddButton from './addButton';


const CategoryList = observer(() => {
  const { list, isLoading, isRefreshing, refreshData, updateInList, deleteFromList, pushToList } = useContext(CategoryStoreContext);
  const { changeVisibility, deleteItem, updateItem, createItem } = useContext(CategoryItemContext);

  let [isShowModal, setIsShowModal] = useState(false)
  let [itemForModal, setItemForModal] = useState({})
  let [itemForModalIndex, setItemForModalIndex] = useState()
  let [modalOpacity] = useState(new Animated.Value(0))

  const emptyDataMessage = 'Список категорий пуст';

  const onChangeVisibility = async (index, item) => {
    const newItem = await changeVisibility(item)
    updateInList(index, newItem)
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
  }

  const onShowEditModal = (index, item) => {
    setItemForModalIndex(index)
    setItemForModal(item)
    setIsShowModal(true)
    AwaitableAnimation(modalOpacity, 1, 150)
  }

  const onHideEditModal = async () => {
    await AwaitableAnimation(modalOpacity, 0, 150)
    setIsShowModal(false)
  }

  const onSaveInModal = async (item) => {
    if (itemForModalIndex) {
      let updatedItem = await updateItem(item)
      updateInList(itemForModalIndex, updatedItem)
    } else {
      let newItem = await createItem(item)
      pushToList(newItem)
    }

    await AwaitableAnimation(modalOpacity, 0, 150)
    setIsShowModal(false)
  }

  const handleCreateNew = async () => {
    onShowEditModal(null, {})
  }

  return (
    <ScreenWrapper
      isTab={true}
      isLoading={isLoading}
      onRefresh={refreshData}
      isRefreshing={isRefreshing}
      isDataEmpty={!list || list.length === 0}
      emptyDataMessage={emptyDataMessage}
    >
      {
        isShowModal ?
          <Animated.View style={[styles.modalWrapper, { opacity: modalOpacity }]}>
            <CategoryEditModal
              item={itemForModal}
              onHide={onHideEditModal}
              onSave={onSaveInModal} />
          </Animated.View> : null
      }
      <Container>
        <FlalistWrapper
          list={list}
          renderItem={({ item, index }) => (
            <CategoryListItem
              item={item}
              index={index}
              onChangeVisibility={onChangeVisibility}
              onDelete={onDelete}
              onEdit={onShowEditModal}
            />
          )}
          isRefreshing={isRefreshing}
          onRefresh={refreshData}
          isLoading={isLoading}
        />
      </Container>
      <AddButton onPress={handleCreateNew} />
    </ScreenWrapper>
  );
});


const styles = StyleSheet.create({
  modalWrapper: {
    zIndex: 80,
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0
  },

});

export default CategoryList;
