import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, FlatList, View } from 'react-native';

import Colors from 'app/constants/Colors';


export default class FlatListWrapper extends PureComponent {

  static propTypes = {
    list: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired
  }


  handleKeyExtractor = (_, index) => `flatList_item_${index}`;

  render() {
    const { list, renderItem, isRefreshing, onRefresh } = this.props;

    return (
      <Fragment>
        <FlatList
          data={list}
          renderItem={renderItem}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          keyExtractor={this.handleKeyExtractor}
          onEndReachedThreshold={0.01}
        />
      </Fragment>
    );
  }
}
