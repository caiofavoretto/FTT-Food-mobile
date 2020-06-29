import styled, { css } from 'styled-components/native';
import Constants from 'expo-constants';

import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

interface ContainerProps {
  grow: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  background: #fff;
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
  top: ${Constants.statusBarHeight + 8}px;
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
  background: #fff;
  position: absolute;
  right: -16px;
  width: 80px;
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
  color: #fff;
  font-family: 'Roboto_500Medium';
`;

interface ActionButtonProps {
  color: string;
}

export const ActionButton = styled.TouchableOpacity<ActionButtonProps>`
  margin-left: 8px;
  background: ${(props) => props.color};
  transform: translateY(-2px);
  padding: 4px 10px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;

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

export const MealTitle = styled.Text`
  margin-top: 256px;
  font-size: 28px;
  font-family: 'Roboto_700Bold';
  color: #000;
  text-transform: capitalize;
`;

export const FoodList = styled.View`
  flex: 1;
`;

export const FoodItem = styled.View`
  margin-top: 18px;
  flex-direction: row;
  align-items: center;
`;

export const FoodText = styled.Text`
  margin-left: 16px;
  font-size: 20px;
  font-family: 'Roboto_700Bold';
  color: #555763;
`;

export const FoodDescription = styled.Text`
  font-size: 16px;
  font-family: 'Roboto_400Regular';
  color: #555763;
`;
