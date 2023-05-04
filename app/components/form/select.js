import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-community/picker';


export default class Select extends PureComponent {

  static propTypes = {
    list: PropTypes.array.isRequired,
    selectedValue: PropTypes.any,
    onValueChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
  }

  render() {
    const { label, list, labelKey, valueKey, onValueChange, placeholder, selectedValue,
      disableNotSelected, skipByField, skipWithValue } = this.props;

    const handlePick = (itemValue, itemIndex) => {
      if (itemIndex == 0 && disableNotSelected) {
        return;
      }

      onValueChange(itemValue, itemIndex);
    }


    return (
      <View>
        <Text style={styles.label}>{label}</Text>

        <View style={styles.select}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => handlePick(itemValue, itemIndex)}
          >

            <Picker.Item
              label={placeholder || 'Not selected'}
              value=''
              key={(Math.random() + 1).toString(36).substring(7)} />

            {list.map(element => {
              if (skipByField && skipWithValue) {
                if (element[skipByField] == skipWithValue) {
                  return
                }
              }
              return (<Picker.Item
                label={element[labelKey || 'name']}
                value={element[valueKey || 'id']}
                key={(Math.random() + 1).toString(36).substring(7)} />)
            }
            )}
          </Picker>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  select: {
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5
  },

  label: {
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 0,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 0,
    alignSelf: "flex-start"
  }
});
