import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Dimensions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Alert,
} from 'react-native';

import foodImg from '../../assets/food.jpg';

import {
  Container,
  Header,
  AlreadySuggestedText,
  FoodsContainer,
  Food,
  FoodImage,
  FoodName,
  InputContainer,
  TextInput,
  Icon,
} from './styles';
import api from '../../services/api';

interface InputValueReference {
  value: string;
}

interface FoodData {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

const Search: React.FC = () => {
  const [foods, setFoods] = useState<FoodData[]>([]);
  const [alreadySuggested, setAlreadySugegsted] = useState(false);

  const inputElementRef = useRef<any>(null);
  const inputValueRef = useRef<InputValueReference>({ value: '' });
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const width = Dimensions.get('window').width;

  let searchTimer: number | null;

  const navigation = useNavigation();

  navigation.addListener('focus', () => {
    api.get('/suggestions/users').then((response) => {
      if (response.data) {
        setAlreadySugegsted(true);
      } else {
        setAlreadySugegsted(false);
      }
    });
  });

  useEffect(() => {
    api.get('/foods').then((response) => {
      setFoods(response.data);
    });
  }, []);

  const handleInputFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
    },
    [],
  );

  const handleInputBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);

      setIsFilled(!!inputValueRef.current.value);
    },
    [],
  );

  const handleSearchFoods = useCallback(async (searchResult: string) => {
    inputValueRef.current.value = searchResult;
    if (searchTimer) {
      clearTimeout(searchTimer);
      searchTimer = null;
    }
    searchTimer = setTimeout(() => {
      api.get(`/foods?name=${searchResult}`).then((response) => {
        setFoods(response.data);
      });

      searchTimer = null;
    }, 500);
  }, []);

  const handleSuggestFood = useCallback(async (food_id: string) => {
    const suggestedFood = foods.find((food) => food.id === food_id);

    const today = format(new Date(), 'eeee', {
      useAdditionalWeekYearTokens: true,
      locale: pt,
    });

    if (!suggestedFood) {
      Alert.alert(
        'Algo deu errado',
        'A sua sugestão não foi confirmada, por favor tente novamente.',
      );
      return;
    }

    Alert.alert(
      'Sugerir esta comida',
      `Você está sugerindo ${suggestedFood?.name} para a refeição da próxima ${today}`,
      [
        {
          text: 'OK',
          onPress: () => {
            api
              .post('/suggestions', { food_id })
              .then((response) => {
                setAlreadySugegsted(true);
              })
              .catch((err) => {
                const { message } = err.response.data;
                Alert.alert('Ops.', message);
              });
          },
        },
        {
          text: 'Cancelar',
          onPress: () => {},
        },
      ],
      { cancelable: false },
    );
  }, []);

  const listFoods = useCallback(() => {
    let counterYellow = 2;

    return foods.map((food, index) => {
      const foodIndex = index + 1;
      if (foodIndex) {
        if (foodIndex % 2 === 0 && foodIndex === counterYellow) {
          counterYellow += 1;
          return (
            <Food
              activeOpacity={0.5}
              onPress={() => handleSuggestFood(food.id)}
              colored
              key={food.id}
            >
              <FoodImage source={{ uri: food.image_url }} />
              <FoodName>{food.name}</FoodName>
            </Food>
          );
        } else if (foodIndex % 2 !== 0 && foodIndex === counterYellow) {
          counterYellow += 3;
          return (
            <Food
              activeOpacity={0.5}
              onPress={() => handleSuggestFood(food.id)}
              colored
              key={food.id}
            >
              <FoodImage source={{ uri: food.image_url }} />
              <FoodName>{food.name}</FoodName>
            </Food>
          );
        }
      }

      return (
        <Food
          activeOpacity={0.5}
          onPress={() => handleSuggestFood(food.id)}
          key={food.id}
        >
          <FoodImage source={{ uri: food.image_url }} />
          <FoodName>{food.name}</FoodName>
        </Food>
      );
    });

    // if (foodIndex > 1) {
    //   if (foodIndex % 2 === 0 && foodIndex === counterYellow) {
    //     counterYellow += 1;
    //     return true;
    //   } else if (foodIndex % 2 !== 0 && foodIndex === counterYellow) {
    //     counterYellow += 3;
    //     return true;
    //   }
    // }

    // return false;
  }, [foods]);

  return (
    <Container>
      <Header>
        <InputContainer isFocused={isFocused}>
          <Icon
            name="search"
            size={20}
            color={isFocused || isFilled ? '#3b771f' : '#000'}
          />

          <TextInput
            ref={inputElementRef}
            placeholder="Qual a sua comida preferida?"
            autoCorrect={true}
            autoCapitalize="sentences"
            returnKeyType="search"
            keyboardAppearance="dark"
            placeholderTextColor="#B0B0BF"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChangeText={(value) => {
              handleSearchFoods(value);
            }}
            onSubmitEditing={() => inputElementRef.current?.blur()}
          />
        </InputContainer>

        {alreadySuggested && (
          <AlreadySuggestedText>
            Você já fez a sua sugestão de hoje
          </AlreadySuggestedText>
        )}
      </Header>

      <FoodsContainer
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          width: width,
          backgroundColor: '#fff',
          paddingHorizontal: 16,
          marginTop: 16,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {listFoods()}
      </FoodsContainer>
    </Container>
  );
};

export default Search;
