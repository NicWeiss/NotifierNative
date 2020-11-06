import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from 'app/constants/Colors';


export default class TopbarButton extends PureComponent {

  static propTypes = {
    action: PropTypes.func,
    iconName: PropTypes.string,
  }

  render() {
    const { action, iconName } = this.props;

    return (
      <TouchableOpacity onPress={action}>
        <Icon name={iconName} style={styles.icon} />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  icon: {
    marginRight: Platform.OS === 'android' ? 15 : 0,
    color: Colors.white,
    fontSize: 26
  },
});
