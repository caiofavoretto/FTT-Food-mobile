import styled from 'styled-components/native';

import { Dimensions } from 'react-native';

const width = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  background: #fff;
  padding: 32px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-family: 'Roboto_700Bold';
  color: #000;
`;

export const Name = styled.Text`
  font-size: 28px;
  font-family: 'Roboto_700Bold';
  color: #f4a927;
`;

export const DateDescription = styled.Text`
  margin-top: 16px;
  font-size: 16px;
  font-family: 'Roboto_700Bold';
  color: #b0b0bf;
  text-transform: capitalize;
`;

export const MenuContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

export const MenuContent = styled.View`
  width: ${width.width}px;
  padding: 8px 16px;
  justify-content: space-between;
`;

export const Meal = styled.View`
  flex: 1;
  background: #fff;
  border-radius: 32px;
  padding: 32px;
  shadow-color: #000;
  shadow-radius: 5px;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.16;
  elevation: 4;
`;

export const MealTitle = styled.Text`
  font-size: 20px;
  font-family: 'Roboto_700Bold';
  color: #000;
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
  font-size: 16px;
  font-family: 'Roboto_700Bold';
  color: #555763;
`;

export const FoodDescription = styled.Text`
  font-size: 16px;
  font-family: 'Roboto_400Regular';
  color: #555763;
`;

export const MealImage = styled.Image`
  height: 170px;
  width: 100%;
`;

export const MenuNav = styled.View`
  height: 64px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
