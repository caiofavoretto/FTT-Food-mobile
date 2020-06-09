import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useStatusBar } from '../../hooks/statusBar';

import LogoImg from '../../assets/logo.png';

import {
  Container,
  Button,
  ButtonText,
  Header,
  Circle,
  Logo,
  Form,
} from './styles';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const { setToLight } = useStatusBar();

  navigation.addListener('focus', setToLight);

  function handleNavigateToHome() {
    navigation.navigate('Main');
  }

  return (
    <Container>
      <Header>
        <Circle />
        <Logo source={LogoImg} />
      </Header>
      <Form>
        <Button onPress={handleNavigateToHome}>
          <ButtonText>Login</ButtonText>
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
