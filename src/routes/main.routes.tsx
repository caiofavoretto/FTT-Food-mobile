import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createAppContainer } from 'react-navigation';
import { enableScreens } from 'react-native-screens';

enableScreens();

import Main from './app.routes';
import Meal from '../pages/Meal';
import EditProfile from '../pages/EditProfile';

const StackNavigator = createSharedElementStackNavigator(
  {
    Main,
    Meal,
    EditProfile,
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
    defaultNavigationOptions: {
      headerShown: false,
      cardStyle: {
        backgroundColor: 'transparent',
      },
    },
  },
);

export default createAppContainer(StackNavigator);
