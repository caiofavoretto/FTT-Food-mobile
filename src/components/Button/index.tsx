import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, Touch, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  styled: boolean;
}

const StyledButton: React.FC<ButtonProps> = ({ styled, children, ...rest }) => {
  return (
    <Container>
      <Touch {...rest}>
        <ButtonText styled={styled}>{children}</ButtonText>
      </Touch>
    </Container>
  );
};

export default StyledButton;
