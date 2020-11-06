import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, FlatList, View } from 'react-native';

import Colors from 'app/constants/Colors';


export default class FlatListWrapper extends PureComponent {

  static propTypes = {
    list: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired,
    isLoadingMore: PropTypes.bool,
    handleLoadMore: PropTypes.func,
  }

  static defaultProps = {
    isLoadingMore: false,
    handleLoadMore: null,
  }

  handleKeyExtractor = (_, index) => `flatList_item_${index}`;

  handleOnEndReached = () => {
    if (this.props.handleLoadMore !== null) {
      this.props.handleLoadMore();
    }
  }

  render() {
    const { list, renderItem, isRefreshing, onRefresh, isLoadingMore } = this.props;

    return (
      <Fragment>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={this.handleKeyExtractor}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          onMomentumScrollEnd={this.handleOnEndReached}
          onEndReachedThreshold={0.01}
        />

        {
          isLoadingMore &&
          <View style={{ width: '100%', height: 90, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color={Colors.blueDarkest} />
          </View>
        }
      </Fragment>
    );
  }
}
