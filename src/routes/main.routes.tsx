import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../routes/app.routes';
import EditProfile from '../pages/EditProfile';

const MainStack = createStackNavigator();

const MainRoutes: React.FC = () => (
  <MainStack.Navigator
    headerMode="none"
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
  >
    <MainStack.Screen name="Main" component={Main} />
    <MainStack.Screen name="EditProfile" component={EditProfile} />
  </MainStack.Navigator>
);

export default MainRoutes;
