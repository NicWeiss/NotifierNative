import React, { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';
import { observer } from 'mobx-react-lite';

import { NavigateTo, SaveLoginScreenComponentId } from 'app/helpers';
import UserStoreContext from 'app/stores/user';

import LoginView from './view';


const LoginScreen = observer(props => {

  const navigateToNotifyList = () => NavigateTo('NotifyList', { reset: true });
  const { logIn, checkSession, clearSession } = useContext(UserStoreContext);
  SaveLoginScreenComponentId(props.componentId);
  // let isAuthCheck = true;

  // const checkAuth = async () => {
  //   const session = AsyncStorage.getItem('session');

  //   if (session && !!session.session) {
  //     console.log('session found!');
  //     navigateToNotifyList();
  //   }
  // };

  useEffect(() => {
    Orientation.lockToPortrait();
    SplashScreen.hide();

    // checkAuth();
  }, []);


  return (
    <LoginView
      logIn={logIn}
      clearSession={clearSession}
      checkSession={checkSession}
      navigateToNotifyList={navigateToNotifyList}
    // isAuthCheck={isAuthCheck}
    />
  );
});

LoginScreen.options = () => {
  return { topBar: { visible: false } };
};

export default LoginScreen;
