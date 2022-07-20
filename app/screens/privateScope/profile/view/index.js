import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import Colors from 'app/constants/Colors';

import styles from './styles';


const ProfileView = ({
  user, isRefreshing, isLoading,
  handleLogOut, handleReloadApp
}) => {

  let content = null;

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
