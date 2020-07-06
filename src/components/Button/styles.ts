import styled, { css } from 'styled-components/native';
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

  shadow-color: #710502;
  shadow-offset: 0px 3px;
  shadow-radius: 4.65px;
  shadow-opacity: 0.29;

  elevation: 7;
`;

interface ButtonTextProps {
  styled: boolean;
}

export const ButtonText = styled.Text<ButtonTextProps>`
  font-size: 16px;
  font-family: 'Roboto_700Bold';
  color: #fff;
  text-transform: capitalize;

  ${(props) =>
    props.styled &&
    css`
      text-transform: uppercase;
      letter-spacing: 3px;
    `}
`;
