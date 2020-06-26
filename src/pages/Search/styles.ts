import styled, { css } from 'styled-components/native';
import { Dimensions, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Constants from 'expo-constants';

const width = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;

  ${Platform.OS === 'android' &&
  css`
    padding-top: ${Constants.statusBarHeight}px;
  `}
`;

export const Header = styled.View`
  padding: 0 16px;
`;

export const AlreadySuggestedText = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: 16px;
  color: #c53030;
  margin-top: 16px;
  text-align: center;
`;

export const FoodsContainer = styled.ScrollView`
  margin-top: 16px;
`;

interface FoodProps {
  colored?: boolean;
}

export const Food = styled.TouchableOpacity<FoodProps>`
  width: ${width / 2 - 16 - 8}px;
  height: ${width / 2 - 16 - 8}px;
  margin-bottom: 16px;
  background: #710502;

  ${(props) =>
    props.colored &&
    css`
      background: #f4a927;
    `}

  border-radius: 16px;
  padding-top: 18px;
  align-items: center;

  position: relative;
`;

export const FoodImage = styled.Image`
  width: 92px;
  height: 92px;
  border-radius: 100px;
  background: #0005;
`;

export const FoodName = styled.Text`
  position: absolute;
  font-size: 16px;
  color: #fff;
  font-family: 'Roboto_700Bold';
  bottom: 8px;
  text-transform: uppercase;
  text-align: center;
`;

interface InputContainerProps {
  isFocused: boolean;
}

// Input
export const InputContainer = styled.View<InputContainerProps>`
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
    props.isFocused &&
    css`
      border-color: #000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  color: #710502;
  font-size: 16px;
  font-family: 'Roboto_500Medium';
  text-align: left;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;
