import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';
import { useStatusBar } from '../../hooks/statusBar';
import { useTheme } from '../../hooks/theme';

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
  const { getCurrentTheme, setToDarkTheme, setToLightTheme } = useTheme();

  const [isEnabled, SetIsEnabled] = useState(
    getCurrentTheme() === 'light' ? false : true,
  );

  const handleToggleSwitch = useCallback(() => {
    if (isEnabled) {
      console.log('set to light');
      setToLightTheme();
      SetIsEnabled(false);
    } else {
      console.log('set to dark');
      SetIsEnabled(true);
      setToDarkTheme();
    }
  }, []);

  const navigation = useNavigation();
  const { setToDark, setToLight } = useStatusBar();
  const { signOut } = useAuth();

  useEffect(() => {
    if (getCurrentTheme() === 'light') {
      setToDark();
    } else {
      setToLight();
    }
  }, []);

  return (
    <Container theme={getCurrentTheme()}>
      <Header>
        <BackButton onPress={navigation.goBack}>
          <Icon
            name="chevron-left"
            color={getCurrentTheme() === 'light' ? '#000' : '#fff'}
            size={32}
          />
        </BackButton>
        <Title theme={getCurrentTheme()}>Configurações</Title>
        <Empty>
          <Icon name="chevron-left" color="transparent" size={32} />
        </Empty>
      </Header>

      <SettingsContainer>
        <ThemeSwitch>
          <SwitchInfo>
            <SwitchTitle theme={getCurrentTheme()}>
              Tema do aplicativo
            </SwitchTitle>
            <SwitchDescription theme={getCurrentTheme()}>
              {isEnabled ? 'Tema escuro' : 'Tema claro'}
            </SwitchDescription>
          </SwitchInfo>
          <Switch
            trackColor={{ false: '#e9e9eb', true: '#4cf964' }}
            thumbColor="#fff"
            onValueChange={handleToggleSwitch}
            value={isEnabled}
          />
        </ThemeSwitch>

        <LogOutButton theme={getCurrentTheme()} onPress={signOut}>
          <LogOutButtonText theme={getCurrentTheme()}>Log out</LogOutButtonText>
          <Icon
            name="chevron-right"
            color={getCurrentTheme() === 'light' ? '#710502' : '#8A0E0B'}
            size={18}
          />
        </LogOutButton>
      </SettingsContainer>
    </Container>
  );
};

export default Settings;
