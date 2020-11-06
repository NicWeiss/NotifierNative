import 'mobx-react-lite/batchingForReactNative';

import { Navigation } from 'react-native-navigation';

import RegisterScreens from './app/screens';


RegisterScreens();

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    statusBar: {
      style: 'light'
    }
  });
  Navigation.setRoot({
    root: {
      stack: {
        id: 'appStack',
        children: [
          { component: { name: 'Login' } }
        ]
      }
    }
  });
});
