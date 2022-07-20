import React, { useContext, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';
import { observer } from 'mobx-react-lite';
import { Navigation } from 'react-native-navigation';

import { SetRootNavigation, SaveLoginScreenComponentId } from 'app/helpers';
import UserStoreContext from 'app/stores/user';

import LoginView from './view';


const LoginScreen = observer(props => {

  const navigateToNotifyList = () => {
    SetRootNavigation('NotifyList')
  }

  const { logIn, checkSession, clearSession } = useContext(UserStoreContext);
  SaveLoginScreenComponentId(props.componentId);

  useEffect(() => {
    Orientation.lockToPortrait();
    SplashScreen.hide();
  }, []);


  return (
    <LoginView
      logIn={logIn}
      clearSession={clearSession}
      checkSession={checkSession}
      navigateToNotifyList={navigateToNotifyList}
    />
  );
});

LoginScreen.options = () => {
  return { topBar: { visible: false } };
};

export default LoginScreen;
