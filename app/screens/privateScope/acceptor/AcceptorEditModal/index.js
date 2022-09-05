import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Picker, Text, TouchableOpacity, View, TextInput } from 'react-native';

import { Input, Select } from 'app/components/form';
import Colors from 'app/constants/Colors';
import styles from './styles';


const AcceptorEditModal = ({
  item, listOfSystems, isLoading, onHide, onSave
}) => {

  const [editableItem, setItem] = useState({});
  const [selectedSystem, setSelectedSystem] = useState();

  useEffect(() => {
    setSelectedSystem(item.system_id);
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
      <View style={styles.acceptor}>
        <Input
          label="Acceptor label"
          value={editableItem.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder=""
        />

        <Select
          label='Transport system'
          list={listOfSystems}
          selectedValue={selectedSystem}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedSystem(itemValue);
            editableItem.system_id = itemValue;
          }}
        />

        <Input
          label="Acceptor account in selected system"
          value={editableItem.account}
          onChangeText={(text) => handleChange('account', text)}
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

export default AcceptorEditModal;
