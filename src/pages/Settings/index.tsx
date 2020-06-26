import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  BackButton,
  Title,
  Empty,
  SettingsContainer,
  LogOutButton,
  LogOutButtonText,
  ThemeSwitch,
  SwitchInfo,
  SwitchTitle,
  SwitchDescription,
  Switch,
} from './styles';

const Settings: React.FC = () => {
  const [isEnabled, SetIsEnabled] = useState(false);

  const handleToggleSwitch = useCallback(() => {
    SetIsEnabled((previousState) => !previousState);
  }, []);

  const navigation = useNavigation();
  const { signOut } = useAuth();

  return (
    <Container>
      <Header>
        <BackButton onPress={navigation.goBack}>
          <Icon name="chevron-left" color="#000" size={32} />
        </BackButton>
        <Title>Configurações</Title>
        <Empty>
          <Icon name="chevron-left" color="#fff" size={32} />
        </Empty>
      </Header>

      <SettingsContainer>
        <ThemeSwitch>
          <SwitchInfo>
            <SwitchTitle>Tema do aplicativo</SwitchTitle>
            <SwitchDescription>
              {isEnabled ? 'Tema escuro' : 'Tema claro'}
            </SwitchDescription>
          </SwitchInfo>
          <Switch
            trackColor={{ false: '#e9e9eb', true: '#000' }}
            onValueChange={handleToggleSwitch}
            value={isEnabled}
          />
        </ThemeSwitch>

        <LogOutButton onPress={signOut}>
          <LogOutButtonText>Log out</LogOutButtonText>
          <Icon name="chevron-right" color="#710502" size={18} />
        </LogOutButton>
      </SettingsContainer>
    </Container>
  );
};

export default Settings;
