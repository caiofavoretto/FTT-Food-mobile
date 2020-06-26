import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
// import ForgotPassword from '../pages/ForgotPassaord';

const AppStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AppStack.Navigator
    headerMode="none"
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
  >
    <AppStack.Screen name="Login" component={Login} />
    {/* <AppStack.Screen name="ForgotPassaord" component={ForgotPassaord} /> */}
  </AppStack.Navigator>
);

export default AuthRoutes;
