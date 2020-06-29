import React, { useEffect, useState, useCallback, useContext } from 'react';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { format, addDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Dimensions, Alert } from 'react-native';
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
  dayOfTheWeek: string;
  image_url: string;
  rating: number;
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

const Menu: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [menu, setMenu] = useState<MenuData>({} as MenuData);
  const [meals, setMeals] = useState<MealData[]>([]);

  const navigation = useNavigation();

  const [menuPage, setMenuPage] = useState(1);

  const { setToDark, setToLight } = useStatusBar();
  const { user } = useAuth();

  navigation.addListener('focus', () => {
    if (modalOpen) {
      setToLight();
    } else {
      setToDark();
    }
  });

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

          meal.attendant = 'true';

          mealsResponse.push(meal);
        }

        if (menuResponse.tuesday_meal) {
          const meal = menuResponse.tuesday_meal as MealData;

          meal.attendant = 'true';

          mealsResponse.push(meal);
        }

        if (menuResponse.wednesday_meal) {
          mealsResponse.push(menuResponse.wednesday_meal);
        }

        if (menuResponse.thursday_meal) {
          mealsResponse.push(menuResponse.thursday_meal);
        }

        if (menuResponse.friday_meal) {
          mealsResponse.push(menuResponse.friday_meal);
        }

        setMeals(mealsResponse);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const handleOpenModal = useCallback(() => {
    console.log('open');
    if (!modalOpen) {
      setToLight();
      setModalOpen(true);
    }
  }, [modalOpen]);

  const handleCloseModal = useCallback(() => {
    console.log('close');
    if (modalOpen) {
      setToDark();
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
    console.log(attendance);
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

  return (
    <Container>
      <Header>
        <Title>
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
            activeOpacity={1}
            onPress={handleOpenModal}
            key={`${meal.id}-${meal.date}`}
            disabled={modalOpen}
          >
            {modalOpen && (
              <MealDetails
                close={handleCloseModal}
                grow={modalOpen}
                data={meal}
              />
            )}
            {!modalOpen && (
              <Meal
                handleAttendance={handleAttendance}
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
            color={menuPage === index + 1 ? '#710502' : '#B0B0BF'}
          />
        ))}
      </MenuNav>
    </Container>
  );
};

export default Menu;
