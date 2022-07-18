import React from 'react';

import { View } from 'react-native';

import styles from './styles';
import Option from './option';
import { NavigateTo } from 'app/helpers';


const Options = (props) => {
  const toSettings = () => { NavigateTo('Profile'); }

  return (
    <View style={styles.container}>

      <Option
        iconPack='MaterialCommunity'
        iconName='bell-ring'
        text='Notifies'
      />

      <Option
        iconPack='Entypo'
        iconName='archive'
        text='Categories'
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
