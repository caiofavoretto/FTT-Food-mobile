import styled, { css } from 'styled-components/native';

interface ThemeProps {
  theme: 'light' | 'dark';
}

interface ContainerProps extends ThemeProps {
  grow: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  background: ${(props) => (props.theme === 'light' ? '#fff' : '#1a1a1a')};
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

export const MealTitle = styled.Text<ThemeProps>`
  font-size: 20px;
  font-family: 'Roboto_700Bold';
  color: ${(props) => (props.theme === 'light' ? '#000' : '#fff')};
  text-transform: capitalize;
`;

export const MealAction = styled.View`
  position: absolute;
  top: 32px;
  right: 32px;
  flex-direction: row;
  align-items: center;
`;

export const RatingText = styled.Text`
  font-size: 16px;
  margin-left: 8px;
  font-family: 'Roboto_400Regular';
  color: ${(props) => (props.theme === 'light' ? '#000' : '#fff')};
`;

export const NotAttendant = styled.Text`
  font-size: 16px;
  margin-left: 8px;
  color: #b0b0bf;
  font-family: 'Roboto_500Medium';
`;

interface ActionButtonProps extends ThemeProps {
  attendant?: boolean;
  rate?: boolean;
}

export const ActionButton = styled.TouchableOpacity<ActionButtonProps>`
  margin-left: 8px;
  background: ${(props) => (props.theme === 'light' ? '#b0b0bf' : '#666')};
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

  transform: translateY(-2px);
  padding: 4px 10px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
`;

export const ActionButtonText = styled.Text`
  margin-left: 8px;
  font-size: 16px;
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

export const FoodText = styled.Text<ThemeProps>`
  margin-left: 16px;
  font-size: 16px;
  font-family: 'Roboto_700Bold';
  color: ${(props) => (props.theme === 'light' ? '#555763' : '#999')};
`;

export const FoodDescription = styled.Text<ThemeProps>`
  font-size: 16px;
  font-family: 'Roboto_400Regular';
  color: ${(props) => (props.theme === 'light' ? '#555763' : '#999')};
`;

export const MealImage = styled.Image`
  height: 170px;
  width: 100%;
  border-radius: 22px;
`;
