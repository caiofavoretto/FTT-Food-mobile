import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { useStatusBar } from '../../hooks/statusBar';
import { useAuth } from '../../hooks/auth';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import LogoImg from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Header,
  Circle,
  Logo,
  FormContainer,
  TextButton,
  TextButtonText,
} from './styles';

interface SignInFormData {
  registry: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { setToLight } = useStatusBar();
  const { signIn } = useAuth();
  // navigation.addListener('focus', setToLight);
  useEffect(setToLight, []);

  const handleLogin = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          registry: Yup.string().required('Registro obrigatório'),
          password: Yup.string().required('Senha Obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          registry: data.registry,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
        );
      }
    },
    [signIn],
  );

  // Animations
  const translateAnim = useRef(new Animated.ValueXY({ x: 0, y: -100 })).current;

  const animateShrink = () => {
    Animated.timing(translateAnim, {
      toValue: { x: -75, y: -8 },
      duration: 250,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start();
  };

  const animateGrow = () => {
    Animated.timing(translateAnim, {
      toValue: { x: 0, y: -100 },
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}
      >
        <Container>
          <Header>
            <Circle />
            <Logo
              style={{
                transform: [
                  ...translateAnim.getTranslateTransform(),
                  {
                    scale: translateAnim.x.interpolate({
                      inputRange: [0, 75],
                      outputRange: [1, 1.25],
                    }),
                  },
                ],
              }}
              source={LogoImg}
            />
          </Header>

          <FormContainer>
            <Form ref={formRef} onSubmit={handleLogin}>
              <Input
                name="registry"
                placeholder="Registro"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                textContentType="username"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
                onFocus={animateShrink}
                onBlur={animateGrow}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                placeholder="Senha"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="send"
                textContentType="password"
                secureTextEntry
                onSubmitEditing={() => formRef.current?.submitForm()}
                onFocus={animateShrink}
                onBlur={animateGrow}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Login
              </Button>

              <TextButton>
                <TextButtonText>Esqueci minha senha</TextButtonText>
              </TextButton>
            </Form>
          </FormContainer>

          {/* <Form>
            <Input
              placeholder="Registro"
              placeholderTextColor="#B0B0BF"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="next"
              textContentType="username"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
              onFocus={animateShrink}
              onBlur={animateGrow}
            />
            <Input
              ref={passwordInputRef}
              placeholder="Senha"
              placeholderTextColor="#B0B0BF"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="send"
              textContentType="password"
              secureTextEntry
              onSubmitEditing={handleLogin}
              onFocus={animateShrink}
              onBlur={animateGrow}
            />

            <Button onPress={handleLogin}>Login</Button>

            <TextButton>
              <TextButtonText>Esqueci minha senha</TextButtonText>
            </TextButton>
          </Form> */}
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
