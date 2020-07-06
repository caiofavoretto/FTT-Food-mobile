import styled, { css } from 'styled-components/native';
import Constants from 'expo-constants';
import { Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

interface ThemeProps {
  theme: 'light' | 'dark';
}

interface ContainerProps extends ThemeProps {
  grow: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  background: ${(props) => (props.theme === 'light' ? '#fff' : '#000')};
  padding: 32px;
  position: relative;
  ${(props) =>
    !props.grow &&
    css`
      border-radius: 32px;
    `}

  shadow-color: #000;
  shadow-radius: 5px;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.16;
  elevation: 4;
`;

export const MealImage = styled.Image`
  height: 256px;
  position: absolute;
  top: 0;
  width: ${width}px;
  z-index: 15;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
  flex-direction: row;
  align-items: center;
  padding: 6px;
  background: #fff;
  border-radius: 42px;
  z-index: 20;

  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-radius: 4.65px;
  shadow-opacity: 0.29;

  elevation: 7;
`;

export const RateAction = styled.View`
  padding: 12px;
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
  background: #000c;
  position: absolute;
  top: 182px;
  left: 0;
  flex-direction: row;
  align-items: center;
  z-index: 20;
`;

export const MealAction = styled.View`
  position: absolute;
  top: 208px;
  right: 16px;
  flex-direction: row;
  align-items: center;
  z-index: 20;
`;

export const RatingContainer = styled.View`
  padding: 12px;
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
  background: #fffd;
  position: absolute;
  right: -16px;
  flex-direction: row;
  align-items: center;
`;

export const RatingText = styled.Text`
  font-size: 16px;
  margin-left: 8px;
  color: #000;
  font-family: 'Roboto_700Bold';
`;

export const NotAttendant = styled.Text`
  font-size: 16px;
  margin-left: 8px;
  color: #000;
  font-family: 'Roboto_500Medium';
`;

interface ActionButtonProps {
  attendant?: boolean;
  rate?: boolean;
}

export const ActionButton = styled.TouchableOpacity<ActionButtonProps>`
  margin-left: 8px;
  transform: translateY(-2px);
  padding: 4px 10px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  background: #b0b0bf;

  ${(props) =>
    props.attendant &&
    css`
      background: #4d6219;
    `}

  ${(props) =>
    props.rate &&
    css`
      background: #f17b15;
    `}

  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-radius: 4.65px;
  shadow-opacity: 0.29;

  elevation: 7;
`;

export const ActionButtonText = styled.Text`
  margin-left: 8px;
  font-size: 16px;
  color: #fff;
  font-family: 'Roboto_500Medium';
`;

export const MealContent = styled.ScrollView`
  flex: 1;
  width: 100%;
  z-index: 10;
`;

export const MealTitle = styled.Text<ThemeProps>`
  margin-top: 16px;
  font-size: 28px;
  font-family: 'Roboto_700Bold';
  color: ${(props) => (props.theme === 'light' ? '#000' : '#fff')};
  text-transform: capitalize;
`;

export const MealDescription = styled.Text`
  margin-top: 248px;
  font-size: 16px;
  font-family: 'Roboto_500Medium';
  color: #b0b0bf;
`;

export const FoodList = styled.View`
  flex: 1;
`;

export const FoodItem = styled.View`
  margin-top: 18px;
  flex-direction: row;
  align-items: center;
`;

export const FoodText = styled.Text<ThemeProps>`
  margin-left: 16px;
  font-size: 20px;
  font-family: 'Roboto_700Bold';
  color: ${(props) => (props.theme === 'light' ? '#555763' : '#999')};
`;

export const FoodDescription = styled.Text<ThemeProps>`
  font-size: 16px;
  font-family: 'Roboto_400Regular';
  color: ${(props) => (props.theme === 'light' ? '#555763' : '#999')};
`;
