import {Layout} from '@ui-kitten/components';
import {useEffect, useRef} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';

interface SkeletonProps {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

export const Skeleton = (props: SkeletonProps) => {
  const {width, height, style} = props;
  const opacity = useRef(new Animated.Value(0.4));
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 0.8,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.4,
          useNativeDriver: true,
          duration: 500,
        }),
      ]),
    );
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {opacity: opacity.current, height, width, borderRadius: 24},
        style,
      ]}>
      <Layout />
    </Animated.View>
  );
};
