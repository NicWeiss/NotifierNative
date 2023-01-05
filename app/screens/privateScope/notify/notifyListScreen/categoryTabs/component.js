import React, { Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { FlatList, View } from 'react-native';
import CategoryStoreContext from 'app/stores/lists/category';

import styles from './styles';
import CategoryItem from './categoryItem';
import SeparatorItem from './separatorItem';

const CategoryTabs = observer((props) => {
  const { onSelect } = props
  let { list } = useContext(CategoryStoreContext);
  const newList = [
    { id: "0", name: "Uncategorized" },
    ...list.filter((item => item && item.is_hidden != 1))
  ]

  const callback = (id) => {
    onSelect(id)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={newList}
        renderItem={(item, i) => (
          <CategoryItem
            item={item.item}
            callback={callback} />
        )}
        style={styles.categoryList}
        horizontal={true}
        ItemSeparatorComponent={SeparatorItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
});


export default CategoryTabs;
