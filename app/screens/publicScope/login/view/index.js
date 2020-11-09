import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator, Animated, Image, Keyboard, Platform,
  Text, TextInput, TouchableOpacity, View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Colors from 'app/constants/Colors';
import Logo from 'app/assets/images/logo.png';

import styles from './styles';


export default class LoginView extends PureComponent {

  static propTypes = {
    logIn: PropTypes.func.isRequired,
    navigateToNotifyList: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      errorMessage: '',
      isLoading: false,
    }

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);

    this.loginFormWrapperMarginBottom = new Animated.Value(0);
    this.loginFormImageContainerHeight = new Animated.Value(340);
  }

  componentDidMount() {
    setTimeout(() => Animated.timing(this.loginFormImageContainerHeight, {
      toValue: 40,
      duration: 2000,
      useNativeDriver: false
    }).start(), 1000);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onChangeLogin = login => this.setState({ login, errorMessage: '' })
  onChangePassword = password => this.setState({ password, errorMessage: '' })

  changeLoading = () => this.setState({ isLoading: !this.state.isLoading })
  changeErrorMessage = errorMessage => this.setState({ errorMessage })

  handleFormSubmit = async () => {
    const { login, password } = this.state;

    this.changeLoading();

    await AsyncStorage.setItem('login', login);
    await AsyncStorage.setItem('secret', password);

    try {
      let responce = await this.props.logIn(login, password);
      console.log(responce.data.session);
      console.log(responce.data.user);
      await AsyncStorage.setItem('session', responce.data.session);

      this.onChangeLogin('');
      this.onChangePassword('');

      this.props.navigateToNotifyList();
    } catch (error) {
      const errorResponse = error.response?.data?.errors;

      if (errorResponse) {
        const errorMessage = errorResponse.map(item => `${item.title}\n${item.detail}`).join();

        this.changeErrorMessage(errorMessage);
      } else {
        this.changeErrorMessage('Не удалось установить соединение с сервером. Попробуйте позже.');
      }
    }

    this.changeLoading();
  }

  render() {
    const { login, password, errorMessage, isLoading } = this.state;
    const isSubmitDisabled = !login || !password || !!errorMessage || isLoading;

    return (
      <View style={styles.loginForm}>
        <Animated.View
          style={[
            styles.loginFormWrapper,
            { marginBottom: this.loginFormWrapperMarginBottom }
          ]}
        >
          <Animated.View
            style={[
              styles.loginFormImageContainer,
              { height: this.loginFormImageContainerHeight }
            ]}
          >
            <Image source={Logo} style={styles.loginFormImage} />
          </Animated.View>

          <View style={styles.loginFormContainer}>
            <View style={[styles.loginFormInputWrapper, styles.loginFormInputWrapperFirst]}>
              <TextInput
                placeholder='Логин'
                placeholderTextColor={Colors.grayBlueLight}
                textContentType='username'
                autoCapitalize='none'
                style={styles.loginFormInput}
                value={this.state.login}
                onChangeText={this.onChangeLogin}
              />
            </View>

            <View style={styles.loginFormInputWrapper}>
              <TextInput
                placeholder='Пароль'
                placeholderTextColor={Colors.grayBlueLight}
                textContentType='password'
                autoCapitalize='none'
                secureTextEntry={true}
                style={styles.loginFormInput}
                value={this.state.password}
                onChangeText={this.onChangePassword}
              />
            </View>

            <View style={styles.loginFormErrorWrapper}>
              {
                !!errorMessage &&
                <Text style={styles.loginFormError}>
                  {errorMessage}
                </Text>
              }
            </View>

            <TouchableOpacity
              style={[styles.loginFormAction, isSubmitDisabled && styles.loginFormActionDisabled]}
              onPress={this.handleFormSubmit}
              disabled={isSubmitDisabled}
              activeOpacity={0.8}
            >
              {
                isLoading ?
                  <ActivityIndicator size='small' color='#fff' /> :
                  <Text style={styles.loginFormActionText}>
                    Войти
                  </Text>
              }
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  }
};
