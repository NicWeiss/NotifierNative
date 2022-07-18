import React from 'react';

import { TopbarButton } from 'app/components';


const SideBarMenuButton = (props) => {

  const callFromRef = () => {
    const { backRef } = props
    const sideBarContext = backRef ? backRef.current : () => { };
    sideBarContext.showSideBar()
  }

  return <TopbarButton iconName='menu' action={callFromRef} />;
};

export default SideBarMenuButton;
