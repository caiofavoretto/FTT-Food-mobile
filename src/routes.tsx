import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Navigator from './navigator';

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default Routes;
