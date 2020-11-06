import { StyleSheet } from 'react-native';

import Colors from 'app/constants/Colors';


export default StyleSheet.create({
  profile: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.white,
  },
  profileContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  profileKeyValue: {
    marginBottom: 24
  },
  profileKey: {
    marginBottom: 4,
    fontSize: 12,
    color: Colors.gray,
  },
  profileValue: {
    fontSize: 16,
    color: Colors.black,
  },
  profileLink: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
  },
  profileLinkText: {
    fontSize: 16,
    color: Colors.red,
  },
  profileEmptyText: {
    fontSize: 14,
    color: Colors.gray,
  }
});
