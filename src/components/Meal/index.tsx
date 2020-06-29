import React from 'react';
import {
  FontAwesome as Icon,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';

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
  today: boolean;
  attendant: string;
}

interface MealProps {
  data: MealData;
  grow: boolean;
  handleAttendance(attendance: string): void;
}

const Meal: React.FC<MealProps> = ({ data, grow, handleAttendance }) => {
  return (
    <Container grow={grow}>
      <MealTitle>{data.dayOfTheWeek}</MealTitle>
      <MealAction>
        {!data.today ? (
          data.attendant ? (
            data.rating ? (
              <>
                <Icon name="star" color="#f4a927" size={18} />
                <RatingText>{data.rating.toFixed(1)}</RatingText>
              </>
            ) : (
              <ActionButton rate>
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
            <FoodText>
              {food.name}{' '}
              <FoodDescription>({food.description})</FoodDescription>
            </FoodText>
          </FoodItem>
        ))}
      </FoodList>
      <MealImage source={data.image_url || foodImg}></MealImage>
    </Container>
  );
};

export default Meal;
