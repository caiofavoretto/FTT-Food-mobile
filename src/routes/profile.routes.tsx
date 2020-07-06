import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';

import Profile from '../pages/Profile';
import Settings from '../pages/Settings';

const ProfileStack = createStackNavigator();

interface EditProfileParams {
  title: string;
  data?: string;
  type: 'email' | 'password';
}

interface Params {
  navigateToEditProfile(params: EditProfileParams): void;
}

const ProfileRoutes: React.FC = () => {
  const route = useRoute();

  const { navigateToEditProfile } = route.params as Params;

  return (
    <ProfileStack.Navigator
      headerMode="none"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        initialParams={{ navigateToEditProfile }}
      />

      <ProfileStack.Screen name="Settings" component={Settings} />
    </ProfileStack.Navigator>
  );
};

export default ProfileRoutes;
