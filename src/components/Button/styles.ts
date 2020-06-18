import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  margin-top: 32px;
  height: 42px;
  border-radius: 21px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Touch = styled(RectButton)`
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
