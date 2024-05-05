import {Button, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {usePopupContext} from '~/context/popup';

type AlertProps = {
  icon?: React.ReactNode;
  title: string;
  description: string;
};

export const AlertPopup = ({
  icon: Icon = null,
  title,
  description,
}: AlertProps) => {
  const {closePopup} = usePopupContext();

  return (
    <View style={styles.notificationContainer}>
      {Icon}
      <Text category="h5">{title}</Text>
      <Text style={{marginTop: 10, textAlign: 'center', color: 'gray'}}>
        {description}
      </Text>
      <View style={styles.actions}>
        <Button onPress={closePopup} style={{width: 100}} status="danger">
          Close
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: 'white',
    minHeight: 200,
    width: 350,
    elevation: 2,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 10,
  },
  actions: {
    marginTop: 30,
    flexDirection: 'row',
    gap: 10,
  },
});
