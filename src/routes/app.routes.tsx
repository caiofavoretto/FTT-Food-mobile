import React, { useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppLoading } from 'expo';

import {
  Feather as Icon,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Menu from '../pages/Menu';
import Profile from '../routes/profile.routes';
import Search from '../pages/Search';
import Feed from '../pages/Feed';

const AppTabs = createBottomTabNavigator();

interface EditProfileParams {
  title: string;
  data?: string;
}

const AppRoutes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1);

    setTimeout(() => {
      setLoadingMenu(false);
    }, 0.2);
  }, []);

  const handleNavgateToEditProfile = useCallback(
    (params: EditProfileParams) => {
      navigation.navigate('EditProfile', params);
    },
    [],
  );

  if (loading) {
    return <AppLoading />;
  }

  return (
    <AppTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Search') {
            iconName = 'search';
            return <FontAwesome name={iconName} size={26} color={color} />;
          } else if (route.name === 'Menu') {
            iconName = 'book-open';
            return <FontAwesome5 name={iconName} size={26} color={color} />;
          } else if (route.name === 'Feed') {
            iconName = 'favorite';
            return <MaterialIcons name={iconName} size={28} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = 'user-alt';
            return <FontAwesome5 name={iconName} size={26} color={color} />;
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={28} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          if (route.name === 'Search') {
            color = focused ? '#710502' : '#fff';
          } else if (route.name === 'Menu') {
            color = focused ? '#710502' : '#fff';
          } else if (route.name === 'Feed') {
            color = focused ? '#710502' : '#fff';
          } else if (route.name === 'Profile') {
            color = focused ? '#710502' : '#fff';
          }

          // You can return any component that you like here!
          return <FontAwesome name="circle" size={6} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#710502',
        inactiveTintColor: '#B0B0BF',
        tabStyle: {
          backgroundColor: 'transparent',
          paddingTop: 16,
          paddingBottom: Platform.OS === 'ios' ? 0 : 8,
        },
        style: {
          height: Platform.OS === 'ios' ? 100 : 80,
        },
      }}
      initialRouteName="Menu"
      backBehavior="initialRoute"
    >
      {!loadingMenu && <AppTabs.Screen name="Search" component={Search} />}
      <AppTabs.Screen name="Menu" component={Menu} />
      {!loadingMenu && <AppTabs.Screen name="Feed" component={Feed} />}
      {!loadingMenu && (
        <AppTabs.Screen
          name="Profile"
          component={Profile}
          initialParams={{
            navigateToEditProfile: handleNavgateToEditProfile,
          }}
        />
      )}
    </AppTabs.Navigator>
  );
};

export default AppRoutes;
