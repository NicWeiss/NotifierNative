import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Orientation from 'react-native-orientation-locker';

import AcceptorsStoreContext from 'app/stores/lists/acceptor';
import CategoryStoreContext from 'app/stores/lists/category';
import NotifyItemContext from 'app/stores/item/notify';
import { Container, Header } from 'app/components';

import { PopScreen } from 'app/helpers';
import NotifyEditView from './view';


const NotifyEditScreen = observer(props => {
  useEffect(() => { Orientation.lockToPortrait(); }, []);

  const { item, loadData, updateItem, clear, isLoading } = useContext(NotifyItemContext);
  const { list: listOfCategories, loadData: loadCategories } = useContext(CategoryStoreContext);
  const { list: listOfAcceptors, loadData: loadAcceptors } = useContext(AcceptorsStoreContext);

  if (!listOfCategories || listOfCategories.length == 0) {
    loadCategories();
  }

  if (!listOfAcceptors || listOfAcceptors.length == 0) {
    loadAcceptors();
  }

  let notifyItem = item;

  if (props.notifyId == null && notifyItem.id != props.notifyId) {
    notifyItem = clear();
  } else if (notifyItem.id != props.notifyId) {
    notifyItem = loadData(props.notifyId);
  }

  const onSave = async (data) => {
    const updatedItem = await updateItem(data);

    props.onchange(updatedItem);
    PopScreen(props.componentId);
  }


  return (
    <Container>
      <Header
        title={notifyItem.id ? 'Editing' : 'Creating'}
        backButtonActionArgs={{ componentId: props.componentId }}
      />

      <NotifyEditView
        isLoading={isLoading}
        item={notifyItem}
        onSave={onSave}
        listOfCategories={listOfCategories}
        listOfAcceptors={listOfAcceptors}
      />
    </Container>
  );
});

NotifyEditScreen.options = {
  topBar: { visible: false }
};

export default NotifyEditScreen;
