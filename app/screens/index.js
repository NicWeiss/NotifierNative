import { Navigation } from 'react-native-navigation';

import LoginScreen from './publicScope/login';


export default () => {
  Navigation.registerComponent('Login', () => LoginScreen);
};
