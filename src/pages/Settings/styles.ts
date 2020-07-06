import styled, { css } from 'styled-components/native';
import { StyleSheet } from 'react-native';

import { Platform } from 'react-native';
import Constants from 'expo-constants';

interface ThemeProps {
  theme: 'light' | 'dark';
}

export const Container = styled.SafeAreaView<ThemeProps>`
  flex: 1;
  background: ${(props) => (props.theme === 'light' ? '#fff' : '#000')};

  ${Platform.OS === 'android' &&
  css`
    padding-top: ${Constants.statusBarHeight}px;
  `}
`;

export const Header = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity``;

export const Title = styled.Text<ThemeProps>`
  font-size: 24px;
  font-family: 'Roboto_500Medium';
  color: ${(props) => (props.theme === 'light' ? '#000' : '#fff')};
`;

export const Empty = styled.View``;

export const SettingsContainer = styled.View`
  padding: 32px;
`;

export const ThemeSwitch = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
export const SwitchInfo = styled.View``;

export const SwitchTitle = styled.Text<ThemeProps>`
  color: ${(props) => (props.theme === 'light' ? '#000' : '#fff')};

  font-size: 18px;
  font-family: 'Roboto_700Bold';
`;

export const SwitchDescription = styled.Text<ThemeProps>`
  color: ${(props) => (props.theme === 'light' ? '#000' : '#fff')};

  margin-top: 8px;
  font-size: 16px;
`;

export const Switch = styled.Switch``;

export const LogOutButton = styled.TouchableOpacity<ThemeProps>`
  margin-top: 32px;
  padding: 32px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-top-color: ${(props) =>
    props.theme === 'light' ? '#eaedf2' : '#333'};
`;

export const LogOutButtonText = styled.Text<ThemeProps>`
  color: ${(props) => (props.theme === 'light' ? '#710502' : '#8A0E0B')};
  font-size: 18px;
  font-family: 'Roboto_700Bold';
`;
