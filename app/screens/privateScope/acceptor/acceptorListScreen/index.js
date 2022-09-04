import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Orientation from 'react-native-orientation-locker';

import { Container, Header } from 'app/components';
import { SideBarMenu, SideBarMenuButton } from 'app/components/sideBarMenu'

import AcceptorStoreContext from 'app/stores/lists/acceptor';
import AcceptorList from './acceptorList/acceptor';


const AcceptorListScreen = observer(() => {
  const { loadData: loadCategogies } = useContext(AcceptorStoreContext);
  const sideBarRef = React.useRef();

  useEffect(() => {
    Orientation.lockToPortrait();

    loadCategogies();
  }, []);


  return (
    <Container>
      <SideBarMenu ref={sideBarRef} currentScreen="AcceptorListScreen" />
      <Header
        title='Notifier'
        leftButtons={[{
          'component': SideBarMenuButton,
          'props': {
            backRef: sideBarRef
          }
        }]}
      />
      <AcceptorList />
    </Container>
  );
});

AcceptorListScreen.options = {
  topBar: { visible: false },
};

export default AcceptorListScreen;
