import React from 'react';
import { observer } from 'mobx-react-lite';


// import { NavigateTo } from 'app/helpers';
import { TopbarButton } from 'app/components';


const OrderListTopbarRightButton = observer(props => {

  const handleOnCreate = () => {
    // NavigateTo('');
    console.log();
  };

  return (
    <TopbarButton iconName='plus' action={handleOnCreate} />
  );
});



export default OrderListTopbarRightButton;
