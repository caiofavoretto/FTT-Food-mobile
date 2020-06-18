import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, Touch, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container
      style={{
        shadowColor: '#710502',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
      }}
    >
      <Touch {...rest}>
        <ButtonText>{children}</ButtonText>
      </Touch>
    </Container>
  );
};

export default Button;
