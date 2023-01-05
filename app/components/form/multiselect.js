import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, ScrollView, View, Pressable, Button } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons'


const MultiSelect = ({
  label, items, placeholder, selectedItems, onSelect
}) => {

  const selectedIds = selectedItems.map(el => el.id);
  const selectedNames = selectedItems.map(el => el.name);

  // const [dateForChange, setDate] = useState(date)
  const [isShow, setVisibility] = useState(false)

  const changeVisibility = () => {
    setVisibility(!isShow)
  }

  const handleSelect = (el) => {
    if (selectedIds.includes(el.id)) {
      const filtredSelected = selectedItems.filter(item => item.id != el.id);
      onSelect(filtredSelected);
      return
    }

    if (!selectedIds.includes(el.id)) {
      const addedSelected = [...selectedItems, el];
      onSelect(addedSelected);
      return
    }
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={changeVisibility}>
        <Text style={styles.input}>
          {selectedNames.join(', ') || placeholder}
        </Text>
        <IoniconsIcon
          style={[styles.dropdown]}
          name="caret-down"
        />
      </Pressable>

      {isShow &&
        <ScrollView
          vertical
          pagingEnabled
          bounces={false}
          scrollEventThrottle={10}
          scrollToOverflowEnabled={true}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          style={styles.items}
          nestedScrollEnabled={true}
        >
          {items.map(el =>
            <Pressable
              onPress={() => { handleSelect(el) }}
              key={(Math.random() + 1).toString(36).substring(7)}
              style={styles.item}
            >
              <MaterialIcon
                style={[styles.itemImage, selectedIds.includes(el.id) ? styles.checked : styles.unchecked]}
                name="check"
              />
              <Text >
                {el.name}
              </Text>
            </Pressable>
          )}

        </ScrollView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 17,
    // marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 5,
  },

  multiline: {
    textAlignVertical: "top"
  },

  label: {
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 0,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 0,
    alignSelf: "flex-start"
  },

  items: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    maxHeight: 100,
    position: 'absolute',
    top: 63,
    zIndex: 9,
    width: "100%",
  },

  item: {
    paddingVertical: 5,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: 'row',
  },

  unchecked: {
    color: "#ccc"
  },

  checked: {
    color: "#000"
  },

  itemImage: {
    fontWeight: 'bold',
    fontSize: 18
  },

  dropdown: {
    fontWeight: 'bold',
    fontSize: 14,
    position: 'absolute',
    right: 17,
    top: 15
  }
});

export default MultiSelect;
