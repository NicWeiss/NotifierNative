import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import Colors from 'app/constants/Colors';

import styles from './styles';


const ProfileView = ({
  user, isRefreshing, isLoading,
  handleLogOut, handleReloadApp
}) => {

  let content = null;

  if (isLoading || isRefreshing) {
    content = (
      <View style={styles.profileContentContainer}>
        <ActivityIndicator size='large' color={Colors.orange} />
      </View>
    );
  } else if (user.name === null) {
    content = (
      <View style={styles.profileContentContainer}>
        <Text style={styles.profileEmptyText}>Не удалось загрузить данные пользователя</Text>
      </View>
    );
  } else {
    content = (
      <View style={styles.profileKeyValue}>
        <Text style={styles.profileKey}>Пользователь</Text>
        <Text style={styles.profileValue}>{user.name}</Text>
      </View>
    );
  }

  return (
    <View style={styles.profile}>

      {content}

      <TouchableOpacity
        style={styles.profileLink}
        onPress={handleReloadApp}
      >
        <Text style={styles.profileLinkText}>Перезагрузить приложение</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileLink}
        onPress={handleLogOut}
      >
        <Text style={styles.profileLinkText}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileView;
