import React from 'react';
import {
  ActivityIndicator, Dimensions, Platform,
  RefreshControl, ScrollView, StyleSheet, Text, View
} from 'react-native';

import Colors from 'app/constants/Colors';

import Container from './container';


const deviceHeight = Dimensions.get('window').height;
const headerHeight = Platform.OS === 'android' ? 61 : 70;
const tabButtonHeight = 48;
const panelHeight = 52;

const ScreenWrapper = ({
  isLoading = false,
  isRefreshing,
  refreshData,
  isDataEmpty,
  isTab = false,
  isWithTopPanel = false,
  isWithBottomPanel = false,
  emptyDataMessage,
  children
}) => {
  let containerHeight = deviceHeight - headerHeight;

  if (isTab) {
    containerHeight -= tabButtonHeight;
  }

  if (isWithTopPanel) {
    containerHeight -= panelHeight;
  }

  if (isWithBottomPanel) {
    containerHeight -= panelHeight * 3;
  }

  if (isLoading) {
    return (
      <View style={[styles.container, { height: containerHeight }]}>
        <ActivityIndicator size='large' color={Colors.orange} />
      </View>
    );
  } else if (!isLoading && !isRefreshing && isDataEmpty && !!emptyDataMessage) {
    return (
      <Container>
        <ScrollView
          contentContainerStyle={[styles.container, { height: containerHeight }]}
          refreshControl={
            <RefreshControl
              style={styles.refreshControl}
              refreshing={isRefreshing}
              onRefresh={refreshData}
            />
          }
        >
          <Text style={styles.emptyDataMessage}>
            {emptyDataMessage}
          </Text>
        </ScrollView>
      </Container>
    );
  } else {
    return children;
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.white
  },
  refreshControl: {
    backgroundColor: Colors.white
  },
  emptyDataMessage: {
    width: '70%',
    textAlign: 'center',
    fontSize: 17,
    color: Colors.black
  }
});

export default ScreenWrapper;