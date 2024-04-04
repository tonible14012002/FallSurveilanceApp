import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';

export async function requestUserPermission() {
  if (Platform.OS == 'android')
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  else await messaging().requestPermission();

  return await getToken();
}

async function getToken() {
  const storedToken = await AsyncStorage.getItem('token');
  await messaging().subscribeToTopic('notify');

  if (!storedToken) {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      if (token) {
        await AsyncStorage.setItem('token', token);
        return token;
      }
    } catch (error) {
      console.log('Error from token', error);
    }
  }

  return storedToken;
}

export async function unsubscribe() {
  messaging().unsubscribeFromTopic('notify');
}
