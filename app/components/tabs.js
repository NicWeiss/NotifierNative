import React, { cloneElement, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Animated, Dimensions, ScrollView,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

import Colors from 'app/constants/Colors';


const deviceWidth = Dimensions.get('window').width;


export default class Tabs extends PureComponent {

  static propTypes = {
    propsToTabs: PropTypes.object,
    tabNames: PropTypes.array.isRequired,
    tabFuncComponents: PropTypes.array.isRequired,
    isScrollEnabled: PropTypes.bool,
  }

  static defaultProps = {
    bottomPanel: [],
    bottomPanelProps: {},
    propsToTabs: {},
    isScrollEnabled: true,
  }

  constructor(props) {
    super(props);

    this.scrollViewWidth = (this.props.tabFuncComponents.length - 1) * deviceWidth;
    this.tabNameWidth = deviceWidth / this.props.tabNames.length;
    this.tabNameSelectedUnderlineXPosition = new Animated.Value(0);

    this.state = { currentTabIndex: 0 };
  }

  onTabChange = index => {
    this.scrollView.scrollTo({ x: deviceWidth * index, y: 0, animated: true });
  }

  handleOnScroll = value => {
    const tabNames = this.props.tabNames;
    const xOffSet = value.nativeEvent.contentOffset.x;

    let currentTabIndex = '';

    tabNames.forEach((_, index) => {
      if (
        Math.trunc(xOffSet) >= Math.trunc(deviceWidth * index) &&
        Math.trunc(xOffSet) <= Math.trunc(deviceWidth * (index + 1))
      ) {
        currentTabIndex = index;
      }
    });

    this.changeTabNameSelectedUnderlineXPosition(xOffSet / tabNames.length);
    this.setState({ currentTabIndex });
  }

  changeTabNameSelectedUnderlineXPosition = value => Animated.timing(this.tabNameSelectedUnderlineXPosition, {
    toValue: value,
    duration: 5,
    useNativeDriver: false
  }).start()

  render() {
    const currentTabIndex = this.state.currentTabIndex;
    const {
      isScrollEnabled, bottomPanel, bottomPanelProps,
      tabNames, tabFuncComponents, propsToTabs
    } = this.props;

    return (
      <Fragment>

        <View style={styles.tabNames}>
          <View style={styles.tabNamesContainer}>
            {
              tabNames.map((name, index) => (
                <TouchableOpacity
                  key={`tabName_${index}`}
                  onPress={() => this.onTabChange(index)}
                  style={[
                    styles.tabName,
                    { width: this.tabNameWidth }
                  ]}
                >
                  <Text style={styles.tabNameText}>
                    {name}
                  </Text>
                </TouchableOpacity>
              ))
            }
          </View>

          <Animated.View
            style={[
              styles.tabNameSelectedUnderline,
              {
                width: `${100 / tabNames.length}%`,
                left: this.tabNameSelectedUnderlineXPosition
              }
            ]}
          />
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          bounces={false}
          scrollEventThrottle={10}
          scrollToOverflowEnabled={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={isScrollEnabled}
          ref={scrollView => { this.scrollView = scrollView; }}
          onScroll={this.handleOnScroll}
          style={bottomPanel.length === 0 ? styles.tabsContainerAlone : styles.tabsContainerWithBottomPanel}
        >
          {
            tabFuncComponents.map((TabFuncComponent, index) => (
              <View
                key={`tab_${index}`}
                style={styles.tabContainer}
              >
                {
                  cloneElement(
                    <TabFuncComponent />,
                    {
                      isSelected: currentTabIndex === index,
                      ...propsToTabs
                    }
                  )
                }
              </View>
            ))
          }
        </ScrollView>

        {
          bottomPanel.map((BottomPanelFuncComponent, index) => (
            <View key={`bottomPanel_${index}`}>
              {cloneElement(<BottomPanelFuncComponent />, { currentTabIndex, changeTab: this.onTabChange, ...bottomPanelProps })}
            </View>
          ))
        }
      </Fragment>
    );
  }
};

const styles = StyleSheet.create({
  tabsContainerAlone: {
    height: '100%',
  },
  tabsContainerWithBottomPanel: {
    height: '30%',
  },
  tabContainer: {
    width: '100%',
  },
  tabNames: {
    backgroundColor: Colors.orange,
  },
  tabNamesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 48,
  },
  tabName: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  tabNameSelectedUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 4,
    backgroundColor: Colors.darkOrange
  },
  tabNameText: {
    color: Colors.white,
    fontSize: 16,
  },
  tabsContainer: {
    height: '100%',
    backgroundColor: 'gray'
  },
  tabContainer: {
    width: deviceWidth,
  }
});
