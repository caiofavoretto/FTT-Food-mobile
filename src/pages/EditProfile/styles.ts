import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;

  ${Platform.OS === 'android' &&
  css`
    padding-top: ${Constants.statusBarHeight}px;
  `}
`;

export const Header = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-size: 24px;
  font-family: 'Roboto_500Medium';
`;

export const Empty = styled.View``;

export const FormContainer = styled.ScrollView``;
