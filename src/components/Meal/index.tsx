import React from 'react';
import {
  FontAwesome as Icon,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { useTheme } from '../../hooks/theme';

import foodImg from '../../assets/food.jpg';

import {
  Container,
  MealTitle,
  MealAction,
  RatingText,
  NotAttendant,
  ActionButton,
  ActionButtonText,
  FoodList,
  FoodItem,
  FoodText,
  FoodDescription,
  MealImage,
} from './styles';

interface FoodsData {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

interface MealData {
  id: string;
  description: string;
  date: string;
  dayOfTheWeek: string;
  image_url: string;
  rating: number;
  foods: FoodsData[];
  rated: number;
  today: boolean;
  attendant: string;
}

interface MealProps {
  data: MealData;
  grow: boolean;
  handleAttendance(attendance: string): void;
  open(): void;
}

const Meal: React.FC<MealProps> = ({ data, grow, handleAttendance, open }) => {
  const { getCurrentTheme } = useTheme();

  return (
    <Container grow={grow} theme={getCurrentTheme()}>
      <MealTitle theme={getCurrentTheme()}>{data.dayOfTheWeek}</MealTitle>
      <MealAction>
        {!data.today ? (
          data.attendant ? (
            data.rated ? (
              <>
                <Icon name="star" color="#f4a927" size={18} />
                <RatingText theme={getCurrentTheme()}>
                  {data.rating.toFixed(1)}
                </RatingText>
              </>
            ) : (
              <ActionButton
                activeOpacity={0.7}
                rate
                onPress={open}
                theme={getCurrentTheme()}
              >
                <Icon name="star" color="#fff" size={12} />
                <ActionButtonText>Avaliar</ActionButtonText>
              </ActionButton>
            )
          ) : (
            <NotAttendant>Não presente</NotAttendant>
          )
        ) : (
          <ActionButton
            activeOpacity={0.7}
            attendant={!!data.attendant}
            onPress={() => handleAttendance(data.attendant)}
            theme={getCurrentTheme()}
          >
            <FontAwesome5
              name={!!data.attendant ? 'user-check' : 'user-plus'}
              color="#fff"
              size={12}
            />
            <ActionButtonText>Presença</ActionButtonText>
          </ActionButton>
        )}
      </MealAction>

      <FoodList>
        {data.foods.map((food) => (
          <FoodItem key={food.id}>
            <MaterialCommunityIcons name="record-circle" color="#4D6219" />
            <FoodText theme={getCurrentTheme()}>
              {food.name}{' '}
              <FoodDescription theme={getCurrentTheme()}>
                ({food.description})
              </FoodDescription>
            </FoodText>
          </FoodItem>
        ))}
      </FoodList>
      <MealImage source={{ uri: data.image_url || foodImg }}></MealImage>
    </Container>
  );
};

export default Meal;
