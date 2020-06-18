import React, { useEffect, useCallback, useState } from 'react';
import { Platform, Alert, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Feather as Icon } from '@expo/vector-icons';

import { SharedElement } from 'react-navigation-shared-element';

import { useRoute } from '@react-navigation/native';
import { useStatusBar } from '../../hooks/statusBar';
import { useAuth } from '../../hooks/auth';

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
  Button,
  ButtonText,
} from './styles';

interface EditProfileParams {
  title: string;
  data: string;
}

interface Params {
  navigateToEditProfile(params: EditProfileParams): void;
}

const Profile: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const { setToDark } = useStatusBar();
  const { signOut, user } = useAuth();

  const route = useRoute();

  const { navigateToEditProfile } = route.params as Params;

  useEffect(setToDark, []);

  const requestCameraRollPermission = useCallback(async (): Promise<
    boolean
  > => {
    if (Platform.OS) {
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

  const handleChangeAvatar = useCallback(async () => {
    const canOpenCameraRoll = await requestCameraRollPermission();

    if (canOpenCameraRoll) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }, []);

  const handleChangeProfile = useCallback((data: string) => {
    navigateToEditProfile({ title: 'E-mail', data });
  }, []);

  return (
    <Container>
      <SharedElement id="form">
        <View>
          <Text>oi</Text>
          <Text>xau</Text>
        </View>
      </SharedElement>

      <Header>
        <User>
          <AvatarContainer onPress={handleChangeAvatar}>
            <Avatar source={{ uri: image || user.avatar_url }} />
            {!image && <Icon name="user" color="#fff" size={26} />}
          </AvatarContainer>
          <UserInfo>
            <UserName>
              {user.name} {user.last_name}
            </UserName>
            <Registry>{user.registry}</Registry>
          </UserInfo>
        </User>

        <ButtonSettings>
          <Icon name="settings" color="#b0b0bf" size={26} />
        </ButtonSettings>
      </Header>

      <Options>
        <OptionButton onPress={() => handleChangeProfile(user.email)}>
          <Option>
            <Icon name="mail" color="#000" size={22} />
            <Content>
              <Title>E-mail</Title>
              <Description>{user.email}</Description>
            </Content>
          </Option>
          <Icon name="chevron-right" color="#b0b0bf" size={18} />
        </OptionButton>

        <OptionButton>
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

      <Button onPress={signOut}>
        <ButtonText>LogOut</ButtonText>
      </Button>
    </Container>
  );
};

export default Profile;
