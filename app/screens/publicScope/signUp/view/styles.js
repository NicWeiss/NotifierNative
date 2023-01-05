import { StyleSheet } from 'react-native';

import Colors from 'app/constants/Colors';

export default StyleSheet.create({
  signUpWrapper: {
    position: 'absolute',
    bottom: 40,
  },
  signUp: {
    color: '#fff',
    fontSize: 16,
    padding: 20
  },
  signUpForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange
  },
  signUpFormWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    // height: 300,
  },
  signUpHeader: {
    textAlign: 'center',
    width: '100%',
    fontSize: 40,
    fontWeight: '900',
    paddingBottom: 60
  },
  signUpFormImageContainer: {
    position: 'absolute',
    top: 20,
    justifyContent: 'center',
    height: 40,
    backgroundColor: Colors.orange,
    zIndex: 2,
  },
  signUpFormImage: {
    top: -40,
    width: 300,
    height: 200,
    backgroundColor: Colors.orange,
  },
  signUpFormContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    height: 420,
    width: '70%',
    zIndex: 1,
  },
  signUpFormInputWrapper: {
    width: '100%',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.white
  },
  signUpFormInputWrapperFirst: {
    marginBottom: 25
  },
  signUpFormInput: {
    width: '100%',
    height: 50,
    borderWidth: 0,
    fontSize: 16,
  },
  disabledField: {
    backgroundColor: '#a76032'
  },
  signUpFormErrorWrapper: {
    width: '100%',
    height: 65,
    justifyContent: 'center'
  },
  signUpFormError: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.darkRed
  },
  signUpFormAction: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: Colors.darkestdOrange
  },
  signUpFormActionDisabled: {
    backgroundColor: Colors.disabledOrange
  },
  signUpFormActionText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white
  }
});
