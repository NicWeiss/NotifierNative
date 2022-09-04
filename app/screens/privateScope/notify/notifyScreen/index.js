import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Orientation from 'react-native-orientation-locker';

import NotifyItemContext from 'app/stores/item/notify';
import { Container, Header } from 'app/components';

import NotifyView from './view';


const NotifyScreen = observer(props => {
  useEffect(() => { Orientation.lockToPortrait(); }, []);

  const { item, loadData, changeState, clear } = useContext(NotifyItemContext);

  if (item.id != props.notifyId) {
    clear();
    loadData(props.notifyId);
  }

  const { isLoading } = useContext(NotifyItemContext);

  const onChangeState = async () => {
    const updatedItem = await changeState();

    props.onchange(updatedItem);
  }

  return (
    <Container>
      <Header
        title='Уведомление'
        backButtonActionArgs={{ componentId: props.componentId }}
      />

      <NotifyView
        isLoading={isLoading}
        item={item}
        onChangeState={onChangeState}
      />
    </Container>
  );
});

NotifyScreen.options = {
  topBar: { visible: false }
};

export default NotifyScreen;
