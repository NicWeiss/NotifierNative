import React from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, TouchableOpacity } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons'

import Colors from 'app/constants/Colors';


const DeleteButton = observer(({ onPress }) => {

  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
      <IoniconsIcon style={styles.buttonIcon} name={'trash-bin'} />
    </TouchableOpacity>
  );
});


const styles = StyleSheet.create({
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },


  buttonIcon: {
    color: Colors.white,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'normal'
  }
});


export default DeleteButton;
