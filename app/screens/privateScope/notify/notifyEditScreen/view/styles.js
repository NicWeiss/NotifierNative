import { StyleSheet } from 'react-native';

import Colors from 'app/constants/Colors';


export default StyleSheet.create({
  notify: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },

  name: {
    fontSize: 24,
    marginBottom: 20,
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },

  text: {
    backgroundColor: '#f5f5f5',
    height: '40%',
    padding: 15,
    marginBottom: 20
  },

  noText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
    color: '#aaa'
  },

  icon: {
    marginRight: 8,
    color: Colors.orange,
    fontSize: 16
  },

  itemInfoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  itemInfoRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },

  buttonPlace: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40
  },

  buttonRowPlace: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  button: {
    marginVertical: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16
  },

  buttonMedium: {
    width: '50%',
    padding: 10,
  },

  buttonlarge: {
    width: '100%',
    marginVertical: 10,
  },

  disableButton: {
    color: Colors.white,
    backgroundColor: Colors.red
  },

  editButton: {
    color: Colors.white,
    backgroundColor: Colors.orange
  },

  activateButton: {
    color: Colors.white,
    backgroundColor: Colors.green
  },

  preloaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
