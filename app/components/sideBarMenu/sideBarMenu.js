import React, { PureComponent } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { AwaitableAnimation } from 'app/helpers';
import { Animated, Text, Pressable } from 'react-native';

import Options from './options';
import Profile from './profile';
import styles from './styles';

export default class SideBarMenu extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isLock: false,
      xOffset: 0,
      xDiff: 0,
      // sidebarLeft: new Animated.Value(0),
      // opacity: new Animated.Value(0.7),
      // containerWidth: new Animated.Value(100)
      sidebarLeftX: -70,
      sidebarLeft: new Animated.Value(-70),
      opacity: new Animated.Value(0),
      containerWidth: new Animated.Value(5),
    };
  }

  async showSideBar() {
    console.log('show');
    await AwaitableAnimation(this.state.containerWidth, 100, 1)
    AwaitableAnimation(this.state.sidebarLeft, 0, 150)
    AwaitableAnimation(this.state.opacity, 0.5, 150)
    this.state.sidebarLeftX = 0;
    this.state.isLock = false;
  }

  async hideSideBar() {
    console.log('hide');
    AwaitableAnimation(this.state.sidebarLeft, -70, 150)
    await AwaitableAnimation(this.state.opacity, 0, 150)
    AwaitableAnimation(this.state.containerWidth, 5, 1)
    this.state.sidebarLeftX = -70;
    this.state.isLock = false;
  }

  onSwipeLeft(gestureState) {
    console.log('swipe L');
    this.state.isLock = true;
    this.hideSideBar();
  }

  onSwipeRight(gestureState) {
    console.log('swipe R');
    this.state.isLock = true;
    this.showSideBar();
  }

  onTouchMove(e) {
    if (this.state.xOffset == 0) {
      this.state.xOffset = e.nativeEvent.pageX;
    }

    let xDiff = (this.state.xOffset - e.nativeEvent.pageX) / 5;

    if (
      (this.state.sidebarLeftX - xDiff > 0) ||
      xDiff == 0
    ) {
      return;
    }

    this.state.xDiff = xDiff;
    let opacity = (1 - (((this.state.sidebarLeftX + (xDiff * -1)) * (-1)) / 70)) / 2

    AwaitableAnimation(this.state.containerWidth, 100, 1)
    AwaitableAnimation(this.state.sidebarLeft, this.state.sidebarLeftX + (xDiff * -1), 1)
    AwaitableAnimation(this.state.opacity, opacity, 1)
  }

  onTouchEnd() {
    if (!this.state.isLock) {
      if (this.state.xDiff < 30) {
        this.showSideBar();
      } else {
        this.hideSideBar();
      }
    }

    this.state.xOffset = 0;
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <Animated.View
        onTouchMove={e => this.onTouchMove(e)}
        onTouchEnd={e => this.onTouchEnd(e)}
        style={[styles.container, {
        }]}
      >
        <GestureRecognizer
          onSwipeLeft={(state) => this.onSwipeLeft(state)}
          onSwipeRight={(state) => this.onSwipeRight(state)}
          config={config}
        >
          <Animated.View
            style={[
              styles.backscreen,
              {
                opacity: this.state.opacity,
                width: this.state.containerWidth.interpolate({
                  inputRange: [-100, 100],
                  outputRange: ['-100%', '100%']
                }),
              }
            ]}
          >
            <Pressable
              style={styles.backscreen}
              onPress={() => this.onSwipeLeft()}
            />
          </Animated.View>
          <Animated.View style={[
            styles.sidebar,
            {
              left: this.state.sidebarLeft.interpolate({
                inputRange: [-100, 100],
                outputRange: ['-100%', '100%']
              })
            }
          ]}>
            <Profile />
            <Options />
          </Animated.View>
        </GestureRecognizer>
      </Animated.View>
    );
  }
}

// SideBarMenu.options = {
//   topBar: { visible: false }
// };

// export default SideBarMenu;
