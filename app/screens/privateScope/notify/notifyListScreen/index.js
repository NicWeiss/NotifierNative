import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Orientation from 'react-native-orientation-locker';

import { Container, Header } from 'app/components';
import { SideBarMenu, SideBarMenuButton } from 'app/components/sideBarMenu'
import { CategoryTabs } from './categoryTabs'

import NotifyStoreContext from 'app/stores/lists/notify';
import CategoryStoreContext from 'app/stores/lists/category';

import NotifyList from './notifyList/notify';


const NotifyListScreen = observer(() => {
  const { loadData: loadCategogies, refreshData } = useContext(CategoryStoreContext);
  const { loadData: loadNotify } = useContext(NotifyStoreContext);
  const sideBarRef = React.useRef();

  useEffect(() => {
    Orientation.lockToPortrait();

    loadCategogies();
    loadNotify(0);
  }, []);

  const loadByCategoryId = (id) => {
    loadNotify(id);
  };

  const handleRefresh = () => {
    refreshData();
  }

  return (
    <Container>
      <SideBarMenu ref={sideBarRef} currentScreen="NotifyListScreen" />
      <Header
        title='Notifier'
        leftButtons={[{
          'component': SideBarMenuButton,
          'props': {
            backRef: sideBarRef
          }
        }]}
      />
      <CategoryTabs onSelect={loadByCategoryId} />
      <NotifyList onRefresh={handleRefresh} />
    </Container>
  );
});

NotifyListScreen.options = {
  topBar: { visible: false },
};

export default NotifyListScreen;
