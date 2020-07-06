import React, { useRef, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useStatusBar } from '../../hooks/statusBar';
import { useTheme } from '../../hooks/theme';

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Dimensions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  RefreshControl,
  Alert,
} from 'react-native';

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
  LoadContainer,
  SuggestLoadContainer,
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
  const [loading, setLoading] = useState(true);
  const [suggestLoad, setSuggestLoad] = useState(false);
  const [foods, setFoods] = useState<FoodData[]>([]);
  const [alreadySuggested, setAlreadySugegsted] = useState(false);

  const inputElementRef = useRef<any>(null);
  const inputValueRef = useRef<InputValueReference>({ value: '' });
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const width = Dimensions.get('window').width;

  let searchTimer: number | null;

  const { setToDark } = useStatusBar();
  const { getCurrentTheme } = useTheme();

  const getApiData = useCallback(() => {
    setLoading(true);

    api.get(`/foods`).then((response) => {
      inputValueRef.current.value = '';
      setFoods(response.data);
    });
    api.get('/suggestions/users').then((response) => {
      setToDark();
      if (response.data) {
        setAlreadySugegsted(true);
      } else {
        setAlreadySugegsted(false);
      }
      setLoading(false);
    });
  }, [setFoods]);

  useEffect(getApiData, []);

  const handleInputFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
    },
    [setIsFocused],
  );

  const handleInputBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);

      setIsFilled(!!inputValueRef.current.value);
    },
    [setIsFocused],
  );

  const handleSearchFoods = useCallback(
    async (searchResult: string) => {
      inputValueRef.current.value = searchResult;
      if (searchTimer) {
        clearTimeout(searchTimer);
        searchTimer = null;
      }
      searchTimer = setTimeout(() => {
        setLoading(true);
        api.get(`/foods?name=${searchResult}`).then((response) => {
          setFoods(response.data);
          setLoading(false);
        });

        searchTimer = null;
      }, 500);
    },
    [setFoods],
  );

  const handleSuggestFood = useCallback(
    async (food_id: string) => {
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
            text: 'Cancelar',
            onPress: () => {},
          },
          {
            text: 'OK',
            onPress: () => {
              setSuggestLoad(true);
              api
                .post('/suggestions', { food_id })
                .then((response) => {
                  setAlreadySugegsted(true);

                  setTimeout(() => {
                    setSuggestLoad(false);
                  }, 2000);
                })
                .catch((err) => {
                  const { message } = err.response.data;
                  setTimeout(() => {
                    Alert.alert('Ops.', message);
                    setSuggestLoad(false);
                  }, 5000);
                });

              setAlreadySugegsted(true);
            },
          },
        ],
        { cancelable: false },
      );
    },
    [foods],
  );

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

      {suggestLoad && (
        <SuggestLoadContainer>
          <ActivityIndicator size="small" color="#fff" />
        </SuggestLoadContainer>
      )}

      {!loading ? (
        <FoodsContainer
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getApiData} />
          }
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
      ) : (
        <LoadContainer>
          <ActivityIndicator />
        </LoadContainer>
      )}
    </Container>
  );
};

export default Search;
