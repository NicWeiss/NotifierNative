import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Orientation from 'react-native-orientation-locker';

import AcceptorsStoreContext from 'app/stores/lists/acceptor';
import CategoryStoreContext from 'app/stores/lists/category';
import NotifyItemContext from 'app/stores/item/notify';
import { Container, Header } from 'app/components';
import Periodic from 'app/constants/Periodic';

import { PopScreen, ShowToast } from 'app/helpers';
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

  const validate = (data) => {
    let isValid = true;
    const field = [];

    if (!data.name) {
      isValid = false;
      field.push('Name');
    }

    if (!data.periodic) {
      isValid = false;
      field.push('Period');
    }

    if (!data.time) {
      isValid = false;
      field.push('Time');
    }

    if (data.periodic == 'day_of_week' && !data.day_of_week) {
      isValid = false;
      field.push('Day of week');
    }

    if (Periodic.getPeriodsForDate.includes(data.periodic) && !data.date) {
      isValid = false;
      field.push('Date');
    }

    if (!data.acceptorsList || data.acceptorsList.length == 0) {
      isValid = false;
      field.push('Acceptors');
    }

    if (!isValid) {
      ShowToast(`${field.join(', ')}  is missing`);
    }

    return isValid;
  }

  const onSave = async (data) => {
    if (validate(data)) {
      const updatedItem = await updateItem(data);

      props.onchange(updatedItem);
      PopScreen(props.componentId);
    }
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
