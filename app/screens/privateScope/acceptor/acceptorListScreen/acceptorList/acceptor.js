import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, Animated, StyleSheet } from 'react-native';

import { Container, ScreenWrapper } from 'app/components';
import { FlalistWrapper } from 'app/components/lists';
import { AwaitableAnimation } from 'app/helpers';

import AcceptorStoreContext from 'app/stores/lists/acceptor';
import AcceptorItemContext from 'app/stores/item/acceptor';

import AcceptorListItem from './acceptorListItem';
import SystemStoreContext from 'app/stores/lists/system';
import AcceptorEditModal from '../../AcceptorEditModal';
import AddButton from './addButton';


const AcceptorList = observer(() => {
  const { list, isLoading, isRefreshing, refreshData, updateInList, deleteFromList, pushToList } = useContext(AcceptorStoreContext);
  const { changeVisibility, deleteItem, updateItem, createItem } = useContext(AcceptorItemContext);
  const { list: listOfSystems } = useContext(SystemStoreContext);

  let [isShowModal, setIsShowModal] = useState(false)
  let [itemForModal, setItemForModal] = useState({})
  let [modalOpacity] = useState(new Animated.Value(0))

  const emptyDataMessage = 'List of acceptors is empty';

  const onChangeVisibility = async (index, item) => {
    const newItem = await changeVisibility(item)
    updateInList(newItem)
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
    await deleteItem(item);
    deleteFromList(index);
  }

  const onShowEditModal = (index, item) => {
    setItemForModal(item);
    setIsShowModal(true);
    AwaitableAnimation(modalOpacity, 1, 150);
  }

  const onHideEditModal = async () => {
    await AwaitableAnimation(modalOpacity, 0, 150);
    setIsShowModal(false);
  }

  const onSaveInModal = async (item) => {
    if (item.id) {
      let updatedItem = await updateItem(item);
      console.log(updatedItem);
      updateInList(updatedItem);
    } else {
      let newItem = await createItem(item);
      pushToList(newItem);
    }

    await AwaitableAnimation(modalOpacity, 0, 150);
    setIsShowModal(false);
  }

  const handleCreateNew = async () => {
    onShowEditModal(null, {});
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
              listOfSystems={listOfSystems}
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
