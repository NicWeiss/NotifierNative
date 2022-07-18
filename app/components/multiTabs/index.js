import React, { PureComponent } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { AwaitableAnimation } from 'app/helpers';
import { Animated, Text, Pressable } from 'react-native';

import Options from './components/options';
import Profile from './components/profile';
import styles from './styles';

class MultiTabs extends PureComponent {

  constructor(props) {
    super(props);
  }

  onTouchMove(e) {
    console.log('move tabs');
  }

  onTouchEnd() {
    console.log('touch tab end');
  }

  render() {

    return (
      <View style={styles.container}>
      </View>
    );
  }
}

MultiTabs.options = {
  topBar: { visible: false }
};

export default MultiTabs;
