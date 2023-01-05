import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import RNRestart from 'react-native-restart';
import Orientation from 'react-native-orientation-locker';

import UserStoreContext from 'app/stores/user';
import { Container, Header } from 'app/components';
import { NavigateTo } from 'app/helpers';

import ProfileView from './view';


const ProfileScreen = observer(props => {

  useEffect(() => { Orientation.lockToPortrait(); }, []);

  const { logOut, isLoading, isRefreshing, user } = useContext(UserStoreContext);

  const handleReloadApp = () => RNRestart.Restart();
  const navigateToTerminalSettings = () => NavigateTo('ProfileTerminalSettingList');

  return (
    <Container>
      <Header
        title='Settings'
        backButtonActionArgs={{ componentId: props.componentId }}
      />

      <ProfileView
        user={user}
        handleLogOut={logOut}
        handleReloadApp={handleReloadApp}
        navigateToTerminalSettings={navigateToTerminalSettings}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
      />
    </Container>
  );
});

ProfileScreen.options = {
  topBar: { visible: false }
};

export default ProfileScreen;
