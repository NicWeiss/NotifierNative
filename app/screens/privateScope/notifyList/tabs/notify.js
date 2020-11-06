import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import NotifyListNotifyContext from 'app/stores/notifyList/notify';

import NotifyListSampleTab from './tabSample';


const NotifyListNotifyTab = observer(props => {

  const { list, isLoading } = useContext(NotifyListNotifyContext);


  console.log('NOTIFY COUNT ----------->', list.length);
  console.log('IS LOADING?', isLoading);

  return (
    <NotifyListSampleTab
      emptyDataMessage='Список уведомлений пуст'
      isLoading={isLoading}
      list={list}
    />
  );
});

export default NotifyListNotifyTab;
