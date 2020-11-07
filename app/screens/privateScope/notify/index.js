import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import RNRestart from 'react-native-restart';
import Orientation from 'react-native-orientation-locker';

import NotifyItemContext from 'app/stores/item/notify';
import { Container, Header } from 'app/components';
import { NavigateTo } from 'app/helpers';

import NotifyView from './view';


const NotifyScreen = observer(props => {

  useEffect(() => { Orientation.lockToPortrait(); }, []);

  const { isLoading, item, loadData } = useContext(NotifyItemContext);

  if (item.id != props.notifyId ) loadData(props.notifyId)

  return (
    <Container>
      <Header
        title='Уведомление'
        backButtonActionArgs={{ componentId: props.componentId }}
      />

      <NotifyView
        isLoading={isLoading}
        item={item}
      />
    </Container>
  );
});

NotifyScreen.options = {
  topBar: { visible: false }
};

export default NotifyScreen;
