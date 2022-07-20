import React from 'react';
import { View } from 'react-native';

import Colors from 'app/constants/Colors';


const Container = ({ children }) => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: Colors.white
    }}>
      {children}
    </View>
  );
};

export default Container;
