import {Layout} from '@ui-kitten/components';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import TextFallback from './TextFallback';

interface ListItemProps {
  wrapperStyle?: StyleProp<ViewStyle>;
  textContentWrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
  isLeftIcon?: boolean;
  isRightIcon?: boolean;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  rightEle?: React.ReactNode;
  level?: '1' | '2' | '3';
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant';
  onPressHandler?: (event: GestureResponderEvent) => void;
}

export default function ListItem(props: ListItemProps) {
  const {
    title,
    leftIcon,
    rightEle = null,
    subTitle = null,
    wrapperStyle = {},
    textContentWrapperStyle = {},
    style = {},
    level = '3',
    size = 'medium',
    onPressHandler = () => {},
  } = props;

  return (
    <Pressable onPress={onPressHandler}>
      {({pressed}) => {
        const styles = getStyles({pressed, size});
        return (
          <Layout style={[styles.container, wrapperStyle]} level={level}>
            <View style={[styles.itemBody, style]}>
              {leftIcon}
              <View style={textContentWrapperStyle}>
                <TextFallback category="s2">{title as any}</TextFallback>
                <TextFallback category="c1">{subTitle as any}</TextFallback>
              </View>
            </View>
            {rightEle}
          </Layout>
        );
      }}
    </Pressable>
  );
}

const getStyles = ({
  pressed,
  size,
}: {
  pressed: boolean;
  size: Exclude<ListItemProps['size'], undefined>;
}) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: {tiny: 8, small: 12, medium: 16, large: 20, giant: 24}[size],
      opacity: pressed ? 0.8 : 1,
    },
    itemBody: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    itemSubTitle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconWrapper: {
      flexShrink: 0,
      height: 16,
      width: 16,
    },
  });
