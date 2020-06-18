import React, { useEffect, useState, useCallback } from 'react';

import { SharedElement } from 'react-navigation-shared-element';

import {
  FontAwesome as Icon,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Dimensions, TouchableWithoutFeedback, View, Text } from 'react-native';
import { useStatusBar } from '../../hooks/statusBar';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from 'react-navigation-hooks';

import foodImg from '../../assets/food.jpg';

import MyComp from '../../components/MyComp';

import {
  Container,
  Header,
  Title,
  Name,
  DateDescription,
  MenuContainer,
  MenuContent,
  MealTitle,
  FoodList,
  FoodItem,
  FoodText,
  FoodDescription,
  MealImage,
  MenuNav,
} from './styles';

const Meal: React.FC = () => {
  const navigation = useNavigation();

  const { setToDark } = useStatusBar();

  useEffect(setToDark, []);

  return (
    <Container>
      {/* <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Main', { screen: 'Menu' });
        }}
      >
        <SharedElement id="image">
          <MealImage style={{ height: 300 }} source={foodImg}></MealImage>
        </SharedElement>
      </TouchableWithoutFeedback> */}

      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Main', { screen: 'Menu' });
        }}
      >
        <SharedElement id="text">
          <MyComp height={1000} />
        </SharedElement>
      </TouchableWithoutFeedback>
    </Container>
  );
};

Meal.sharedElements = (navigation: ReturnType<typeof useNavigation>) => {
  return [
    { id: 'image', animation: 'fade' },
    { id: 'text', animation: 'fade' },
  ];
};

export default Meal;
