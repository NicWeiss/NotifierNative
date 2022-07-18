import React from 'react';

import { Image, Text, View } from 'react-native';

import DefaultUserLogo from 'app/assets/images/defaultUserLogo.png';
import styles from './styles';


const Profile = (props) => {

  return (
    <View style={styles.profile}>
      <Image
        style={styles.userLogo}
        source={DefaultUserLogo}
      />
      <Text style={styles.userName}> Username </Text>
      <Text style={styles.userEmail}> User email </Text>
    </View>
  );
};

export default Profile;
