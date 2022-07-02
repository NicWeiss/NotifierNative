import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator, Animated, Image, Keyboard, Platform,
  Text, TextInput, TouchableOpacity, View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { AwaitableAnimation } from 'app/helpers';
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
      isHideInputs: true,
    }
    setTimeout(() => this.checkAuth(this), 1);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);

    this.inputsOpacity = new Animated.Value(0);
    this.loginFormHeight = new Animated.Value(1);
  }


  checkAuth = async (context) => {
    console.log('Checking!');

    const session = await AsyncStorage.getItem('session');
    console.log(session);

    if (typeof session != 'string') {
      console.log('Session not found! Show inputs!');
      this.showInputs();
      return;
    }

    try {
      await this.props.checkSession()
    } catch (e) {
      console.log(e)
      console.log('Session not verified! Show inputs!');
      this.showInputs();
      this.props.clearSession();
      return;
    }

    console.log('Session valid!');
    context.props.navigateToNotifyList();
  };


  async showInputs() {
    this.setState({ isHideInputs: false });
    await AwaitableAnimation(this.loginFormHeight, 300, 1000)
    await AwaitableAnimation(this.inputsOpacity, 1, 1000)
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
      let response = await this.props.logIn(login, password);
      console.log(response.data.session);
      console.log(response.data.user);

      await AsyncStorage.setItem('session', response.data.session);

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
    const { login, password, errorMessage, isLoading, isHideInputs } = this.state;
    const isSubmitDisabled = !login || !password || !!errorMessage || isLoading;

    return (
      <View style={styles.loginForm}>
        <Animated.View
          style={[
            styles.loginFormWrapper,
            { height: this.loginFormHeight }
          ]}
        >
          <View
            style={[
              styles.loginFormImageContainer
            ]}
          >
            <Image source={Logo} style={styles.loginFormImage} />
          </View>

          {
            !isHideInputs &&
            <Animated.View style={[
              styles.loginFormContainer,
              { opacity: this.inputsOpacity }
            ]}>
              <View style={[styles.loginFormInputWrapper, styles.loginFormInputWrapperFirst]}>
                <TextInput
                  placeholder='Email'
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
                  placeholder='Pass'
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
                      Let me in
                    </Text>
                }
              </TouchableOpacity>
            </Animated.View>
          }
        </Animated.View>
      </View>
    );
  }
};
