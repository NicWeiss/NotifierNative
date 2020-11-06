import AsyncStorage from '@react-native-community/async-storage';


export default async () => {
  const asyncStorageCleaner = await AsyncStorage.clear();

  await asyncStorageCleaner;
};
