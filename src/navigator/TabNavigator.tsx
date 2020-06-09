import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../pages/Home';

const AppTabs = createBottomTabNavigator();

const Routes: React.FC = () => {
  return (
    <AppTabs.Navigator>
      <AppTabs.Screen name="Search" component={Home} />
      <AppTabs.Screen name="Menu" component={Home} />
      <AppTabs.Screen name="Favorite" component={Home} />
      <AppTabs.Screen name="Profile" component={Home} />
    </AppTabs.Navigator>
  );
};

export default Routes;
