import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #fff;
`;

export const Header = styled.View`
  height: 300px;
  background: #fff;
  width: 100%;
  padding-top: ${Constants.statusBarHeight}px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Circle = styled.View`
  height: 700px;
  background: #710502;
  width: 700px;
  padding-top: ${Constants.statusBarHeight}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 350px;
  bottom: 0;
  right: -100px;
`;

export const Logo = styled.Image``;

export const Form = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 32px;
`;

export const Button = styled(RectButton)`
  background: #710502;
  height: 42px;
  border-radius: 21px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-family: 'Roboto_700Bold';
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 3px;
`;
