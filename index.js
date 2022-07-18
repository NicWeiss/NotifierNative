import 'mobx-react-lite/batchingForReactNative';

import { Navigation } from 'react-native-navigation';

import RegisterScreens from 'app/screens';


RegisterScreens();

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    statusBar: {
      style: 'light'
    },
    animations: {
      push: {
        content: {
          alpha: {
            from: 0,
            to: 1,
            duration: 100
          }
        }
      },
      pop: {
        content: {
          alpha: {
            from: 1,
            to: 0,
            duration: 100
          }
        }
      }
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
