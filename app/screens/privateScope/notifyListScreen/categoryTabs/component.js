import React, { Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';
// import GestureRecognizer from 'react-native-swipe-gestures';
// import { AwaitableAnimation } from 'app/helpers';
import { Animated, Text, FlatList, ScrollView, View } from 'react-native';
import CategoryStoreContext from 'app/stores/lists/category';

import styles from './styles';
import CategoryItem from './categoryItem';
import SeparatorItem from './separatorItem';

const CategoryTabs = observer((props) => {
  const { onSelect } = props
  let { list, isLoading, isRefreshing, refreshData } = useContext(CategoryStoreContext);
  const newList = [
    { id: "0", name: "Без категории" },
    ...list.filter((item => item.is_hidden != 1))
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

// import React, { useContext, useEffect } from 'react';

// import NotifyStoreContext from 'app/stores/lists/notify';

// import NotifyListSampleTab from './tabSample';


// const NotifyListNotifyTab = observer( () => {

//   let { list, isLoading, isRefreshing,  refreshData } = useContext(NotifyStoreContext);

//   return (
//     <NotifyListSampleTab
//       emptyDataMessage='Список уведомлений пуст'
//       isLoading={isLoading}
//       list={list}
//       isRefreshing={isRefreshing}
//       refreshData={refreshData}
//       type='notify'
//     />
//   );
// });

export default CategoryTabs;
