import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Animated, Even } from 'react-native';
import { useStatusBar } from '../../hooks/statusBar';
import {
  PanGestureHandler,
  State,
  PanGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';

const Search: React.FC = () => {
  const { setToDark } = useStatusBar();

  useEffect(setToDark, []);

  // Animação
  let offsetY = 0;
  let offsetX = 0;
  const translateY = new Animated.Value(0);
  const translateX = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
          translationX: translateX,
        },
      },
    ],
    { useNativeDriver: true },
  );

  function onHandlerStateChanged(event: PanGestureHandlerStateChangeEvent) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY, translationX } = event.nativeEvent;

      offsetY += translationY;
      offsetX += translationX;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateX.setValue(offsetX);
        translateX.setOffset(0);
        offsetX = 0;

        translateY.setValue(offsetY);
        translateY.setOffset(0);
        offsetY = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offsetY = opened ? 380 : 0;
        translateY.setOffset(offsetY);
        translateY.setValue(0);
      });

      Animated.timing(translateX, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offsetX = opened ? 380 : 0;
        translateX.setOffset(offsetX);
        translateX.setValue(0);
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={animatedEvent}
        onHandlerStateChange={onHandlerStateChanged}
      >
        <Animated.View
          style={[
            styles.ball,
            {
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [-350, 0, 380],
                    outputRange: [-50, 0, 380],
                    extrapolate: 'clamp',
                  }),
                },
                {
                  translateX: translateX.interpolate({
                    inputRange: [-350, 0, 380],
                    outputRange: [-50, 0, 380],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        />
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  ball: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f00',
  },
});

export default Search;
