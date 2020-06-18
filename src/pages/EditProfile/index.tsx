import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
// import { useRoute } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

import { View, Text } from 'react-native';

import { Container } from './styles';

interface Params {
  title: string;
  data: string;
}

const EditProfile: React.FC = () => {
  const navigation = useNavigation();

  // const route = useRoute();

  // const { title, data } = route.params as Params;

  return (
    <Container>
      <SharedElement id="form">
        <View>
          <Text>oi</Text>
          <Text>xau</Text>
        </View>
      </SharedElement>
    </Container>
  );
};

EditProfile.sharedElements = (navigation: ReturnType<typeof useNavigation>) => {
  return [{ id: 'form' }];
};

export default EditProfile;
