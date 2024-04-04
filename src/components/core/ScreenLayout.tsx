import {Layout} from '@ui-kitten/components';
import {Fragment, PropsWithChildren, ReactNode} from 'react';
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {NotificationListenerWrapper} from '../NotificationListenerWrapper/NotificationListenerWrapper';

interface ScreenLayoutProps extends PropsWithChildren {
  topBar?: ReactNode;
  style?: StyleProp<ViewStyle>;
  floatEl?: ReactNode;
  hasPadding?: boolean;
  isScrollable?: boolean;
}

export default function ScreenLayout(props: ScreenLayoutProps) {
  const {
    children,
    topBar,
    style,
    floatEl,
    hasPadding = false,
    isScrollable = false,
  } = props;

  const BodyWrapper = isScrollable ? ScrollView : View;
  const InnerBodyWrapper = isScrollable ? View : Fragment;
  const innerBodyProps = isScrollable
    ? ({
        style: {
          height: '100%',
          paddingVertical: 12,
        },
      } as const)
    : {};

  return (
    <NotificationListenerWrapper>
      <Layout style={[styles.container, style]} level="1">
        {topBar}
        <View
          style={{
            flex: 1,
            paddingHorizontal: hasPadding ? 12 : 0,
          }}>
          <BodyWrapper
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
            }}>
            {/* Inner body for setting padding but retain screen scroll overflow */}
            <InnerBodyWrapper {...innerBodyProps}>{children}</InnerBodyWrapper>
          </BodyWrapper>
        </View>
        {floatEl}
      </Layout>
    </NotificationListenerWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
  },
});
