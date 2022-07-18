import { StyleSheet } from 'react-native';

import Colors from 'app/constants/Colors';


export default StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 1
  },

  backscreen: {
    backgroundColor: Colors.black,
    top: 0,
    left: 0,
    zIndex: 90,
    width: '100%',
    height: '100%',
    opacity: 0.5
  },

  sidebar: {
    backgroundColor: Colors.darkWhite,
    position: 'absolute',
    zIndex: 99,
    top: 0,
    left: '-70%',
    height: '100%',
    width: '70%',
  }
});
