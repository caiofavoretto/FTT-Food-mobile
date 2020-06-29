import React from 'react';
import {
  FontAwesome as Icon,
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
} from '@expo/vector-icons';

import foodImg from '../../assets/food.jpg';

import {
  Container,
  CloseButton,
  MealContent,
  MealTitle,
  MealAction,
  RatingContainer,
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
  close(): void;
}

const MealDetails: React.FC<MealProps> = ({ data, grow, close }) => {
  return (
    <Container grow={grow}>
      <MealImage
        resizeMode="cover"
        source={data.image_url || foodImg}
      ></MealImage>

      <CloseButton activeOpacity={0.7} onPress={close}>
        <Feather name="x" color="#000" size={20} />
      </CloseButton>

      <MealAction>
        {!data.today ? (
          data.attendant ? (
            data.rating ? (
              <RatingContainer>
                <Icon name="star" color="#f4a927" size={18} />
                <RatingText>{data.rating.toFixed(1)}</RatingText>
              </RatingContainer>
            ) : (
              <ActionButton color="#f17b15">
                <Icon name="star" color="#fff" size={12} />
                <ActionButtonText>Avaliar</ActionButtonText>
              </ActionButton>
            )
          ) : (
            <NotAttendant>Não presente</NotAttendant>
          )
        ) : (
          <ActionButton color="#4D6219">
            <FontAwesome5 name="user-check" color="#fff" size={12} />
            <ActionButtonText>Presença</ActionButtonText>
          </ActionButton>
        )}
      </MealAction>

      <MealContent
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <MealTitle>{data.dayOfTheWeek}</MealTitle>

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
      </MealContent>
    </Container>
  );
};

export default MealDetails;
