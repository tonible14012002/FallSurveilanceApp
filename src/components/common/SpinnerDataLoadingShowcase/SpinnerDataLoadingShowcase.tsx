import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Spinner, Text} from '@ui-kitten/components';

interface SpinnerDataLoadingShowcaseProps {
  isLoading: boolean;
  dataLength?: number;
  children: React.ReactNode;
}

export function SpinnerDataLoadingShowcase({
  isLoading,
  dataLength = 0,
  children,
}: SpinnerDataLoadingShowcaseProps) {
  const renderLoading = () => (
    <View style={styles.center}>
      <Spinner />
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.center}>
      <Text>None</Text>
    </View>
  );

  return (
    <>
      {isLoading && renderLoading()}
      {!isLoading && !!!dataLength && renderEmpty()}
      {!isLoading && dataLength > 0 && children}
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
