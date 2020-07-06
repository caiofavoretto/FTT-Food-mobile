import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FontAwesome as Icon } from '@expo/vector-icons';

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Dimensions, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useStatusBar } from '../../hooks/statusBar';
import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';

import api from '../../services/api';

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
  LoadContainer,
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
  rated: number;
  foods: FoodsData[];
  today: boolean;
  attendant: string;
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

interface RateParams {
  meal_id: string;
  date: string;
  grade: number;
}

const Menu: React.FC = () => {
  const menuContainerRef = useRef<ScrollView>(null);

  const [loading, setLoading] = useState(true);
  const [rateLoad, setRateLoad] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [menu, setMenu] = useState<MenuData>({} as MenuData);
  const [meals, setMeals] = useState<MealData[]>([]);

  const [menuPage, setMenuPage] = useState(1);

  const { setToDark, setToLight } = useStatusBar();
  const { getCurrentTheme } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    if (getCurrentTheme() === 'light') {
      setToDark();
    } else {
      setToLight();
    }
  }, []);

  useEffect(() => {
    setLoading(true);

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
          mealsResponse.push(menuResponse.monday_meal);
        }

        if (menuResponse.tuesday_meal) {
          mealsResponse.push(menuResponse.tuesday_meal);
        }

        if (menuResponse.wednesday_meal) {
          mealsResponse.push(menuResponse.wednesday_meal);
        }

        if (menuResponse.thursday_meal) {
          mealsResponse.push(menuResponse.thursday_meal);
        }

        if (menuResponse.friday_meal) {
          const meal = menuResponse.friday_meal;
          mealsResponse.push(meal);
        }

        setMeals(mealsResponse);

        setLoading(false);

        setTimeout(() => {
          const mealIndex = meals.findIndex((meal) => meal.today);
          const { width } = Dimensions.get('window');

          menuContainerRef.current?.scrollTo({
            x: mealIndex * width,
            y: 0,
            animated: true,
          });
        }, 500);
      })
      .catch((err) => {
        console.log(err.response.data);

        setLoading(false);
      });
  }, []);

  const handleOpenModal = useCallback(() => {
    if (!modalOpen) {
      setModalOpen(true);
    }
  }, [modalOpen]);

  const handleCloseModal = useCallback(() => {
    if (modalOpen) {
      setModalOpen(false);
    }
  }, [modalOpen]);

  const handleMenuContainerScroll = useCallback((event) => {
    const offset = Number(event.nativeEvent.contentOffset.x);
    const { width } = Dimensions.get('window');
    const page = Math.round(offset / width) + 1;
    setMenuPage(page);
  }, []);

  const handleAttendance = useCallback(async (attendance: string) => {
    try {
      if (!attendance) {
        const response = await api.post('/attendances');

        setMeals((prevMeals) =>
          prevMeals.filter((prevMeal) => {
            if (prevMeal.today) {
              prevMeal.attendant = response.data.id;
            }

            return prevMeal;
          }),
        );
      } else {
        await api.delete(`/attendances/${attendance}`);

        setMeals((prevMeals) =>
          prevMeals.filter((prevMeal) => {
            if (prevMeal.today) {
              prevMeal.attendant = '';
            }

            return prevMeal;
          }),
        );
      }
    } catch (err) {
      const { message } = err.response.data;

      Alert.alert('Ops.', message);
    }
  }, []);

  const handleRate = useCallback(
    async (data: RateParams) => {
      try {
        setRateLoad(true);
        const newMeal = await api.post<MealData>('ratings', {
          ...data,
          menu_id: menu.id,
        });

        setMeals(
          meals.filter((meal) => {
            if (meal.id === data.meal_id) {
              meal.rating = newMeal.data.rating;

              if (meal.date === data.date) {
                meal.rated = newMeal.data.rated;
              }
            }
            return meal;
          }),
        );

        setRateLoad(false);
      } catch (err) {
        const { message } = err.response.data;

        Alert.alert('Ops.', message);

        setRateLoad(false);
      }
    },
    [menu, meals],
  );

  return (
    <Container theme={getCurrentTheme()}>
      <Header>
        <Title theme={getCurrentTheme()}>
          Bem vind{user.gender.description === 'Masculino' ? 'o' : 'a'},{' '}
          <Name>{user.name}</Name>
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

      {!loading ? (
        <>
          <MenuContainer
            ref={menuContainerRef}
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
                activeOpacity={1}
                onPress={handleOpenModal}
                key={`${meal.id}-${meal.date}`}
                disabled={modalOpen}
              >
                {modalOpen && (
                  <MealDetails
                    loading={rateLoad}
                    handleRate={handleRate}
                    handleAttendance={handleAttendance}
                    close={handleCloseModal}
                    grow={modalOpen}
                    data={meal}
                  />
                )}
                {!modalOpen && (
                  <Meal
                    handleAttendance={handleAttendance}
                    open={handleOpenModal}
                    grow={modalOpen}
                    data={meal}
                  />
                )}
              </MenuContent>
            ))}
          </MenuContainer>
          <MenuNav>
            {meals.map((_, index) => (
              <Icon
                key={String(index)}
                name="circle"
                style={{ marginHorizontal: 8 }}
                size={8}
                color={
                  menuPage === index + 1
                    ? getCurrentTheme() === 'light'
                      ? '#710502'
                      : '#8A0E0B'
                    : '#B0B0BF'
                }
              />
            ))}
          </MenuNav>
        </>
      ) : (
        <LoadContainer>
          <ActivityIndicator style={{ zIndex: 21 }} />
        </LoadContainer>
      )}
    </Container>
  );
};

export default Menu;
