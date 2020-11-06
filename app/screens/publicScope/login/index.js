import React, { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';
import { observer } from 'mobx-react-lite';

import { NavigateTo, SaveLoginScreenComponentId } from 'app/helpers';
import UserStoreContext from 'app/stores/user';

import LoginView from './view';


const LoginScreen = observer(props => {

  const { logIn } = useContext(UserStoreContext);

  const checkAuth = async () => {
    const session = await AsyncStorage.getItem('session');

    SaveLoginScreenComponentId(props.componentId);

    if (!!session) {
      console.log('session found!');
      navigateToNotifyList();
    }
  };

  useEffect(() => {
    Orientation.lockToPortrait();
    SplashScreen.hide();

    checkAuth();
  }, []);

  const navigateToNotifyList = () => NavigateTo('NotifyList');

  return (
    <LoginView
      logIn={logIn}
      navigateToNotifyList={navigateToNotifyList}
    />
  );
});

LoginScreen.options = () => {
  return { topBar: { visible: false } };
};

export default LoginScreen;