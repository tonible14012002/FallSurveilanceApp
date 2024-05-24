import {Button, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {usePopupContext} from '~/context/popup';

type FallDetectedPopupProps = {
  icon?: React.ReactNode;
  image: string;
  title: string;
  description: string;
};

export const FallDetectedPopup = ({
  icon: Icon = null,
  image,
  title,
  description,
}: FallDetectedPopupProps) => {
  const {closePopup} = usePopupContext();
  console.log({image});
  return (
    <View style={styles.notificationContainer}>
      {Icon}
      <Text category="h5">{title}</Text>
      <Image
        style={{width: '100%', height: 200, objectFit: 'cover'}}
        source={{
          uri: image,
        }}
      />
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
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
  },
});
