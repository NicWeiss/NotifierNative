import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import Colors from 'app/constants/Colors';
import { NavigateTo } from 'app/helpers';


const CategoryItem = (props) => {
  const { item, callback } = props;
  const handleSelectItem = () => {
    callback(item.id);
  }

  return (
    <View
      style={[styles.item]}
    >
      <TouchableOpacity onPress={handleSelectItem}>
        <Text style={styles.itemName}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },

  itemName: {
    color: Colors.white,
    fontSize: 16,
  }
});


export default CategoryItem;
