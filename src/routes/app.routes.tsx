import React, { useEffect, useState, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppLoading } from 'expo';

import {
  Feather as Icon,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';

import Menu from '../pages/Menu';
import Profile from '../pages/Profile';
import Search from '../pages/Search';

const AppTabs = createBottomTabNavigator();

interface MealParams {}

interface EditProfileParams {
  title: string;
  data: string;
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

  const handleNavgateToMeal = useCallback(() => {
    navigation.navigate('EditProfil');
  }, []);

  const handleNavgateToEditProfile = useCallback(
    (params: EditProfileParams) => {
      console.log('teste');
      navigation.navigate('EditProfile');
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
          } else if (route.name === 'Favorite') {
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
          } else if (route.name === 'Favorite') {
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
          backgroundColor: '#fff',
          paddingTop: 16,
        },
        style: {
          height: 100,
        },
      }}
      initialRouteName="Menu"
      backBehavior="initialRoute"
    >
      {!loadingMenu && <AppTabs.Screen name="Search" component={Search} />}
      <AppTabs.Screen
        name="Menu"
        component={Menu}
        initialParams={{
          navigateToMeal: handleNavgateToMeal,
        }}
      />
      {!loadingMenu && <AppTabs.Screen name="Favorite" component={Search} />}
      {!loadingMenu && (
        <AppTabs.Screen
          name="Profile"
          component={Profile}
          initialParams={{ navigateToEditProfile: handleNavgateToEditProfile }}
        />
      )}
    </AppTabs.Navigator>
  );
};

export default AppRoutes;
