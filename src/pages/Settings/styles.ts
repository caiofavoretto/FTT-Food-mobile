import styled, { css } from 'styled-components/native';
import { StyleSheet } from 'react-native';

import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;

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

export const Title = styled.Text`
  font-size: 24px;
  font-family: 'Roboto_500Medium';
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

export const SwitchTitle = styled.Text`
  font-size: 18px;
  font-family: 'Roboto_700Bold';
`;

export const SwitchDescription = styled.Text`
  margin-top: 8px;
  font-size: 16px;
`;

export const Switch = styled.Switch``;

export const LogOutButton = styled.TouchableOpacity`
  margin-top: 32px;
  padding: 32px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-top-color: #eaedf2;
`;

export const LogOutButtonText = styled.Text`
  color: #710502;
  font-size: 18px;
  font-family: 'Roboto_700Bold';
`;
