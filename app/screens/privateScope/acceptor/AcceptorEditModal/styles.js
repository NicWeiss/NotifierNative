import { StyleSheet } from 'react-native';

import Colors from 'app/constants/Colors';


export default StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(50,50,50,.8)',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 90,
    padding: 10
  },

  acceptor: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
    width: '100%',
    zIndex: 91,
  },

  input: {
    fontSize: 20,
    marginBottom: 20,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 10
  },


  buttonPlace: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  button: {
    padding: 10,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16
  },

  buttonText: {
    color: Colors.white,
  },

  disableButton: {
    backgroundColor: Colors.red
  },

  cancelButton: {
    backgroundColor: Colors.gray
  },

  saveButton: {
    color: Colors.white,
    backgroundColor: Colors.orange
  },

  preloaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
