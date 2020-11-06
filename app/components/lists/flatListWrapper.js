import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, FlatList, View } from 'react-native';

import Colors from 'app/constants/Colors';


export default class FlatListWrapper extends PureComponent {

  static propTypes = {
    list: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
  }


  handleKeyExtractor = (_, index) => `flatList_item_${index}`;

  render() {
    const { list, renderItem } = this.props;

    return (
      <Fragment>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={this.handleKeyExtractor}
          onEndReachedThreshold={0.01}
        />
      </Fragment>
    );
  }
}
