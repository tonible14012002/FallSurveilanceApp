import {Layout} from '@ui-kitten/components';
import Icon from './Icon';
import {ReactNode} from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import TextFallback from './TextFallback';

interface TopBarProps {
  title: ReactNode;
  subTitle?: ReactNode;
  rightIcon?: ReactNode;
  rightIconWrapperStyle?: StyleProp<ViewStyle>;
  lefttIconWrapperStyle?: StyleProp<ViewStyle>;
  leftIcon?: ReactNode;
  onBack?: (_: GestureResponderEvent) => void;
}

export default function TopBar(props: TopBarProps) {
  const {
    title,
    rightIcon,
    subTitle,
    onBack,
    leftIcon,
    rightIconWrapperStyle,
    lefttIconWrapperStyle,
  } = props;
  const styles = getStyle({});
  const renderLeftIcon = onBack ? (
    <Pressable onPress={onBack}>
      {({pressed}) => (
        <Layout
          level={pressed ? '2' : '1'}
          style={{padding: 10, marginHorizontal: -10, borderRadius: 1000}}>
          <Icon name="arrow-back-outline" />
        </Layout>
      )}
    </Pressable>
  ) : (
    leftIcon
  );

  return (
    <Layout level="1">
      <View style={[styles.container]}>
        <View style={[styles.leftContainer]}>
          {(leftIcon || onBack) && (
            <View style={[styles.rightElWrapper, lefttIconWrapperStyle]}>
              {renderLeftIcon}
            </View>
          )}
          <View>
            <View>
              <TextFallback category="h6">{title as any}</TextFallback>
            </View>
            {subTitle && (
              <View>
                <TextFallback category="p1">{subTitle as any}</TextFallback>
              </View>
            )}
          </View>
        </View>
        {rightIcon && (
          <View style={[styles.rightElWrapper, rightIconWrapperStyle]}>
            {rightIcon}
          </View>
        )}
      </View>
    </Layout>
  );
}

const getStyle = ({}) =>
  StyleSheet.create({
    container: {
      padding: 12,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    rightElWrapper: {
      display: 'flex',
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
    },
  });
