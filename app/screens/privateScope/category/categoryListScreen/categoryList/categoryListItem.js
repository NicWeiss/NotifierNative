import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from 'app/constants/Colors';
import { NavigateTo } from 'app/helpers';


export const CategoryListItem = (
  { item, index, onChange, onChangeVisibility, onDelete, onEdit }
) => {

  const handleChange = (updatedItem) => {
    onChange(index, updatedItem)
  }

  const handleSelectItem = () => {
    onEdit(index, item)
  }

  const handleChangeVisibility = () => {
    onChangeVisibility(index, item)
  }

  const handleDelete = () => {
    onDelete(index, item)
  }

  if (!item) {
    return false
  }

  return (
    <View
      onPress={handleSelectItem}
      style={styles.item}
    >
      <TouchableOpacity style={styles.itemLeftPart} onPress={handleSelectItem} >
        <View style={styles.itemInfoRow}>
          <Text style={styles.itemName}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.buttonsPart}>
        <TouchableOpacity onPress={handleChangeVisibility} style={styles.inlineButton}>
          {
            item && item.is_hidden == 1 ?
              <Icon name='eye-off' style={[styles.hideIcon, styles.icon]} /> :
              <Icon name='eye' style={[styles.showIcon, styles.icon]} />
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDelete} style={styles.inlineButton}>
          <Icon name='delete' style={[styles.deleteIcon, styles.icon]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 4,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: Colors.lightGray,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: Colors.white,
    paddingLeft: 10,
    // backgroundColor: '#eee'
  },

  itemInfoRow: {
    paddingVertical: 18,
    width: '100%'
  },

  itemLeftPart: {
    alignItems: 'flex-start',
    width: '70%'
  },

  buttonsPart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '30%'
  },

  itemName: {
    fontSize: 18,
    color: Colors.black
  },

  icon: {
    margin: 15,
    fontSize: 24
  },

  deleteIcon: {
    color: Colors.red
  },

  showIcon: {
    color: Colors.green
  },

  hideIcon: {
    color: '#ccc'
  }
});


export default CategoryListItem;
