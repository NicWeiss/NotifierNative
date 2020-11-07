import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import Colors from 'app/constants/Colors';

import styles from './styles';


const ProfileView = ({
 item, isLoading
}) => {

  if (isLoading) {
    return (
      <View style={styles.profileContentContainer}>
        <ActivityIndicator size='large' color={Colors.orange} />
      </View>
    );
  }

  return (
    <View style={styles.profile}>
    <Text> #{item.id}</Text>
      <Text>Статус: {item.status}</Text>
      <Text>Периодичность: {item.periodic}</Text>
      <Text>Название: {item.name}</Text>
      <Text>Описание: {item.text}</Text>
      <Text>День недели: {item.day_of_week}</Text>
      <Text>Дата и время: {item.date} {item.time}</Text>
      <Text>Список получателей: {item.acceptorsList.map(item => {return item.name}).join(", ")}</Text>
    </View>
  );
};

export default ProfileView;
