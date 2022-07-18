import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from 'react-native-navigation';


export default async () => {
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
};
