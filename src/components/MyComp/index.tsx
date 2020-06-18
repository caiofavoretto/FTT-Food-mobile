import React from 'react';
import { View, Text, Image } from 'react-native';

import foodImg from '../../assets/food.jpg';

interface MyCompProps {
  height: number;
}

const MyComp: React.FC<MyCompProps> = ({ height }) => {
  return (
    <View style={{ backgroundColor: '#000', height: height }}>
      <Text style={{ color: '#fff' }}>TESTE</Text>
      <Image source={foodImg} style={{ width: '100%', height: 80 }}></Image>
    </View>
  );
};

export default MyComp;
