import 'react-native-gesture-handler';

import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from './hooks/theme';

import Routes from './routes';

export default function App() {
  const { getCurrentTheme } = useTheme();

  return (
    <>
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: getCurrentTheme() === 'light' ? '#fff' : '#000',
        }}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: getCurrentTheme() === 'light' ? '#fff' : '#121212',
        }}
      >
        <NavigationContainer>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Routes />
          </View>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}
