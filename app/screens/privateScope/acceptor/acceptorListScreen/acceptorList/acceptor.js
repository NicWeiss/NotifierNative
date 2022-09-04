import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, Animated, StyleSheet } from 'react-native';

import { Container, ScreenWrapper } from 'app/components';
import { FlalistWrapper } from 'app/components/lists';
import { AwaitableAnimation } from 'app/helpers';

import AcceptorStoreContext from 'app/stores/lists/acceptor';
import AcceptorItemContext from 'app/stores/item/acceptor';

import AcceptorListItem from './acceptorListItem';
import AcceptorEditModal from '../../AcceptorEditModal';
import AddButton from './addButton';


const AcceptorList = observer(() => {
  const { getlist, isLoading, isRefreshing, refreshData, updateInList, deleteFromList, pushToList } = useContext(AcceptorStoreContext);
  const { changeVisibility, deleteItem, updateItem, createItem } = useContext(AcceptorItemContext);

  let [isShowModal, setIsShowModal] = useState(false)
  let [itemForModal, setItemForModal] = useState({})
  let [itemForModalIndex, setItemForModalIndex] = useState()
  let [modalOpacity] = useState(new Animated.Value(0))

  const emptyDataMessage = 'Список получателей пуст';
  let list = getlist()

  const onChangeVisibility = async (index, item) => {
    const newItem = await changeVisibility(item)
    updateInList(index, newItem)
    list = getlist()
  }

  const onDelete = (index, item) => {
    Alert.alert("", `Acceptor ${item.name} will be deleted`, [
      {
        text: "Cancel",
        onPress: () => { },
        style: "cancel"
      },
      {
        text: "Delete",
        onPress: () => deleteAcceptor(index, item)
      }
    ]);
  }

  const deleteAcceptor = async (index, item) => {
    await deleteItem(item)
    deleteFromList(index)
    list = getlist()
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

    list = getlist()
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
            <AcceptorEditModal
              item={itemForModal}
              onHide={onHideEditModal}
              onSave={onSaveInModal} />
          </Animated.View> : null
      }
      <Container>
        <FlalistWrapper
          list={list}
          renderItem={({ item, index }) => (
            <AcceptorListItem
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

export default AcceptorList;
