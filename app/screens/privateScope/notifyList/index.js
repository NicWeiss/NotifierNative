import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Orientation from 'react-native-orientation-locker';

import { Container, Header, Tabs } from 'app/components';

import NotifyStoreContext from 'app/stores/lists/notify';
import AcceptorsStoreContext from 'app/stores/lists/acceptors';


import NotifyListTopbarLeftButton from './topbarLeftButton';
import NotifyListTopbarRightButton from './topbarRightButton';

import NotifyListNotifyTab from './tabs/notify';
import NotifyListAcceptorsTab from './tabs/acceptors';


const NotifyListScreen = observer(() => {

  const { loadData: loadNotify } = useContext(NotifyStoreContext);
  const { loadData: loadacceptors } = useContext(AcceptorsStoreContext);

  useEffect(() => {
    Orientation.lockToPortrait();

    loadNotify();
    loadacceptors();
  }, []);


  let names = ['Уведомления', 'Получатели'];
  let funcComponents = [NotifyListNotifyTab, NotifyListAcceptorsTab];

  return (
    <Container>
      <Header
        title='Notifier'
        leftButtons={[NotifyListTopbarLeftButton]}
        rightButtons={[NotifyListTopbarRightButton]}
      />
      <Tabs
        tabNames={names}
        tabFuncComponents={funcComponents}
      />
    </Container>
  );
});

NotifyListScreen.options = {
  topBar: { visible: false }
};

export default NotifyListScreen;
