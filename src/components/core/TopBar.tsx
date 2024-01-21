import {Icon, Layout} from '@ui-kitten/components';
import {ReactNode} from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, View} from 'react-native';
import TextFallback from './TextFallback';

interface TopBarProps {
  title: ReactNode;
  subTitle?: ReactNode;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  onBack?: (_: GestureResponderEvent) => void;
}

export default function TopBar(props: TopBarProps) {
  const {title, rightIcon, subTitle, onBack, leftIcon} = props;
  const styles = getStyle({});
  const renderLeftIcon = onBack ? (
    <Pressable onPress={onBack}>
      {({pressed}) => (
        <Layout
          level={pressed ? '2' : '1'}
          style={{padding: 10, marginHorizontal: -10, borderRadius: 1000}}>
          <View style={[styles.iconWrapper]}>
            <Icon name="arrow-back-outline" />
          </View>
        </Layout>
      )}
    </Pressable>
  ) : (
    <View style={[styles.iconWrapper]}>{leftIcon}</View>
  );

  return (
    <Layout level="1">
      <View style={[styles.container]}>
        <View style={[styles.leftContainer]}>
          {(leftIcon || onBack) && renderLeftIcon}
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
        {rightIcon && <View style={[styles.iconWrapper]}>{rightIcon}</View>}
      </View>
    </Layout>
  );
}

const getStyle = ({}) =>
  StyleSheet.create({
    iconWrapper: {
      width: 16,
      height: 16,
    },
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
  });
