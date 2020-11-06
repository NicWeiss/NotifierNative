import React from 'react';

import { NavigateTo } from 'app/helpers';
import { TopbarButton } from 'app/components';


const NotifyListTopbarLeftButton = () => {

  const handleOnPress = () => NavigateTo('Profile');

  return <TopbarButton iconName='account' action={handleOnPress} />;
};

export default NotifyListTopbarLeftButton;
