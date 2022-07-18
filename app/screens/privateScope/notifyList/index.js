import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Orientation from 'react-native-orientation-locker';

import { Container, Header } from 'app/components';
import { SideBarMenu, SideBarMenuButton } from 'app/components/sideBarMenu'

import NotifyStoreContext from 'app/stores/lists/notify';
import CategoryStoreContext from 'app/stores/lists/category';

import NotifyListNotifyTab from './tabs/notify';


const NotifyListScreen = observer(() => {
  const { loadData: loadCategogies } = useContext(CategoryStoreContext);
  const { loadData: loadNotify } = useContext(NotifyStoreContext);
  const sideBarRef = React.useRef();

  useEffect(() => {
    Orientation.lockToPortrait();

    loadCategogies();
    loadNotify();
  }, []);

  return (
    <Container>
      <SideBarMenu ref={sideBarRef} />
      <Header
        title='Notifier'
        leftButtons={[{
          'component': SideBarMenuButton,
          'props': {
            backRef: sideBarRef
          }
        }]}
      // rightButtons={[NotifyListTopbarRightButton]}
      />
      {/* <MultiTabs /> */}
      <NotifyListNotifyTab />
    </Container>
  );
});

NotifyListScreen.options = {
  topBar: { visible: false }
};

export default NotifyListScreen;
