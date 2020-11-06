import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Colors from 'app/constants/Colors';
// import { card, cash, doneType, prePaymentFull, prePaymentPart, paid } from 'app/constants/Common';
import { NavigateTo } from 'app/helpers';


const OrderListItem = ({ item, index }, isMultiselectActive, selectItem) => {

  const navigateToOrder = () => NavigateTo('Notify', { notifyId: item.id });
  const handleSelectItem = () => selectItem(index);

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
          <View style={[styles.itemInfoRow, { marginBottom: 1 }]}>
            <Text style={styles.itemId}>
              #{item.id} {item.name}
            </Text>

          </View>

          <View style={[styles.itemInfoRow, { marginBottom: 8 }]}>
            <Text style={styles.itemExternalId}>
              {item.periodic}
            </Text>
          </View>

          <View style={[styles.itemInfoRow, { marginBottom: 8 }]}>
            <Text style={styles.itemExternalId}>
              {item.day_of_week} {item.date} {item.time}
            </Text>
          </View>

        </View>

        <View style={styles.itemRightPart}>
          <View style={styles.itemInfoRow}>

            <Text style={[styles.itemPrice, { color }]}>
              {item.status}
            </Text>
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
    width: '100%',
    paddingVertical: 18,
    paddingLeft: 4,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: Colors.grayBlueMostLight,
    marginLeft: 20,
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
  itemId: {
    fontSize: 16,
    color: Colors.blackLight
  },
  itemExternalId: {
    fontSize: 14,
    color: Colors.gray,
  },
  itemIconMain: {
    marginLeft: 5,
    fontSize: 22,
    color: Colors.red
  },
  itemIcon: {
    marginRight: 5,
    fontSize: 15,
    color: Colors.gray
  },
  itemInfo: {
    color: Colors.gray,
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 16
  }
});


export default OrderListItem;
