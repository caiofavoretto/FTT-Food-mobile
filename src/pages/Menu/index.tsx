import React, { useEffect, useState, useCallback, useContext } from 'react';

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
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'react-navigation-hooks';
import { useNavigation as useNavigationNative } from '@react-navigation/native';

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
  Meal,
  MealTitle,
  FoodList,
  FoodItem,
  FoodText,
  FoodDescription,
  MealImage,
  MenuNav,
} from './styles';

interface Params {
  navigateToMeal(): void;
}

const Menu: React.FC = () => {
  const menuData = [
    {
      id: '1',
      date: 'Hoje',
      foods: [
        {
          id: '101',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '102',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '103',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '104',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
      ],
      image_url: foodImg,
    },
    {
      id: '2',
      date: 'Amanhã',
      foods: [
        {
          id: '105',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '106',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '107',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '108',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
      ],
      image_url: foodImg,
    },
    {
      id: '3',
      date: 'Quarta-feira',
      foods: [
        {
          id: '109',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '110',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '111',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '112',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
      ],
      image_url: foodImg,
    },
    {
      id: '4',
      date: 'Quinta-feira',
      foods: [
        {
          id: '113',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '114',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '115',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '116',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
      ],
      image_url: foodImg,
    },
    {
      id: '5',
      date: 'Sexta-feira',
      foods: [
        {
          id: '117',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '118',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '119',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
        {
          id: '120',
          name: 'Arroz',
          description: '1 colher: 30 kcal',
        },
      ],
      image_url: foodImg,
    },
  ];

  const navigation = useNavigation();
  const navigationNative = useNavigationNative();

  // navigationNative.addListener('blur', () => console.log('lose focus'));

  const route = useRoute();

  const { navigateToMeal } = route.params as Params;

  const [menuPage, setMenuPage] = useState(1);

  const { setToDark } = useStatusBar();
  const { user } = useAuth();

  navigation.addListener('focus', setToDark);
  useEffect(setToDark, []);

  const handleMenuContainerScroll = useCallback((event) => {
    const offset = Number(event.nativeEvent.contentOffset.x);
    const { width } = Dimensions.get('window');
    const page = Math.round(offset / width) + 1;
    setMenuPage(page);
  }, []);

  return (
    <Container>
      <Header>
        <Title>
          Bem vindo, <Name>{user.name}</Name>
        </Title>
        <DateDescription>
          {format(new Date(), 'd MMM yyyy', {
            locale: pt,
          })}
          ,{' '}
          {format(new Date(), 'eeee', {
            useAdditionalWeekYearTokens: true,
            locale: pt,
          })}
        </DateDescription>
      </Header>

      {/* <TouchableWithoutFeedback
        onPress={() => {
          routeParams.meals();
        }}
      >
        <SharedElement id="image">
          <MealImage source={foodImg}></MealImage>
        </SharedElement>
      </TouchableWithoutFeedback> */}

      <TouchableWithoutFeedback
        onPress={() => {
          navigateToMeal();
        }}
      >
        <SharedElement id="text">
          <MyComp height={300} />
        </SharedElement>
      </TouchableWithoutFeedback>

      <Header>
        <Title>
          Bem vindo, <Name>{user.name}</Name>
        </Title>
        <DateDescription>
          {format(new Date(), 'd MMM yyyy', {
            locale: pt,
          })}
          ,{' '}
          {format(new Date(), 'eeee', {
            useAdditionalWeekYearTokens: true,
            locale: pt,
          })}
        </DateDescription>
      </Header>

      {/* <MenuContainer
        horizontal
        onScroll={handleMenuContainerScroll}
        contentContainerStyle={{ width: `${100 * menuData.length}%` }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        pagingEnabled
      >
        {menuData.map((meal) => (
          <MenuContent key={meal.id}>
            <Meal>
              <MealTitle>{meal.date}</MealTitle>
              <FoodList>
                {meal.foods.map((food) => (
                  <FoodItem key={food.id}>
                    <MaterialCommunityIcons
                      name="record-circle"
                      color="#4D6219"
                    />
                    <FoodText>
                      {food.name}{' '}
                      <FoodDescription>({food.description})</FoodDescription>
                    </FoodText>
                  </FoodItem>
                ))}
              </FoodList>
              <MealImage source={meal.image_url}></MealImage>
            </Meal>
          </MenuContent>
        ))}
      </MenuContainer>
      <MenuNav>
        {menuData.map((meal, index) => (
          <Icon
            key={String(index)}
            name="circle"
            style={{ marginHorizontal: 8 }}
            size={8}
            color={menuPage === index + 1 ? '#710502' : '#B0B0BF'}
          />
        ))}
      </MenuNav> */}
    </Container>
  );
};

export default Menu;
