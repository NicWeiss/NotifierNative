import { Navigation } from 'react-native-navigation';

import LoginScreen from 'app/screens/publicScope/login';


export default () => {
  Navigation.registerComponent('Login', () => LoginScreen);
};
