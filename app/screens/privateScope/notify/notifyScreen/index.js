import React, { useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import Orientation from 'react-native-orientation-locker';

import NotifyItemContext from 'app/stores/item/notify';
import { Container, Header } from 'app/components';
import { NavigateTo, PopScreen } from 'app/helpers';

import NotifyView from './view';
import DeleteButton from './deleteButton';


const NotifyScreen = observer(props => {
  useEffect(() => { Orientation.lockToPortrait(); }, []);

  const { item, loadData, changeState, clear, deleteItem } = useContext(NotifyItemContext);

  if (item.id != props.notifyId) {
    clear();
    loadData(props.notifyId);
  }

  const { isLoading } = useContext(NotifyItemContext);

  const onChangeState = async () => {
    const updatedItem = await changeState();

    props.onchange(updatedItem);
  }

  const onEdit = () => NavigateTo('NotifyEdit', {
    notifyId: item.id,
    onchange: props.onchange
  });

  const handleDelete = () => {
    Alert.alert("", `Catedory ${item.name} will be deleted`, [
      {
        text: "Cancel",
        onPress: () => { },
        style: "cancel"
      },
      {
        text: "Delete",
        onPress: async () => {
          setTimeout(async () => {
            await deleteItem(item);
            props.handleRefresh();
          }, 300)
          PopScreen(props.componentId);
        }
      },
    ]);
  }


  return (
    <Container>
      <Header
        title='Notify'
        backButtonActionArgs={{ componentId: props.componentId }}
        rightButtons={[DeleteButton]}
        onRightButtonPress={handleDelete}
      />

      <NotifyView
        isLoading={isLoading}
        item={item}
        onChangeState={onChangeState}
        onEdit={onEdit}
      />
    </Container>
  );
});

NotifyScreen.options = {
  topBar: { visible: false }
};

export default NotifyScreen;
