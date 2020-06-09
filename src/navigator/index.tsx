import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Main from './TabNavigator';

const AppStack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <AppStack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: '#f0f0f5',
        },
      }}
    >
      <AppStack.Screen name="Login" component={Login} />
      <AppStack.Screen name="Main" component={Main} />
    </AppStack.Navigator>
  );
};

export default Routes;
