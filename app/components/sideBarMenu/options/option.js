import React from 'react';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import { Animated, Pressable, Text, View } from 'react-native';

import { AwaitableAnimation } from 'app/helpers';
import styles from './styles';


const Option = (props) => {
  const { text, iconPack, iconName, onPress } = props
  const bc = new Animated.Value(0)

  const startPress = () => { AwaitableAnimation(bc, 100, 100) }
  const stopPress = () => { AwaitableAnimation(bc, 0, 100); onPress() }

  return (
    <Pressable
      onPressIn={startPress}
      onPressOut={stopPress}
    >
      <Animated.View style={[
        styles.item,
        {
          backgroundColor: bc.interpolate({
            inputRange: [0, 100],
            outputRange: ['rgba(255, 255, 255, 0)', 'rgba(204, 204, 204, 1)']
          })
        }
      ]}>
        {
          iconPack == 'Entypo' ?
            <EntypoIcon style={styles.itemImage} name={iconName} />
            : null
        }
        {
          iconPack == 'MaterialCommunity' ?
            <MaterialCommunityIcon style={styles.itemImage} name={iconName} />
            : null
        }
        {
          iconPack == 'Material' ?
            <MaterialIcon style={styles.itemImage} name={iconName} />
            : null
        }
        {
          iconPack == 'Feather' ?
            <FeatherIcon style={styles.itemImage} name={iconName} />
            : null
        }
        {
          iconPack == 'Ionicons' ?
            <IoniconsIcon style={styles.itemImage} name={iconName} />
            : null
        }
        <Text style={styles.itemName}>
          {text}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default Option;
