import React from 'react';
import { StyleSheet, Text } from 'react-native';


const SeparatorItem = () => {

  return (
    <Text style={styles.item}> | </Text>
  );
}

const styles = StyleSheet.create({
  item: {
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
    textAlignVertical: 'center',
    color: '#ccc'
  },
});


export default SeparatorItem;
