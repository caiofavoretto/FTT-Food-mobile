import React from 'react';
import {
  FontAwesome as Icon,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import foodImg from '../../assets/food.jpg';

import {
  Container,
  MealTitle,
  MealRating,
  RatingText,
  MealNotRated,
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
  image_url: string;
  rating: number;
  foods: FoodsData[];
}

interface MealProps {
  data: MealData;
  grow: boolean;
}

const Meal: React.FC<MealProps> = ({ data, grow }) => {
  return (
    <Container grow={grow}>
      <MealTitle>{data.date}</MealTitle>
      <MealRating>
        {data.rating ? (
          <>
            <Icon name="star" color="#f4a927" size={18} />
            <RatingText>{data.rating}</RatingText>
          </>
        ) : (
          <MealNotRated>Não avaliado</MealNotRated>
        )}
      </MealRating>

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
