import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import Colors from 'app/constants/Colors';


const LoaderScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size='large' color={Colors.blueDarkest} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.white
  },
});

export default LoaderScreen;
