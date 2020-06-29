import styled, { css } from 'styled-components/native';

import { Dimensions, Platform } from 'react-native';

import Constants from 'expo-constants';

const width = Dimensions.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;

  ${Platform.OS === 'android' &&
  css`
    padding-top: ${Constants.statusBarHeight}px;
  `}
`;

export const Header = styled.View`
  background: #fff;
  padding: 32px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-family: 'Roboto_700Bold';
  color: #000;
`;

export const Name = styled.Text`
  font-size: 28px;
  font-family: 'Roboto_700Bold';
  color: #f4a927;
`;

export const DateDescription = styled.Text`
  margin-top: 16px;
  font-size: 16px;
  font-family: 'Roboto_700Bold';
  color: #b0b0bf;
  text-transform: capitalize;
`;

export const MenuContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
  z-index: 10;

  ${(props) =>
    !props.scrollEnabled &&
    css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `}
`;

export const MenuContent = styled.TouchableOpacity`
  width: ${width.width}px;
  min-height: 472px;
  justify-content: space-between;

  ${(props) =>
    !props.disabled &&
    css`
      padding: 8px 16px;
    `}
`;

export const MenuNav = styled.View`
  height: 64px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
