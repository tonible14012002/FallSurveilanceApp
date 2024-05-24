import {useTheme} from '@ui-kitten/components';
import {useEffect, useRef} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import {CreatePulseAnimation} from '~/utils/animation';

interface SkeletonProps {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  radius?: number;
}

export const Skeleton = (props: SkeletonProps) => {
  const {width, height, style, radius} = props;
  const theme = useTheme();
  const opacity = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    CreatePulseAnimation(opacity, 0.5, 1).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          opacity: opacity,
          height,
          width,
          borderRadius: radius ?? 8,
          backgroundColor: theme['color-basic-400'],
        },
        style,
      ]}
    />
  );
};
