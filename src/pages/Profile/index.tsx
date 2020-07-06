import React, { useEffect, useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Feather as Icon } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useStatusBar } from '../../hooks/statusBar';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { useTheme } from '../../hooks/theme';

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
  const { setToDark, setToLight } = useStatusBar();
  const { getCurrentTheme } = useTheme();
  const { user, updateUser } = useAuth();

  const navigation = useNavigation();

  const route = useRoute();

  const { navigateToEditProfile } = route.params as Params;

  useEffect(() => {
    if (getCurrentTheme() === 'light') {
      setToDark();
    } else {
      setToLight();
    }
  }, []);
  useEffect(() => {
    console.log(user);
  }, []);

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

  return (
    <Container theme={getCurrentTheme()}>
      <Header theme={getCurrentTheme()}>
        <User>
          <AvatarContainer onPress={handleUpdateAvatar}>
            {user.avatar_url ? (
              <Avatar source={{ uri: user.avatar_url }} />
            ) : (
              <Icon name="user" color="#fff" size={26} />
            )}
          </AvatarContainer>
          <UserInfo>
            <UserName theme={getCurrentTheme()}>
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
          theme={getCurrentTheme()}
          onPress={() =>
            handleChangeProfile({
              title: 'E-mail',
              data: user.email,
              type: 'email',
            })
          }
        >
          <Option>
            <Icon
              name="mail"
              color={getCurrentTheme() === 'light' ? '#000' : '#fff'}
              size={22}
            />
            <Content>
              <Title theme={getCurrentTheme()}>E-mail</Title>
              <Description theme={getCurrentTheme()}>{user.email}</Description>
            </Content>
          </Option>
          <Icon name="chevron-right" color="#b0b0bf" size={18} />
        </OptionButton>

        <OptionButton
          theme={getCurrentTheme()}
          onPress={() =>
            handleChangeProfile({ title: 'Senha', type: 'password' })
          }
        >
          <Option>
            <Icon
              name="lock"
              color={getCurrentTheme() === 'light' ? '#000' : '#fff'}
              size={22}
            />
            <Content>
              <Title theme={getCurrentTheme()}>Senha</Title>
              <Description theme={getCurrentTheme()} style={{ fontSize: 8 }}>
                ⬤ ⬤ ⬤ ⬤ ⬤ ⬤
              </Description>
            </Content>
          </Option>
          <Icon name="chevron-right" color="#b0b0bf" size={18} />
        </OptionButton>

        <OptionButton theme={getCurrentTheme()}>
          <Option>
            <Icon
              name="bell"
              color={getCurrentTheme() === 'light' ? '#000' : '#fff'}
              size={22}
            />
            <Content>
              <Title theme={getCurrentTheme()}>Notificações</Title>
              <Description theme={getCurrentTheme()}>
                Estamos sempre melhorando
              </Description>
            </Content>
          </Option>
          <Icon name="chevron-right" color="#b0b0bf" size={18} />
        </OptionButton>
      </Options>
    </Container>
  );
};

export default Profile;
