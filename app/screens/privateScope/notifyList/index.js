import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Orientation from 'react-native-orientation-locker';
import { Text } from 'react-native';

import { Container, Header, LoaderScreen, Tabs } from 'app/components';

// import OrderListInWorkContext from 'app/stores/orderList/inWork';
// import OrderListCompletedContext from 'app/stores/orderList/completed';
// import OrderListNoCourierContext from 'app/stores/orderList/noCourier';
// import UserStoreContext from 'app/stores/user';

import NotifyListTopbarLeftButton from './topbarLeftButton';
import NotifyListTopbarRightButton from './topbarRightButton';
// import OrderListNoDataMessage from './noDataMessage';

import NotifyListNotifyTab from './tabs/notify';
import NotifyListAcceptorsTab from './tabs/acceptors';


const NotifyListScreen = observer(() => {

  // const { loadData: loadNotify } = useContext(NotifyListNotifyContext);
  // const { loadData: loadacceptors } = useContext(NotifyListScreenAcceptorsContext);

  useEffect(() => {
    Orientation.lockToPortrait();

    // loadNotify();
    // loadacceptors();
  }, []);


  let names = ['Уведомления', 'Получатели'];
  let funcComponents = [NotifyListNotifyTab, NotifyListAcceptorsTab];

  let tabs = [
    { name: 'Уведомления', funcComponent: NotifyListNotifyTab },
    { name: 'Получатели', funcComponent: NotifyListAcceptorsTab }
  ];

  let content = (
    <Tabs
      tabNames={names}
      tabFuncComponents={funcComponents}
    />
  );

  return (
    <Container>
      <Header
        title='Notifier'
        leftButtons={[NotifyListTopbarLeftButton]}
        rightButtons={[NotifyListTopbarRightButton]}
      />

      {content}
    </Container>
  );
});

NotifyListScreen.options = {
  topBar: { visible: false }
};

export default NotifyListScreen;
