import React from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Colors from 'app/constants/Colors';


const AddButton = observer(({ onPress }) => {

  return (
    <TouchableOpacity style={styles.addButtonWrapper} onPress={onPress}>
      <MaterialIcon style={styles.addButtonIcon} name={'add-circle'} />
    </TouchableOpacity>
  );
});


const styles = StyleSheet.create({
  addButtonWrapper: {
    zIndex: 0,
    position: 'absolute',
    left: '41%',
    bottom: 10,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 100,
  },


  addButtonIcon: {
    borderRadius: 100,
    color: Colors.orange,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 70,
    backgroundColor: Colors.white,
    fontWeight: 'normal'
  }
});


export default AddButton;
