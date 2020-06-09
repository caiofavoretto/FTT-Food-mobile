import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStatusBar } from '../../hooks/statusBar';

import { Container } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const { setToDark } = useStatusBar();

  navigation.addListener('focus', setToDark);

  return <Container />;
};

export default Home;
