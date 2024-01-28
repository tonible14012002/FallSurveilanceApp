import {
  Avatar as PrimitiveAvatar,
  type AvatarProps as PrimitiveAvatarProps,
} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

type AvatarProps = {
  avatarProps: PrimitiveAvatarProps;
  iconWrapperStyle?: Object;
  icon?: React.ReactNode;
  text?: React.ReactNode;
  textPosition?: 'inline' | 'block';
} & (
  | {
      pressable: true;
      onPress: () => void;
    }
  | {
      pressable: false;
    }
);

export default function Avatar(props: AvatarProps) {
  const {
    pressable,
    iconWrapperStyle = {},
    avatarProps,
    icon: Icon = null,
    text = null,
    textPosition = 'block',
    ...restProps
  } = props;

  const Wrapper = pressable ? TouchableOpacity : React.Fragment;

  const isTextInline = textPosition === 'inline';

  return (
    <Wrapper {...restProps}>
      <View
        style={{
          ...styles.innerWrapper,
          flexDirection: isTextInline ? 'row' : 'column',
          gap: isTextInline ? 10 : 5,
        }}>
        <PrimitiveAvatar {...avatarProps} />
        {Icon && (
          <View style={[styles.iconWrapper, iconWrapperStyle]}>{Icon}</View>
        )}
        {text}
      </View>
      <TouchableOpacity></TouchableOpacity>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  innerWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    top: 0,
    right: -10,
  },
});
