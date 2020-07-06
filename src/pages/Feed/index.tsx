import React from 'react';
import { Image, Text, StyleSheet, View, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { BlurView } from 'expo-blur';

const uri =
  'https://s3.amazonaws.com/exp-icon-assets/ExpoEmptyManifest_192.png';

// import { Container } from './styles';

const Feed: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.blurredImage} source={{ uri }} />
      </ScrollView>

      <BlurView
        intensity={0}
        style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}
      >
        <Text>Hello! I am bluring contents underneath</Text>
      </BlurView>
      <BlurView intensity={100} style={[styles.nonBlurredContent]}>
        <Text>Hello! I am bluring contents underneath</Text>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurredImage: {
    width: 192,
    height: 192,
  },
  nonBlurredContent: {
    position: 'absolute',
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Feed;
