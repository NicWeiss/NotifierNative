import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput, View } from 'react-native';


export default class Input extends PureComponent {

  static propTypes = {
    value: PropTypes.any,
    onChangeText: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
  }

  render() {
    const { value, onChangeText, placeholder, label, multiline } = this.props;

    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={[styles.input, multiline ? styles.multiline : {}]}
          value={value}
          multiline={multiline ? true : false}
          numberOfLines={multiline ? 5 : 1}
          onChangeText={(text) => onChangeText(text)}
          placeholder={placeholder}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  input: {
    fontSize: 17,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
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
  }
});
