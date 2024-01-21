import {Layout} from '@ui-kitten/components';
import {PropsWithChildren, ReactNode} from 'react';
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface ScreenLayoutProps extends PropsWithChildren {
  topBar?: ReactNode;
  style?: StyleProp<ViewStyle>;
  floatEl?: ReactNode;
  hasPadding?: boolean;
}

export default function ScreenLayout(props: ScreenLayoutProps) {
  const {children, topBar, style, floatEl, hasPadding} = props;
  return (
    <Layout style={[styles.container, style]} level="1">
      {topBar}
      <View style={{padding: hasPadding ? 12 : 0}}>
        <ScrollView>{children}</ScrollView>
      </View>
      {floatEl}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
  },
});
