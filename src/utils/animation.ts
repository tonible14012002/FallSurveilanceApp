import {Animated} from 'react-native';

export const CreatePulseAnimation = (
  value: Animated.Value,
  minValue: number,
  maxValue: number,
) =>
  Animated.loop(
    Animated.sequence([
      Animated.timing(value, {
        toValue: maxValue,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(value, {
        toValue: minValue,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]),
  );
