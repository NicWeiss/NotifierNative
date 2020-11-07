import { Navigation } from 'react-native-navigation';

import LoginScreen from 'app/screens/publicScope/login';
import NotifyScreen from 'app/screens/privateScope/notify';
import NotifyListScreen from 'app/screens/privateScope/notifyList';
import ProfileScreen from 'app/screens/privateScope/profile'


export default () => {
  Navigation.registerComponent('Login', () => LoginScreen);
  Navigation.registerComponent('Notify', () => NotifyScreen);
  Navigation.registerComponent('NotifyList', () => NotifyListScreen);
  Navigation.registerComponent('Profile', () => ProfileScreen);
};
