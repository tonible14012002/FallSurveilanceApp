import {Avatar, Button, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {usePopupContext} from '~/context/popup';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';

type NotificationPayload = FirebaseMessagingTypes.RemoteMessage['notification'];

type NotificationProps = {
  notification?: NotificationPayload;
};

export const NotificationPopup = ({notification}: NotificationProps) => {
  const {closePopup} = usePopupContext();
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();

  return (
    <View style={styles.notificationContainer}>
      <Avatar size="giant" source={{uri: notification?.image}} />
      <Text category="h5"> {notification?.title ?? ''}</Text>
      <Text style={{marginTop: 10, textAlign: 'center', color: 'gray'}}>
        {' '}
        {notification?.body ?? ''}
      </Text>
      <View style={styles.actions}>
        <Button onPress={closePopup} style={{width: 100}} status="danger">
          Close
        </Button>
        <Button
          onPress={() => {
            const deviceId = notification?.android?.smallIcon;
            if (deviceId) {
              navigate('DeviceDetail', {deviceId});
            } else {
              navigate('Notification');
            }
            closePopup();
          }}
          style={{width: 100}}
          status="info">
          Go
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: 'white',
    height: 300,
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
