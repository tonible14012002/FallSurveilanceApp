import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Spinner, Text} from '@ui-kitten/components';

interface SpinnerDataLoadingShowcaseProps {
  isLoading: boolean;
  dataLength?: number;
  children: React.ReactNode;
  renderEmpty?: React.ReactNode;
}

export function SpinnerDataLoadingShowcase({
  isLoading,
  dataLength = 0,
  children,
  renderEmpty,
}: SpinnerDataLoadingShowcaseProps) {
  const renderLoading = () => (
    <View style={styles.center}>
      <Spinner />
    </View>
  );

  const fallbackRenderEmpty = () => (
    <View style={styles.center}>
      <Text>None</Text>
    </View>
  );

  if (isLoading) {
    return renderLoading();
  }
  if (!isLoading && dataLength === 0) {
    return renderEmpty ?? fallbackRenderEmpty();
  }
  return <>{children}</>;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
