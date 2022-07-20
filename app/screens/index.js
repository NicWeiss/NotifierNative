import { Navigation } from 'react-native-navigation';

import AcceptorScreen from 'app/screens/privateScope/acceptor';
import CategoryListScreen from 'app/screens/privateScope/category/categoryListScreen'
import LoginScreen from 'app/screens/publicScope/login';
import NotifyScreen from 'app/screens/privateScope/notify/notifyScreen';
import NotifyListScreen from 'app/screens/privateScope/notify/notifyListScreen';
import ProfileScreen from 'app/screens/privateScope/profile'


export default () => {
  Navigation.registerComponent('Acceptor', () => AcceptorScreen);
  Navigation.registerComponent('CategoryList', () => CategoryListScreen);
  Navigation.registerComponent('Login', () => LoginScreen);
  Navigation.registerComponent('Notify', () => NotifyScreen);
  Navigation.registerComponent('NotifyList', () => NotifyListScreen);
  Navigation.registerComponent('Profile', () => ProfileScreen);
};
