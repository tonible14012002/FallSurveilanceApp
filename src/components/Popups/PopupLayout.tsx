import {Layout, Popover, Text} from '@ui-kitten/components';
import React, {ReactNode} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

type PopupLayoutProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
};

const {height, width} = Dimensions.get('window');

export const PopUpLayout = (props: PopupLayoutProps) => {
  const {children, isOpen, onClose} = props;
  const renderTrigger = () => <Text />;

  if (!isOpen) {
    return null;
  }

  return (
    <Layout style={styles.wrapper}>
      <Popover
        anchor={renderTrigger}
        visible={isOpen}
        onBackdropPress={onClose}
        style={styles.popoverContainer}>
        <Layout>{children}</Layout>
      </Popover>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height,
    width,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    paddingBottom: 400,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  popoverContainer: {
    maxHeight: height,
    maxWidth: width,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5,
  },
});
