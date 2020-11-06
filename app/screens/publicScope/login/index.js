import React, { useContext, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';
import { observer } from 'mobx-react-lite';
import { Text } from 'react-native'



const LoginScreen = observer(props => {

  // useEffect(() => {
  //   Orientation.lockToPortrait();
  //   SplashScreen.hide();
  // }, []);
console.log('login start');
  return (
    <Text style="color: black;">Login Screen</Text>
  );
});

// LoginScreen.options = () => {
//   return { topBar: { visible: false } };
// };

export default LoginScreen;
