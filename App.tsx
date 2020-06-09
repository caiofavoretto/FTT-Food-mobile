import React from 'react';
import { AppLoading } from 'expo';
import { StatusBarProvider } from './src/hooks/statusBar';
import { StatusBar } from 'react-native';

import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <StatusBarProvider>
      <Routes />
    </StatusBarProvider>
  );
}
