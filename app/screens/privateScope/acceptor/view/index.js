import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import Colors from 'app/constants/Colors';

import styles from './styles';


const AcceptorView = ({
 item, isLoading
}) => {

  if (isLoading) {
    return (
      <View style={styles.profileContentContainer}>
        <ActivityIndicator size='large' color={Colors.orange} />
      </View>
    );
  }

  return (
    <View style={styles.profile}>
    <Text> #{item.id}</Text>
      <Text>Статус: {item.status}</Text>
      <Text>Название: {item.name}</Text>
    </View>
  );
};

export default AcceptorView;
