import React, { useCallback, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import {
  FontAwesome as Icon,
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
} from '@expo/vector-icons';
import { useTheme } from '../../hooks/theme';

import foodImg from '../../assets/food.jpg';

import {
  Container,
  CloseButton,
  MealContent,
  MealTitle,
  MealDescription,
  MealAction,
  RatingContainer,
  RateAction,
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
  rated: number;
  attendant: string;
}

interface RateParams {
  meal_id: string;
  date: string;
  grade: number;
}

interface MealDetailsProps {
  loading: boolean;
  data: MealData;
  grow: boolean;
  close(): void;
  handleAttendance(attendance: string): void;
  handleRate(params: RateParams): void;
}

const MealDetails: React.FC<MealDetailsProps> = ({
  loading,
  data,
  grow,
  close,
  handleAttendance,
  handleRate,
}) => {
  const [rating, setRating] = useState(data.rated);

  const { getCurrentTheme } = useTheme();

  const handleMealRating = useCallback(
    (grade: number) => {
      if (data.rated) {
        Alert.alert('ops.', 'Você já avaliou esta refeição');
        return;
      }

      setRating(grade);
      handleRate({ date: data.date, grade, meal_id: data.id });
    },
    [data],
  );

  return (
    <Container grow={grow} theme={getCurrentTheme()}>
      <MealImage
        resizeMode="cover"
        source={{ uri: data.image_url || foodImg }}
      ></MealImage>

      <CloseButton activeOpacity={0.7} onPress={close}>
        <Feather name="x" color="#000" size={20} />
      </CloseButton>

      {!data.today && data.attendant ? (
        <RateAction>
          <Icon
            onPress={() => handleMealRating(1)}
            name={rating >= 1 ? 'star' : 'star-o'}
            color="#f4a927"
            size={28}
          />
          <Icon
            onPress={() => handleMealRating(2)}
            style={{ marginLeft: 16 }}
            name={rating >= 2 ? 'star' : 'star-o'}
            color="#f4a927"
            size={28}
          />
          <Icon
            onPress={() => handleMealRating(3)}
            style={{ marginLeft: 16 }}
            name={rating >= 3 ? 'star' : 'star-o'}
            color="#f4a927"
            size={28}
          />
          <Icon
            onPress={() => handleMealRating(4)}
            style={{ marginLeft: 16 }}
            name={rating >= 4 ? 'star' : 'star-o'}
            color="#f4a927"
            size={28}
          />
          <Icon
            onPress={() => handleMealRating(5)}
            style={{ marginLeft: 16 }}
            name={rating >= 5 ? 'star' : 'star-o'}
            color="#f4a927"
            size={28}
          />
        </RateAction>
      ) : (
        <></>
      )}

      <MealAction>
        {!data.today ? (
          data.attendant ? (
            <RatingContainer>
              {(data.rated && data.rating) || loading ? (
                <>
                  <Icon name="star" color="#f4a927" size={18} />
                  {loading ? (
                    <ActivityIndicator style={{ marginLeft: 8 }} />
                  ) : (
                    <RatingText>{data.rating.toFixed(1)}</RatingText>
                  )}
                </>
              ) : (
                <></>
              )}
            </RatingContainer>
          ) : (
            <RatingContainer>
              <NotAttendant>Não presente</NotAttendant>
            </RatingContainer>
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

      <MealContent
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <MealDescription>{data.description}</MealDescription>
        <MealTitle theme={getCurrentTheme()}>{data.dayOfTheWeek}</MealTitle>

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
      </MealContent>
    </Container>
  );
};

export default MealDetails;
