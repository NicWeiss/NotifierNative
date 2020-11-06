import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from 'react-native-navigation';


export default async () => {
  let loginScreenComponentId = null;

  try {
    loginScreenComponentId = await AsyncStorage.getItem('LoginScreenComponentId');
  } catch (error) {
    console.log('Не удалось получить LoginScreenComponentId');

    return;
  }

  Navigation.popTo(loginScreenComponentId);
};
