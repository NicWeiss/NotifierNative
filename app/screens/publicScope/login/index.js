import React, { useContext, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';
import { observer } from 'mobx-react-lite';

import { SetRootNavigation, SaveLoginScreenComponentId } from 'app/helpers';
import UserStoreContext from 'app/stores/user';
import { NavigateTo } from 'app/helpers';
import { showStoredMessages } from 'app/helpers/PushController';

import LoginView from './view';


const LoginScreen = observer(props => {

  const { logIn, checkSession, clearSession } = useContext(UserStoreContext);
  SaveLoginScreenComponentId(props.componentId);

  const navigateToNotifyList = () => {
    SetRootNavigation('NotifyList');
    showStoredMessages();
  }

  useEffect(() => {
    Orientation.lockToPortrait();
    SplashScreen.hide();
  }, []);

  const handleSignIn = () => {
    NavigateTo('SignUp', {});
  }

  return (
    <LoginView
      logIn={logIn}
      onSignIn={handleSignIn}
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
