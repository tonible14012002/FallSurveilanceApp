import {
  Avatar as PrimitiveAvatar,
  AvatarProps,
  useTheme,
} from '@ui-kitten/components';
import {Text, View} from 'react-native';

export const Avatar = (props: AvatarProps & {label: string}) => {
  let src = props.source;
  const theme = useTheme();
  if (!props.source || !(props.source as any)?.uri) {
    src = {
      uri: 'https://source.boringavatars.com/beam/120/?colors=665c52,74b3a7,a3ccaf,E6E1CF,CC5B14',
    };
  }
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderRadius: 9000,
        backgroundColor: theme['color-basic-400'],
        elevation: 1,
      }}>
      <PrimitiveAvatar {...props} source={src} />
      <Text
        // @ts-ignore
        style={{
          position: 'absolute',
          textTransform: 'capitalize',
        }}>
        {props.label?.[0] ?? ''}
      </Text>
    </View>
  );
};
