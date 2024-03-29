import AsyncStorage from '@react-native-community/async-storage';


export default async componentId => {
  try {
    await AsyncStorage.setItem('LoginScreenComponentId', `${componentId}`);
  } catch (error) {
    console.log('Can\' setup LoginScreenComponentId');

    return;
  }
};
