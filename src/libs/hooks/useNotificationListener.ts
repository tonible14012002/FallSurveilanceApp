import {POPUPS, usePopupContext} from '~/context/popup';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {unsubscribe} from '../notification';

export function useNotificationListener() {
  const {showPopup} = usePopupContext();

  const notificationListener = () => {
    messaging().onNotificationOpenedApp(
      (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log(
          'Notification caused app to run from background state',
          remoteMessage,
        );
      },
    );

    messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        if (!remoteMessage?.notification) {
          return;
        }

        console.log({remoteMessage});

        showPopup(POPUPS.NOTIFICATION, {
          notification: {
            ...remoteMessage?.notification,
            image: remoteMessage.data?.image ?? '',
          },
        });
      },
    );

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state',
            remoteMessage.notification,
          );
        }
      });
  };

  useEffect(() => {
    notificationListener();

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
