import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

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
      border-color: #000;
    `}
`;

interface TextInputProps {
  hasIcon: boolean;
}

export const TextInput = styled.TextInput<TextInputProps>`
  flex: 1;
  height: 100%;
  color: #710502;
  font-size: 16px;
  font-family: 'Roboto_500Medium';
  text-align: center;
  ${(props) =>
    props.hasIcon &&
    css`
      text-align: left;
    `}
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;
