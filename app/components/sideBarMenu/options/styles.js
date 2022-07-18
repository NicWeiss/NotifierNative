import { StyleSheet } from 'react-native';

import Colors from 'app/constants/Colors';


export default StyleSheet.create({
  container: {
    padding: 10
  },

  item: {
    // backgroundColor: Colors.orange,
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
    padding: 8
  },

  itemName: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 20
  },

  itemImage: {
    fontWeight: 'bold',
    fontSize: 18
  }
});
