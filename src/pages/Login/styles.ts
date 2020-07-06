import styled, { css } from 'styled-components/native';
import { Animated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

export const Header = styled.View`
  height: 150px;
  background: #fff;
  width: 100%;
  padding-top: ${Constants.statusBarHeight}px;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 64px;
`;

export const Circle = styled.View`
  height: 700px;
  background: #710502;
  width: 700px;
  padding-top: ${Constants.statusBarHeight}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-bottom-left-radius: 350px;
  border-bottom-right-radius: 350px;
  bottom: 0;
  right: -100px;
`;

export const Logo = styled(Animated.Image)``;

export const FormContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 32px;
`;

export const Input = styled.TextInput`
  margin-top: 32px;
  height: 42px;
  border-radius: 21px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: solid 2px #eaedf2;
  color: #710502;
  background: #fff;
  padding: 0 16px;
  text-align: center;
  font-size: 16px;
  font-family: 'Roboto_500Medium';
`;

export const TextButton = styled.TouchableOpacity``;

export const TextButtonText = styled.Text`
  color: #f4a927;
  font-size: 16px;
  font-family: 'Roboto_500Medium';
  margin-top: 32px;
`;
