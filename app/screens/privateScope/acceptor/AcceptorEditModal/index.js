import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import RenderHtml from 'react-native-render-html';

import { Input, Select } from 'app/components/form';
import Colors from 'app/constants/Colors';
import styles from './styles';


const AcceptorEditModal = ({
  item, listOfSystems, isLoading, onHide, onSave
}) => {

  const [editableItem, setItem] = useState({});
  const [selectedSystem, setSelectedSystem] = useState();
  const [systemHelp, setSystemHelp] = useState('<span>test</span>');

  useEffect(() => {
    setItem({ ...item });
    setSystemById(item.system_id);
  }, []);

  const setSystemById = (id) => {
    const system = listOfSystems.filter(el => el.id == id);
    setSelectedSystem(id);

    if (system.length == 1) {
      setSystemHelp(system[0].help)
    } else {
      setSystemHelp('')
    }
    editableItem.system_id = id;
  }

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
            setSystemById(itemValue);
          }}
        />

        {!!systemHelp &&
          <View style={styles.helpContainer}>
            <RenderHtml
              contentWidth={1}
              source={{ html: systemHelp }}
            />
          </View>
        }

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
