import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View, TextInput } from 'react-native';

import { Input } from 'app/components/form';
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

    setItem(editableItem => ({
      ...editableItem,
      ...updatedValue
    }));
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.category}>
        <Input
          label="Category name"
          value={editableItem.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder=""
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
