import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Orientation from 'react-native-orientation-locker';

import { Container, Header } from 'app/components';
import { SideBarMenu, SideBarMenuButton } from 'app/components/sideBarMenu'

import CategoryStoreContext from 'app/stores/lists/category';
import CategoryList from './categoryList/category';


const CategoryListScreen = observer(() => {
  const { loadData: loadCategogies } = useContext(CategoryStoreContext);
  const sideBarRef = React.useRef();

  useEffect(() => {
    Orientation.lockToPortrait();

    loadCategogies();
  }, []);


  return (
    <Container>
      <SideBarMenu ref={sideBarRef} currentScreen="CategoryListScreen" />
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
      <CategoryList />
    </Container>
  );
});

CategoryListScreen.options = {
  topBar: { visible: false },
};

export default CategoryListScreen;
