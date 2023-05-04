import React, { useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from 'app/constants/Colors';
import Periodic from 'app/constants/Periodic';

import styles from './styles';


const NotifyView = ({
  item, isLoading, onEdit, onChangeState
}) => {

  if (isLoading) {
    return (
      <View style={styles.preloaderContainer}>
        <ActivityIndicator size='large' color={Colors.orange} />
      </View>
    );
  }

  return (
    <View style={styles.notify}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.text}>
          {item.text ?
            <Text>{item.text}</Text> :
            <Text style={styles.noText}>Description is missing</Text>
          }
        </View>

        <View style={styles.itemInfoRows}>
          <View style={styles.itemInfoRow}>
            <Icon name='repeat' style={styles.icon} />
            <Text style={styles.itemPeriodic}>
              {Periodic.get_periodic[item.periodic]}
            </Text>
          </View>

          {
            item.day_of_week &&
            <View style={styles.itemInfoRow}>
              <Icon name='calendar-week' style={styles.icon} />
              <Text style={styles.itemWeekDay}>
                {Periodic.get_day_of_week[item.day_of_week]}
              </Text>
            </View>
          }

          <View style={styles.itemInfoRow}>
            <Icon name='clock' style={styles.icon} />
            {item.date ?
              <Text>{item.date}  </Text>
              : null}
            <Text>{item.time}</Text>
          </View>
        </View>

        <Text>Acceptors: {item.acceptors.map(el => { return el.name }).join(", ")}</Text>
      </View>
      <View style={styles.buttonRowPlace}>
        <TouchableOpacity onPress={onChangeState} style={[styles.buttonMedium]}>
          {!item.is_disabled ?
            <Text style={[styles.button, styles.disableButton]}>Disable</Text> :
            <Text style={[styles.button, styles.activateButton]}>Activate</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit} style={[styles.buttonMedium]}>
          <Text style={[styles.button, styles.editButton]}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotifyView;
