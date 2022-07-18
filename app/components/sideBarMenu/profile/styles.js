import { StyleSheet } from 'react-native';

import Colors from 'app/constants/Colors';


export default StyleSheet.create({
  profile: {
    backgroundColor: Colors.orange,
    width: '100%',
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20
  },

  userName: {
    color: Colors.darkWhite,
    fontSize: 16,
    fontWeight: 'bold'
  },

  userEmail: {
    color: Colors.lightGray,
    fontSize: 14
  },

  userLogo: {
    height: 70,
    width: 70,
    marginLeft: 10,
    marginTop: 0,
    marginBottom: 15
  }
});
