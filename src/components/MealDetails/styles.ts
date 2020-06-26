import styled, { css } from 'styled-components/native';

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

export const MealTitle = styled.Text`
  margin-top: 256px;
  font-size: 28px;
  font-family: 'Roboto_700Bold';
  color: #000;
  text-transform: capitalize;
`;

export const MealRating = styled.View`
  position: absolute;
  top: 32px;
  right: 32px;
  flex-direction: row;
  align-items: center;
`;

export const RatingText = styled.Text`
  font-size: 16px;
  margin-left: 8px;
`;

export const MealNotRated = styled.Text`
  font-size: 16px;
  margin-left: 8px;
  color: #fff;
  font-family: 'Roboto_500Medium';
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

export const MealImage = styled.Image`
  height: 256px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;
