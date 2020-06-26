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
  flex-direction: row;
  padding: 32px 16px;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: #eaedf2;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`;

export const User = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AvatarContainer = styled.TouchableOpacity`
  background: #b0b0bf;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  position: absolute;
`;

export const UserInfo = styled.View`
  margin-left: 16px;
`;

export const UserName = styled.Text`
  font-size: 20px;
  font-family: 'Roboto_700Bold';
`;

export const Registry = styled.Text`
  margin-top: 4px;
  font-size: 16px;
  color: #b0b0bf;
`;

export const ButtonSettings = styled.TouchableOpacity``;

export const Options = styled.View`
  flex: 1;
  padding: 0 16px;
`;

export const OptionButton = styled.TouchableOpacity`
  padding: 32px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #eaedf2;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`;

export const Option = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Content = styled.View`
  margin-left: 16px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: 'Roboto_500Medium';
`;

export const Description = styled.Text`
  font-size: 16px;
  margin-top: 4px;
`;
