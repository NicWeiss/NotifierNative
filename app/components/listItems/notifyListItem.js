import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Status from 'app/components/notifyItem/status';
import DateTimeFromTimestamp from 'app/components/dateTimeFromTimestamp';

import Colors from 'app/constants/Colors';
import Periodic from 'app/constants/Periodic';
import { NavigateTo } from 'app/helpers';


const NotifyListItem = ({ item, index }) => {

  const handleSelectItem = () => NavigateTo('Notify', { notifyId: item.id });

  let color = Colors.red;

  const status = item.status;

  if (status === "1") {
    color = Colors.green;
  }

  return (
    <TouchableOpacity
      onPress={handleSelectItem}
      style={[
        styles.item,
        {
          backgroundColor: Colors.white,
          marginTop: index === 0 ? 5 : 0,
          paddingRight: 24,
        }
      ]}
    >

      <View style={styles.itemInnerWrapper}>
        <View style={[styles.itemLeftPart, { width: '70%' }]}>
          <View style={[styles.itemInfoRow, { marginBottom: 10 }]}>
            <Text style={styles.itemName}>
              {item.name}
            </Text>

          </View>

          <View style={[styles.itemInfoRow, { marginBottom: 4 }]}>
            <Icon name='repeat' style={styles.icon} />
            <Text style={styles.itemPeriodic}>
              {Periodic.get_periodic[item.periodic]}
            </Text>
          </View>

          {
            item.day_of_week &&
            <View style={[styles.itemInfoRow, { marginBottom: 4 }]}>
              <Icon name='calendar-week' style={styles.icon} />
              <Text style={styles.itemWeekDay}>
                {Periodic.get_day_of_week[item.day_of_week]}
              </Text>
            </View>
          }

          <View style={[styles.itemInfoRow, { marginBottom: 0 }]}>
            <Icon name='clock' style={styles.icon} />
            <DateTimeFromTimestamp timestamp={item.date} type='date' />
            <DateTimeFromTimestamp timestamp={item.time} type='time' />
          </View>

        </View>

        <View style={styles.itemRightPart}>
          <View style={styles.itemInfoRow}>

            <Status status={item.status} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingLeft: 4,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: Colors.lightGray,
    marginLeft: 10,
    marginRight: 10
  },
  itemInnerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLeftPart: {
    alignItems: 'flex-start'
  },
  itemRightPart: {
    width: '27%',
    alignItems: 'flex-end'
  },
  itemInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemName: {
    fontSize: 18,
    color: Colors.black
  },
  itemPeriodic: {
    fontSize: 14,
    color: Colors.gray,
  },
  icon: {
    marginRight: 8,
    color: Colors.orange,
    fontSize: 16
  },
});


export default NotifyListItem;
