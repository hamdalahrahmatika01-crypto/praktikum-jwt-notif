import { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import { Notifications } from '../../utils/notifications';
import { colors } from '../../constants/theme';

export default function AppLayout() {
  useEffect(() => {
    // Listener hanya aktif bila remote push didukung (development build).
    if (!Notifications) return;

    const received = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notifikasi diterima:', notification.request.content);
      }
    );

    const response = Notifications.addNotificationResponseReceivedListener(
      (event) => {
        const screen = event.notification.request.content.data?.screen;
        if (screen === 'profile') {
          router.push('/profile');
        }
      }
    );

    return () => {
      received.remove();
      response.remove();
    };
  }, []);

  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.primary,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.bg },
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ title: 'Profil Saya' }} />
    </Stack>
  );
}
