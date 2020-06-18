import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  padding: 0 16px;
`;

export const Header = styled.View`
  background: #fff;
  padding: 16px;
`;

export const Button = styled(RectButton)`
  margin-top: 32px;
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
