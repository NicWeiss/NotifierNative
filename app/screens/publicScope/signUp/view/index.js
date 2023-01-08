import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ShowToast } from 'app/helpers';
import Colors from 'app/constants/Colors';

import styles from './styles';

const RE_PASSSWORD = /^([#$%^&*_+=@\-0-9a-zA-Z]){8,}$/
const RE_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const SignUpView = ({ onGetCode, onCompleteRegistration }) => {
  const [userData, setUserData] = useState({});
  const [isEnableCodefield, setCodeFieldState] = useState(false);

  const handleChange = (key, value) => {
    let updatedValue = { [key]: value || '' };

    setUserData(userData => ({
      ...userData,
      ...updatedValue
    }));
  }

  const validate = () => {
    if (!userData.password || !userData.password.match(RE_PASSSWORD)) {
      ShowToast(`Password is weak. Use more than 8 characters in different case with numbers`);

      return false;
    }

    if (!userData.email || !userData.email.match(RE_EMAIL)) {
      ShowToast(`Email is incorrect`);

      return false;
    }

    if (!userData.name || userData.name.length < 4) {
      ShowToast(`Name is too short`);

      return false;
    }

    return true;
  }

  const handleGetCode = () => {
    if (validate()) {
      onGetCode(userData.email);
      setCodeFieldState(true);
    }
  }

  const handleCompleteRegistration = () => {
    if (validate()) {
      onCompleteRegistration(userData);
    }
  }

  return (
    <View style={styles.signUpForm}>
      <View style={styles.signUpFormContainer}>
        <Text style={styles.signUpHeader}>
          SIGN UP
        </Text>

        <View style={[styles.signUpFormInputWrapper, styles.signUpFormInputWrapperFirst]}>
          <TextInput
            placeholder='Email'
            placeholderTextColor={Colors.grayBlueLight}
            textContentType='emailAddress'
            autoCapitalize='none'
            style={styles.signUpFormInput}
            onChangeText={(value) => handleChange('email', value)}
          />
        </View>

        <View style={[styles.signUpFormInputWrapper, styles.signUpFormInputWrapperFirst]}>
          <TextInput
            placeholder='Name'
            placeholderTextColor={Colors.grayBlueLight}
            textContentType='username'
            autoCapitalize='none'
            style={styles.signUpFormInput}
            onChangeText={(value) => handleChange('name', value)}
          />
        </View>

        <View style={[styles.signUpFormInputWrapper, styles.signUpFormInputWrapperFirst]}>
          <TextInput
            placeholder='Password'
            placeholderTextColor={Colors.grayBlueLight}
            textContentType='password'
            autoCapitalize='none'
            style={styles.signUpFormInput}
            secureTextEntry={true}
            onChangeText={(value) => handleChange('password', value)}
          />
        </View>

        <View style={[
          styles.signUpFormInputWrapper, styles.signUpFormInputWrapperFirst,
          isEnableCodefield ? {} : styles.disabledField
        ]}>
          <TextInput
            placeholder='Code'
            placeholderTextColor={Colors.grayBlueLight}
            textContentType='oneTimeCode'
            autoCapitalize='none'
            style={styles.signUpFormInput}
            keyboardType='numeric'
            onChangeText={(value) => handleChange('code', value)}
            editable={isEnableCodefield}
          />
        </View>

        {!userData.code &&
          <TouchableOpacity
            style={[styles.signUpFormAction]}
            onPress={handleGetCode}
            activeOpacity={0.8}
          >
            <Text style={styles.signUpFormActionText}>
              Get code
            </Text>
          </TouchableOpacity>
        }

        {!!userData.code &&
          <TouchableOpacity
            style={[styles.signUpFormAction]}
            onPress={handleCompleteRegistration}
            activeOpacity={0.8}
          >
            <Text style={styles.signUpFormActionText}>
              Complete registration
            </Text>
          </TouchableOpacity>
        }
      </View>
    </View >
  );
}

export default SignUpView;
