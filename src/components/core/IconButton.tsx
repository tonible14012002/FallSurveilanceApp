import {Pressable, StyleProp, View, ViewStyle} from 'react-native';
import {ReactNode} from 'react';

interface IconButtonProps {
  onPress?: () => void;
  icon: ReactNode;
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
}

export const IconButton = ({
  onPress,
  icon,
  width,
  height,
  style,
}: IconButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      {({pressed}) => (
        <View
          style={[
            {
              borderRadius: 1000,
              transform: [{scale: pressed ? 0.9 : 1}],
              alignItems: 'center',
              justifyContent: 'center',
              width,
              height,
            },
            style,
          ]}>
          {icon}
        </View>
      )}
    </Pressable>
  );
};
