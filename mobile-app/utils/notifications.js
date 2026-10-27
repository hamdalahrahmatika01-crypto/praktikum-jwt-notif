import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Expo Go (Android) tidak lagi mendukung remote push notification sejak SDK 53.
// Modul expo-notifications hanya dimuat bila lingkungan mendukung, agar app
// tetap berjalan normal di Expo Go.
export const isExpoGo = Constants.executionEnvironment === 'storeClient';
export const pushSupported = !(isExpoGo && Platform.OS === 'android');

export const Notifications = pushSupported
  ? require('expo-notifications')
  : null;

if (Notifications) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export async function getExpoPushToken() {
  if (!pushSupported) {
    throw new Error(
      'Remote push notification tidak didukung di Expo Go Android. ' +
        'Gunakan development build (EAS) + konfigurasi FCM v1.'
    );
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  const current = await Notifications.getPermissionsAsync();
  let status = current.status;

  if (status !== 'granted') {
    const requested = await Notifications.requestPermissionsAsync();
    status = requested.status;
  }

  if (status !== 'granted') {
    throw new Error('Izin notifikasi tidak diberikan');
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;

  if (!projectId && !isExpoGo) {
    throw new Error('EAS projectId tidak ditemukan');
  }

  const result = await Notifications.getExpoPushTokenAsync(
    projectId ? { projectId } : undefined
  );
  return result.data;
}
