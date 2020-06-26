import React, { useEffect, useState, useCallback, useContext } from 'react';
import {
  FontAwesome as Icon,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { format, addDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Dimensions, StyleSheet } from 'react-native';
import { useStatusBar } from '../../hooks/statusBar';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import foodImg from '../../assets/food.jpg';

import Meal from '../../components/Meal';
import MealDetails from '../../components/MealDetails';

import {
  Container,
  Header,
  Title,
  Name,
  DateDescription,
  MenuContainer,
  MenuContent,
  MenuNav,
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

interface MenuData {
  id: string;
  description: string;
  initial_date: string;
  end_date: Date;
  monday_meal: MealData;
  tuesday_meal: MealData;
  wednesday_meal: MealData;
  thursday_meal: MealData;
  friday_meal: MealData;
  created_at: Date;
  updated_at: Date;
}

const Menu: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [menu, setMenu] = useState<MenuData>({} as MenuData);
  const [meals, setMeals] = useState<MealData[]>([]);

  const navigation = useNavigation();

  const [menuPage, setMenuPage] = useState(1);

  const { setToDark } = useStatusBar();
  const { user } = useAuth();

  navigation.addListener('focus', setToDark);
  useEffect(setToDark, []);

  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd', {
      locale: pt,
    });

    api
      .get(`/menus?date=${today}`)
      .then((response) => {
        const menuResponse = response.data[0] as MenuData;

        setMenu(menuResponse);

        const mealsResponse: MealData[] = [];

        if (menuResponse.monday_meal) {
          const meal = menuResponse.monday_meal as MealData;
          meal.date = format(parseISO(menuResponse.initial_date), 'eeee', {
            useAdditionalWeekYearTokens: true,
            locale: pt,
          });

          mealsResponse.push(meal);
        }

        if (menuResponse.tuesday_meal) {
          const meal = menuResponse.tuesday_meal as MealData;
          meal.date = format(
            addDays(parseISO(menuResponse.initial_date), 1),
            'eeee',
            {
              useAdditionalWeekYearTokens: true,
              locale: pt,
            },
          );

          mealsResponse.push(meal);
        }

        if (menuResponse.wednesday_meal) {
          const meal = menuResponse.wednesday_meal as MealData;
          meal.date = format(
            addDays(parseISO(menuResponse.initial_date), 2),
            'eeee',
            {
              useAdditionalWeekYearTokens: true,
              locale: pt,
            },
          );

          mealsResponse.push(meal);
        }

        if (menuResponse.thursday_meal) {
          const meal = menuResponse.thursday_meal as MealData;
          meal.date = format(
            addDays(parseISO(menuResponse.initial_date), 3),
            'eeee',
            {
              useAdditionalWeekYearTokens: true,
              locale: pt,
            },
          );

          mealsResponse.push(meal);
        }

        if (menuResponse.friday_meal) {
          const meal = menuResponse.friday_meal as MealData;
          meal.date = format(
            addDays(parseISO(menuResponse.initial_date), 4),
            'eeee',
            {
              useAdditionalWeekYearTokens: true,
              locale: pt,
            },
          );

          mealsResponse.push(meal);
        }

        setMeals(mealsResponse);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

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

      <MenuContainer
        horizontal
        onScroll={handleMenuContainerScroll}
        contentContainerStyle={{ width: `${100 * meals.length}%` }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        pagingEnabled
        scrollEnabled={!modalOpen}
      >
        {meals.map((meal) => (
          <MenuContent
            grow={modalOpen}
            activeOpacity={1}
            onPress={() => setModalOpen((prevState) => !prevState)}
            key={`${meal.id}-${meal.date}`}
          >
            {modalOpen && <MealDetails grow={modalOpen} data={meal} />}
            {!modalOpen && <Meal grow={modalOpen} data={meal} />}
          </MenuContent>
        ))}
      </MenuContainer>
      <MenuNav>
        {meals.map((meal, index) => (
          <Icon
            key={String(index)}
            name="circle"
            style={{ marginHorizontal: 8 }}
            size={8}
            color={menuPage === index + 1 ? '#710502' : '#B0B0BF'}
          />
        ))}
      </MenuNav>
    </Container>
  );
};

export default Menu;
