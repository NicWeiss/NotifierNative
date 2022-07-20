import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Orientation from 'react-native-orientation-locker';

import AcceptorItemContext from 'app/stores/item/acceptor';
import { Container, Header } from 'app/components';

import AcceptorView from './view';


const AcceptorScreen = observer(props => {

  useEffect(() => { Orientation.lockToPortrait(); }, []);

  const { isLoading, item, loadData } = useContext(AcceptorItemContext);

  if (item.id != props.acceptorId) {
    loadData(props.acceptorId)
  }

  return (
    <Container>
      <Header
        title='Получатель'
        backButtonActionArgs={{ componentId: props.componentId }}
      />

      <AcceptorView
        isLoading={isLoading}
        item={item}
      />
    </Container>
  );
});

AcceptorScreen.options = {
  topBar: { visible: false }
};

export default AcceptorScreen;
