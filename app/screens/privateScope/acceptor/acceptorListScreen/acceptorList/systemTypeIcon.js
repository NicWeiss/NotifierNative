import React from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Colors from 'app/constants/Colors';


const SystemTypeIcon = observer(({ type }) => {
  console.log(type);
  return (
    <View style={styles.iconContainer}>
      {type == 'push' &&
        <FontAwesome5Icon style={[styles.systemIcon, styles.push]} name={'mobile'} />
      }
      {type == 'email' &&
        <MaterialCommunityIcons style={[styles.systemIcon, styles.email]} name={'email'} />
      }
      {type == 'tg' &&
        <EvilIcons style={[styles.systemIcon, styles.tg]} name={'sc-telegram'} />
      }
    </View>
  );
});


const styles = StyleSheet.create({
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40
  },

  systemIcon: {
    color: Colors.orange,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'normal',
    marginRight: 10,
  },
  push: {
    color: '#128021'
  },
  email: {
    color: '#de6c20'
  },
  tg: {
    color: 'blue',
    fontSize: 30
  }
});


export default SystemTypeIcon;
