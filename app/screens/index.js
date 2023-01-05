import { Navigation } from 'react-native-navigation';

import AcceptorListScreen from 'app/screens/privateScope/acceptor/acceptorListScreen';
import CategoryListScreen from 'app/screens/privateScope/category/categoryListScreen';
import LoginScreen from 'app/screens/publicScope/login';
import NotifyEditScreen from 'app/screens/privateScope/notify/notifyEditScreen';
import NotifyScreen from 'app/screens/privateScope/notify/notifyScreen';
import NotifyListScreen from 'app/screens/privateScope/notify/notifyListScreen';
import ProfileScreen from 'app/screens/privateScope/profile'


export default () => {
  Navigation.registerComponent('AcceptorList', () => AcceptorListScreen);
  Navigation.registerComponent('CategoryList', () => CategoryListScreen);
  Navigation.registerComponent('Login', () => LoginScreen);
  Navigation.registerComponent('NotifyEdit', () => NotifyEditScreen)
  Navigation.registerComponent('Notify', () => NotifyScreen);
  Navigation.registerComponent('NotifyList', () => NotifyListScreen);
  Navigation.registerComponent('Profile', () => ProfileScreen);
};
