import React from 'react';

import { View } from 'react-native';

import styles from './styles';
import Option from './option';
import { NavigateTo, SetRootNavigation } from 'app/helpers';


const Options = ({ context, currentScreen }) => {
  const toNotifyList = async () => {
    context.hideFromOption();
    if (currentScreen != 'NotifyListScreen') {
      SetRootNavigation('NotifyList');
    }
  }

  const toCategoryList = async () => {
    context.hideFromOption();
    if (currentScreen != 'CategoryListScreen') {
      SetRootNavigation('CategoryList');
    }
  }

  const toSettings = () => {
    context.hideFromOption();
    if (currentScreen != 'ProfileScreen') {
      NavigateTo('Profile');
    }
  }

  return (
    <View style={styles.container}>

      <Option
        iconPack='MaterialCommunity'
        iconName='bell-ring'
        text='Notifies'
        onPress={toNotifyList}
      />

      <Option
        iconPack='Entypo'
        iconName='archive'
        text='Categories'
        onPress={toCategoryList}
      />

      <Option
        iconPack='Material'
        iconName='recent-actors'
        text='Acceptors'
      />

      <Option
        iconPack='Ionicons'
        iconName='settings-sharp'
        text='Settings'
        onPress={toSettings}
      />

    </View >
  );
};

export default Options;
