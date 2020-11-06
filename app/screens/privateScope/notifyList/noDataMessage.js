import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import Colors from 'app/constants/Colors';


const OrderListNoDataMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.textLarge]}>Не удалось загрузить данные</Text>
      <Text style={styles.text}>Попробуйте перезагрузить</Text>
      <Text style={styles.text}>приложение из профиля</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLarge: {
    marginBottom: 10,
    fontSize: 18
  },
  text: {
    fontSize: 14,
    color: Colors.gray,
  }
});

export default OrderListNoDataMessage;
