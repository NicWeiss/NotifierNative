import React, { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';
import { observer } from 'mobx-react-lite';

import { SetRootNavigation } from 'app/helpers';
import UserStoreContext from 'app/stores/user';
import { sendFcmToken } from 'app/helpers/PushController';

import SignUpView from './view';


const SignUpScreen = observer(props => {

  const { getCode, completeRegistration, isLoading } = useContext(UserStoreContext);

  useEffect(() => {
    Orientation.lockToPortrait();
    SplashScreen.hide();
  }, []);

  const onGetCode = (email) => {
    if (isLoading) {
      return;
    }

    console.log('Try get gode for', email);
    getCode(email)
  }

  const onCompleteRegistration = async (data) => {
    if (isLoading) {
      return;
    }

    const session = await completeRegistration(data);

    if (session) {
      await AsyncStorage.setItem('login', data.email);
      await AsyncStorage.setItem('secret', data.password);
      await AsyncStorage.setItem('session', session);

      sendFcmToken();
      SetRootNavigation('NotifyList');
    }
  }

  return (
    <SignUpView
      onGetCode={onGetCode}
      onCompleteRegistration={onCompleteRegistration}
    />
  );
});

SignUpScreen.options = () => {
  return { topBar: { visible: false } };
};

export default SignUpScreen;
