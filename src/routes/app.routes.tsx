import React, { useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppLoading } from 'expo';
import { useTheme } from '../hooks/theme';

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
  const { getCurrentTheme } = useTheme();

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

  const darkThemeStyle = {
    borderTopWidth: 0,
    borderTopColor: 'transparent',

    elevation: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
    shadowRadius: 0,

    height: Platform.OS === 'ios' ? 71 : 60,
  };

  const lightThemeStyle = {
    height: Platform.OS === 'ios' ? 71 : 60,
  };

  return (
    <AppTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          const parsedSize = Platform.OS === 'ios' ? 26 : 20;

          if (route.name === 'Search') {
            iconName = 'search';
            return (
              <FontAwesome name={iconName} size={parsedSize} color={color} />
            );
          } else if (route.name === 'Menu') {
            iconName = 'book-open';
            return (
              <FontAwesome5 name={iconName} size={parsedSize} color={color} />
            );
          } else if (route.name === 'Feed') {
            iconName = 'favorite';
            return (
              <MaterialIcons
                name={iconName}
                size={parsedSize + 2}
                color={color}
              />
            );
          } else if (route.name === 'Profile') {
            iconName = 'user-alt';
            return (
              <FontAwesome5 name={iconName} size={parsedSize} color={color} />
            );
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={parsedSize + 2} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          const mainColor =
            getCurrentTheme() === 'light' ? '#710502' : '#8A0E0B';

          if (route.name === 'Search') {
            color = focused ? mainColor : '#fff0';
          } else if (route.name === 'Menu') {
            color = focused ? mainColor : '#fff0';
          } else if (route.name === 'Feed') {
            color = focused ? mainColor : '#fff0';
          } else if (route.name === 'Profile') {
            color = focused ? mainColor : '#fff0';
          }

          // You can return any component that you like here!
          return <FontAwesome name="circle" size={6} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: getCurrentTheme() === 'light' ? '#710502' : '#8A0E0B',
        inactiveTintColor: '#B0B0BF',
        tabStyle: {
          opacity: 1,
          backgroundColor: getCurrentTheme() === 'light' ? '#fff' : '#121212',
          paddingTop: Platform.OS === 'ios' ? 16 : 8,
          paddingBottom: Platform.OS === 'ios' ? 0 : 8,
        },
        style: getCurrentTheme() === 'light' ? lightThemeStyle : darkThemeStyle,
      }}
      initialRouteName="Menu"
      backBehavior="initialRoute"
    >
      {!loadingMenu && <AppTabs.Screen name="Search" component={Search} />}
      <AppTabs.Screen name="Menu" component={Menu} />
      {/* {!loadingMenu && <AppTabs.Screen name="Feed" component={Feed} />} */}
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
