import React, { useEffect, useCallback, useState } from 'react';
import { Platform, Alert, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Feather as Icon } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useStatusBar } from '../../hooks/statusBar';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  User,
  AvatarContainer,
  Avatar,
  UserInfo,
  UserName,
  Registry,
  ButtonSettings,
  Options,
  OptionButton,
  Option,
  Content,
  Title,
  Description,
} from './styles';

interface EditProfileParams {
  title: string;
  data?: string;
  type: 'email' | 'password';
}

interface Params {
  navigateToEditProfile(params: EditProfileParams): void;
}

const Profile: React.FC = () => {
  const { setToDark } = useStatusBar();
  const { user, updateUser } = useAuth();

  const navigation = useNavigation();

  const route = useRoute();

  const { navigateToEditProfile } = route.params as Params;

  useEffect(setToDark, []);

  const requestCameraRollPermission = useCallback(async (): Promise<
    boolean
  > => {
    if (Platform.OS === 'ios') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Desculpe',
          'Precisamos da sua permissão para acessar a galeria de fotos.',
        );

        return false;
      }
    }

    return true;
  }, []);

  const handleUpdateAvatar = useCallback(async () => {
    const canOpenCameraRoll = await requestCameraRollPermission();

    if (!canOpenCameraRoll) {
      Alert.alert(
        'Desculpe',
        'Precisamos da sua permissão para acessar a galeria de fotos.',
      );
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    const data = new FormData();

    data.append('avatar', {
      uri: result.uri,
      name: `${user.id}.jpg`,
      type: 'image/jpeg',
    });

    try {
      const response = await api.patch('/profiles/avatar', data);

      updateUser(response.data);
    } catch (err) {
      const { message } = err.response.data;

      Alert.alert('Erro ao alterar avatar', message);
    }
  }, [updateUser, user.id]);

  const handleChangeProfile = useCallback((params: EditProfileParams) => {
    navigateToEditProfile(params);
  }, []);

  console.log(user.avatar_url);

  return (
    <Container>
      <Header>
        <User>
          <AvatarContainer onPress={handleUpdateAvatar}>
            <Avatar source={{ uri: user.avatar_url }} />
            {!user.avatar_url && <Icon name="user" color="#fff" size={26} />}
          </AvatarContainer>
          <UserInfo>
            <UserName>
              {user.name} {user.last_name}
            </UserName>
            <Registry>{user.registry}</Registry>
          </UserInfo>
        </User>

        <ButtonSettings onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings" color="#b0b0bf" size={26} />
        </ButtonSettings>
      </Header>

      <Options>
        <OptionButton
          onPress={() =>
            handleChangeProfile({
              title: 'E-mail',
              data: user.email,
              type: 'email',
            })
          }
        >
          <Option>
            <Icon name="mail" color="#000" size={22} />
            <Content>
              <Title>E-mail</Title>
              <Description>{user.email}</Description>
            </Content>
          </Option>
          <Icon name="chevron-right" color="#b0b0bf" size={18} />
        </OptionButton>

        <OptionButton
          onPress={() =>
            handleChangeProfile({ title: 'Senha', type: 'password' })
          }
        >
          <Option>
            <Icon name="lock" color="#000" size={22} />
            <Content>
              <Title>Senha</Title>
              <Description style={{ fontSize: 8 }}>⬤ ⬤ ⬤ ⬤ ⬤ ⬤</Description>
            </Content>
          </Option>
          <Icon name="chevron-right" color="#b0b0bf" size={18} />
        </OptionButton>

        <OptionButton>
          <Option>
            <Icon name="bell" color="#000" size={22} />
            <Content>
              <Title>Notificações</Title>
              <Description>Estamos sempre melhorando</Description>
            </Content>
          </Option>
          <Icon name="chevron-right" color="#b0b0bf" size={18} />
        </OptionButton>
      </Options>
    </Container>
  );
};

export default Profile;
