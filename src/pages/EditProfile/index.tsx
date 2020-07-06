import React, { useRef, useCallback, useEffect } from 'react';
import { KeyboardAvoidingView, TextInput, Platform, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Header,
  BackButton,
  Title,
  Empty,
  FormContainer,
} from './styles';

interface Params {
  title: string;
  data?: string;
  type: 'email' | 'password';
}

interface EmailFormData {
  email: string;
}

interface PasswordFormData {
  old_password: string;
  password: string;
  confirm_password: string;
}

const EditProfile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const confirmNewPasswordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const route = useRoute();

  const { signOut, updateUser } = useAuth();

  const { title, data, type } = route.params as Params;

  useEffect(() => {
    if (type === 'email') {
      emailInputRef.current?.focus();
    } else if (type === 'password') {
      oldPasswordInputRef.current?.focus();
    }
  }, []);

  const handleChangeEmail = useCallback(async (dataToChange: EmailFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate(dataToChange, {
        abortEarly: false,
      });

      const response = await api.patch('/profiles/email', dataToChange);

      updateUser(response.data);

      navigation.goBack();

      Alert.alert('Sucesso', 'Seu e-mail foi alterado.');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      const { message } = err.response.data;

      Alert.alert('Erro ao salvar os dados', message);
    }
  }, []);

  const handleChangePassword = useCallback(
    async (dataToChange: PasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          old_password: Yup.string().required('Senha atual obrigatória'),
          password: Yup.string().required('Nova senha obrigatória'),
          confirm_password: Yup.string().required(
            'Confirmar nova senha obrigatória',
          ),
        });

        await schema.validate(dataToChange, {
          abortEarly: false,
        });

        if (dataToChange.password !== dataToChange.confirm_password) {
          Alert.alert('Algo deu errado', 'As senhas novas não coincidem.');
          return;
        }

        await api.patch('/profiles/password', dataToChange);

        navigation.goBack();

        Alert.alert(
          'Sucesso',
          'Sua senha foi alterada. Você precisa se autenticar novamente.',
          [
            {
              text: 'OK',
              onPress: signOut,
            },
          ],
          { cancelable: false },
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        const { message } = err.response.data;

        Alert.alert('Erro ao salvar os dados', message);
      }
    },
    [],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <Container>
        <Header>
          <BackButton onPress={navigation.goBack}>
            <Icon name="chevron-left" color="#000" size={32} />
          </BackButton>
          <Title>{title}</Title>
          <Empty>
            <Icon name="chevron-left" color="#fff" size={32} />
          </Empty>
        </Header>

        <FormContainer
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 32,
          }}
        >
          <Form
            ref={formRef}
            onSubmit={
              type === 'email' ? handleChangeEmail : handleChangePassword
            }
          >
            {type === 'email' ? (
              <Input
                ref={emailInputRef}
                name="email"
                initialValue={data}
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="send"
                textContentType="emailAddress"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            ) : (
              <>
                <Input
                  ref={oldPasswordInputRef}
                  name="old_password"
                  placeholder="Senha atual"
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="next"
                  textContentType="password"
                  secureTextEntry
                  onSubmitEditing={() => newPasswordInputRef.current?.focus()}
                />

                <Input
                  ref={newPasswordInputRef}
                  name="password"
                  placeholder="Nova senha"
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="next"
                  textContentType="password"
                  secureTextEntry
                  onSubmitEditing={() =>
                    confirmNewPasswordInputRef.current?.focus()
                  }
                />

                <Input
                  ref={confirmNewPasswordInputRef}
                  name="confirm_password"
                  placeholder="Confirmar nova senha"
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="send"
                  textContentType="password"
                  secureTextEntry
                  onSubmitEditing={() => formRef.current?.submitForm()}
                />
              </>
            )}

            <Button onPress={() => formRef.current?.submitForm()}>
              Salvar
            </Button>
          </Form>
        </FormContainer>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
