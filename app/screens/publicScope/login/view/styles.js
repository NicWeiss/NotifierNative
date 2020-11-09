import { StyleSheet } from 'react-native';

import Colors from 'app/constants/Colors';

export default StyleSheet.create({
  loginForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange
  },
  loginFormWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300
  },
  loginFormImageContainer: {
    position: 'absolute',
    top: 20,
    justifyContent: 'center',
    // alignItems: 'center',
    // height: 1000,
    // width: '100%',
    backgroundColor: Colors.orange,
    zIndex: 2,
  },
  loginFormImage: {
    top: -40,
    width: 300,
    height: 200
  },
  loginFormContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    height: 420,
    width: '70%',
    zIndex: 1,
  },
  loginFormInputWrapper: {
    width: '100%',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.white
  },
  loginFormInputWrapperFirst: {
    marginBottom: 25
  },
  loginFormInput: {
    width: '100%',
    height: 50,
    borderWidth: 0,
    fontSize: 16,
  },
  loginFormErrorWrapper: {
    width: '100%',
    height: 65,
    justifyContent: 'center'
  },
  loginFormError: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.darkRed
  },
  loginFormAction: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: Colors.darkOrange
  },
  loginFormActionDisabled: {
    backgroundColor: Colors.darkestdOrange
  },
  loginFormActionText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white
  }
});
