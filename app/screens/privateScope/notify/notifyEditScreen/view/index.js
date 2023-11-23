import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View, ScrollView } from 'react-native';

import { Input, Select, DateTimeInput, MultiSelect } from 'app/components/form';
import Colors from 'app/constants/Colors';
import Periodic from 'app/constants/Periodic';

import styles from './styles';


const NotifyEditView = ({
  item, isLoading, onSave, listOfCategories, listOfAcceptors
}) => {

  const currentDate = new Date();
  const [editableDate, setDate] = useState(currentDate);
  const [editableItem, setItem] = useState({});
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedPeriod, setSelectedPeriod] = useState();
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState();
  const [selectedAcceptors, setSelectedAcceptors] = useState();

  useEffect(() => {
    setSelectedCategory(item.category_id);
    setSelectedPeriod(item.periodic);
    setSelectedDayOfWeek(item.day_of_week)
    setSelectedAcceptors(item.acceptors)
    setItem(item)

    if (item.date) {
      const separatedDate = item.date.split('-');
      currentDate.setDate(separatedDate[2]);
      currentDate.setMonth(separatedDate[1] - 1)
    }

    if (item.time) {
      const separatedTime = item.time.split(':');
      currentDate.setHours(separatedTime[0]);
      currentDate.setMinutes(separatedTime[1]);
    }

    setDate(currentDate);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.preloaderContainer}>
        <ActivityIndicator size='large' color={Colors.orange} />
      </View>
    );
  }

  const handleChange = (key, value) => {
    let updatedValue = { [key]: value };

    setItem(editableItem => ({
      ...editableItem,
      ...updatedValue
    }));
  }

  const handleChangeDateTime = (type, value) => {
    if (type == 'date') {
      const month = (value.getMonth() + 1) < 10 ? `0${value.getMonth() + 1}` : value.getMonth() + 1;
      const date = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate();
      handleChange(type, `${value.getFullYear()}-${month}-${date}`)
    }

    if (type == 'time') {
      const hours = value.getHours() < 10 ? `0${value.getHours()}` : value.getHours();
      const minutes = value.getMinutes() < 10 ? `0${value.getMinutes()}` : value.getMinutes();
      handleChange(type, `${hours}:${minutes}`)
    }
  }

  const handleSave = () => {
    onSave(editableItem)
  }


  return (
    <ScrollView style={styles.notify} nestedScrollEnabled={true}>
      <View>
        <Input
          label="Notify name"
          value={editableItem.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder=""
        />

        <Input
          label="Text"
          value={editableItem.text}
          multiline={true}
          onChangeText={(text) => handleChange('text', text)}
          placeholder=""
        />

        <Select
          label='Category'
          list={listOfCategories}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);
            editableItem.category_id = itemValue || 0;
          }}
        />

        <Select
          label='Periods'
          list={Periodic.getListOfPeriods()}
          selectedValue={selectedPeriod}
          disableNotSelected={true}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedPeriod(itemValue);
            editableItem.periodic = itemValue;
          }}
        />

        {editableItem.periodic == 'day_of_week' &&
          <Select
            label='Day of week'
            list={Periodic.getListOfWeekDays()}
            selectedValue={selectedDayOfWeek}
            disableNotSelected={true}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedDayOfWeek(itemValue);
              editableItem.day_of_week = itemValue;
            }}
          />
        }

        {Periodic.getPeriodsForDate.includes(editableItem.periodic) &&
          <DateTimeInput
            label="Date"
            mode="date"
            value={editableItem.date}
            date={editableDate}
            onChange={handleChangeDateTime}
          />
        }

        <DateTimeInput
          label="Time"
          mode="time"
          value={editableItem.time}
          date={editableDate}
          onChange={handleChangeDateTime}
        />

        <MultiSelect
          items={listOfAcceptors}
          onSelect={(selectedItems) => {
            setSelectedAcceptors(selectedItems);
            editableItem.acceptors = selectedItems;
          }}
          selectedItems={selectedAcceptors || []}
          placeholder="Pick ..."
          label="Acceptors"
        />
      </View>

      <View style={styles.buttonPlace}>
        <TouchableOpacity onPress={handleSave} style={[styles.buttonlarge]}>
          <Text style={[styles.button, styles.editButton]}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NotifyEditView;
