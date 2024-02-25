import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Spinner, Text} from '@ui-kitten/components';

interface SpinnerDataLoadingShowcaseProps {
  isLoading: boolean;
  isShowData?: boolean;
  children: React.ReactNode;
}

export function SpinnerDataLoadingShowcase({
  isLoading,
  isShowData = false,
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
      {!isLoading && !isShowData && renderEmpty()}
      {!isLoading && isShowData && children}
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
