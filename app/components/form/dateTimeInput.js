import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker'


const DateTimeInput = ({
  label, mode, date, value, onChange
}) => {

  const [dateForChange, setDate] = useState(date)
  const [isShow, setVisibility] = useState(false)

  const changeVisibility = () => {
    setVisibility(!isShow)
  }

  const handleConfirm = (date) => {
    changeVisibility();
    setDate(date);
    onChange(mode, date);
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={changeVisibility}>
        <Text
          style={styles.input}
        >
          {value}
        </Text>
      </Pressable>

      <DatePicker
        modal
        locale='en-GB'
        textColor="black"
        is24hourSource='locale'
        mode={mode}
        display="inline"
        open={isShow}
        date={dateForChange}
        onConfirm={handleConfirm}
        onCancel={changeVisibility}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 17,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
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

export default DateTimeInput;
