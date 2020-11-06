import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Orientation from 'react-native-orientation-locker';
import { Text} from 'react-native';

import { Container, Header, LoaderScreen, Tabs } from 'app/components';

// import OrderListInWorkContext from 'app/stores/orderList/inWork';
// import OrderListCompletedContext from 'app/stores/orderList/completed';
// import OrderListNoCourierContext from 'app/stores/orderList/noCourier';
// import UserStoreContext from 'app/stores/user';

import NotifyListTopbarLeftButton from './topbarLeftButton';
import NotifyListTopbarRightButton from './topbarRightButton';
// import OrderListSearchPanel from './searchPanel';
// import OrderListNoDataMessage from './noDataMessage';

// import OrderListCompletedTab from './tabs/notify';
// import OrderListInWorkTab from './tabs/acceptors';


const NotifyListScreen = observer(() => {

  // const { loadData: loadNotify } = useContext(NotifyListNotifyContext);
  // const { loadData: loadacceptors } = useContext(NotifyListScreenAcceptorsContext);

  useEffect(() => {
    Orientation.lockToPortrait();

    // loadNotify();
    // loadacceptors();
  }, []);

  const [multiselectState, changeMultiselectState] = useState({
    name: null,
    isDisabled: true,
    isVisible: false,
    isActive: false
  });

  // let names = ['Уведомления', 'Получатели'];
  // let funcComponents = [NotifyListNotifyTab, NotifyListScreenAcceptorsTab];

  // let tabs = [
  //   { name: 'Уведомления', funcComponent: NotifyListNotifyTab },
  //   { name: 'Завершенные', funcComponent: NotifyListScreenAcceptorsTab }
  // ];

  let content = null;

  // if (isUserDataLoading) {
    // content = <LoaderScreen />;
  // } else if (name === null) {
    // content = <OrderListNoDataMessage />;
  // } else {
    // content = (
    //   <Tabs
    //     topPanel={[OrderListSearchPanel]}
    //     tabNames={names}
    //     tabFuncComponents={funcComponents}
    //     propsToTabs={{ multiselectState, changeMultiselectState }}
    //   />
    // );
  // }

  return (
    <Container>
      <Header
        title='Notifier'
        leftButtons={[NotifyListTopbarLeftButton]}
        rightButtons={[NotifyListTopbarRightButton]}
      />

      {/* {content} */}
    </Container>
  );
});

NotifyListScreen.options = {
  topBar: { visible: false }
};

export default NotifyListScreen;
