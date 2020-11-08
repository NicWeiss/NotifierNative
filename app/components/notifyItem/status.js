import React from 'react';
import { Text } from 'react-native';

import Colors from 'app/constants/Colors';


const Status = ({ status }) => {
  const color = status == '1' ? Colors.green : Colors.red ;
  let output = status == '1' ? 'Активен' : 'Отключен' ;
  return (
    <Text style={{
      color: color
    }}>
      {output}
    </Text>
  );
};

export default Status;