import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 42px;
  margin-top: 32px;
  border-radius: 21px;
  padding: 0 16px;
  border-width: 2px;
  border-color: #eaedf2;
  background: #fff;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  color: #710502;
  font-size: 16px;
  font-family: 'Roboto_500Medium';
  text-align: center;
`;
