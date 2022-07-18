import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';

import { PopScreen } from 'app/helpers';
import Colors from 'app/constants/Colors';

import TopbarButton from './topbarButton';


const windowWidth = Dimensions.get('window').width;


export default class Header extends PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    leftButtons: PropTypes.array,
    rightButtons: PropTypes.array,
    callback: PropTypes.func,
  }

  static defaultProps = {
    leftButtons: [],
    rightButtons: [],
  }

  handleGetBack = () => {
    const { backButtonActionArgs: { callback, componentId } } = this.props;

    !!callback && callback();
    !!componentId && setTimeout(() => PopScreen(componentId), 100);
  }

  render() {
    const { title, leftButtons, rightButtons } = this.props;

    return (
      <View style={styles.header}>
        <View style={styles.headerSideInnerBlock}>
          {
            leftButtons.length > 0 ?
              leftButtons.map((Button, index) => {
                const ButtonComponent = Button.component;
                const customPprops = Button.props || {}
                return <ButtonComponent key={`LeftButton_${index}`} {...customPprops} />
              }) :
              <TopbarButton
                iconName='keyboard-backspace'
                action={this.handleGetBack}
              />
          }
        </View>

        <View style={styles.headerInnerBlock}>
          <Text style={styles.headerTitle}>
            {title}
          </Text>
        </View>

        <View style={styles.headerSideInnerBlock}>
          {rightButtons.map((RightButton, index) => (
            <RightButton key={`RightButton_${index}`} />
          ))}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth,
    height: Platform.OS === 'android' ? 61 : 70,
    paddingTop: Platform.OS === 'android' ? 10 : 36,
    paddingBottom: Platform.OS === 'android' ? 2 : 10,
    paddingLeft: 15,
    paddingRight: Platform.OS === 'android' ? 25 : 15,
    backgroundColor: Colors.orange
  },
  headerInnerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: Platform.OS === 'android' ? 'flex-start' : 'center',
    width: '60%',
    marginLeft: Platform.OS === 'android' ? 0 : 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white
  },
  headerSideInnerBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: Platform.OS === 'android' ? '13%' : '10%',
    marginRight: Platform.OS === 'android' ? -20 : 0,
  }
});
