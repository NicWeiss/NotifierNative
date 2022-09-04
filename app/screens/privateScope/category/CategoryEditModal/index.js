import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View, TextInput } from 'react-native';

import Colors from 'app/constants/Colors';
import styles from './styles';


const CategoryEditModal = ({
  item, isLoading, onHide, onSave
}) => {

  const [editableItem, setItem] = useState({});

  useEffect(() => {
    setItem(item)
  }, []);

  if (isLoading) {
    return (
      <View style={styles.preloaderContainer}>
        <ActivityIndicator size='large' color={Colors.orange} />
      </View>
    );
  }

  const handleSave = () => {
    onSave(editableItem)
  }

  const handleChange = (key, value) => {
    let updatedValue = { [key]: value };
    console.log(updatedValue);
    setItem(editableItem => ({
      ...editableItem,
      ...updatedValue
    }));
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.category}>
        <TextInput
          style={styles.input}
          value={editableItem.name}
          onChangeText={(text) => handleChange('name', text)}
          // onChange={(e) => handleChange('name', e)}
          placeholder="Category name"
        />

        <View style={styles.buttonPlace}>
          <TouchableOpacity onPress={onHide} style={[styles.button, styles.cancelButton]} >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={[styles.button, styles.saveButton]}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CategoryEditModal;
