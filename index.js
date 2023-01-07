import 'mobx-react-lite/batchingForReactNative';

import { AppRegistry, BackHandler, Alert } from "react-native";
import { Navigation } from 'react-native-navigation';

import RegisterScreens from 'app/screens';
import { setListners } from './app/helpers/PushController';


RegisterScreens();

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    statusBar: {
      style: 'light'
    },
    animations: {
      setRoot: {
        enter: {
          waitForRender: true,
          enabled: false,
          alpha: {
            from: 0,
            to: 1,
            duration: 100
          }
        },
        exit: {
          waitForRender: true,
          enabled: false,
          alpha: {
            from: 1,
            to: 0,
            duration: 100
          }
        },
      },
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

  const backAction = () => {
    const components = Navigation.concreteNavigation.store.componentsInstancesById
    // console.log(components);
    if (Object.keys(components).length > 1) {
      return;
    }

    Alert.alert("", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);

    return true;
  };

  BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );
});


setListners();

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    return null;
  }

}

AppRegistry.registerComponent('app', () => HeadlessCheck);
