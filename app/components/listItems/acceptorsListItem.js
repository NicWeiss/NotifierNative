import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Status from 'app/components/notifyItem/status';

import Colors from 'app/constants/Colors';
import { NavigateTo } from 'app/helpers';


const AcceptorsListItem = ({ item, index }) => {

  const handleSelectItem = () => NavigateTo('Acceptor', { acceptorId: item.id });

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
  icon: {
    marginRight: 8,
    color: Colors.orange,
    fontSize: 16
  },
});


export default AcceptorsListItem;
