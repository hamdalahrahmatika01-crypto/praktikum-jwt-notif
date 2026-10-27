import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { getExpoPushToken, pushSupported } from '../../utils/notifications';
import {
  simpanPushToken,
  kirimNotifikasiUji,
} from '../../services/notificationService';
import { Button, Card } from '../../components/UI';
import { colors } from '../../constants/theme';

export default function HomeScreen() {
  const { user, token, signOut } = useAuth();
  const insets = useSafeAreaInsets();

  async function aktifkanNotifikasi() {
    try {
      const expoPushToken = await getExpoPushToken();
      await simpanPushToken(token, expoPushToken);
      Alert.alert('Berhasil', 'Perangkat terdaftar untuk notifikasi');
    } catch (e) {
      Alert.alert('Notifikasi', e.message);
    }
  }

  async function testNotifikasi() {
    try {
      const data = await kirimNotifikasiUji(token);
      Alert.alert('Server', data.pesan);
    } catch (e) {
      Alert.alert('Gagal', e.message);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingTop: insets.top + 24 }]}
    >
      <View style={styles.header}>
        <Text style={styles.hi}>Halo,</Text>
        <Text style={styles.name}>{user?.nama} 👋</Text>
      </View>

      <Card style={styles.statusCard}>
        <Text style={styles.statusTitle}>✅ Anda sudah login</Text>
        <Text style={styles.statusText}>
          Sesi Anda diamankan menggunakan JWT dan disimpan pada SecureStore perangkat.
        </Text>
      </Card>

      <Card style={{ gap: 12 }}>
        <Text style={styles.section}>Akun</Text>
        <Button title="Lihat Profil" onPress={() => router.push('/profile')} />
      </Card>

      <Card style={{ gap: 12 }}>
        <Text style={styles.section}>Push Notification</Text>
        <Text style={styles.hint}>
          {pushSupported
            ? 'Aktifkan notifikasi lalu kirim notifikasi uji dari server.'
            : 'Expo Go Android tidak mendukung remote push. Gunakan development build untuk fitur ini.'}
        </Text>
        <Button title="Aktifkan Notifikasi" variant="outline" onPress={aktifkanNotifikasi} />
        <Button title="Kirim Notifikasi Uji" variant="outline" onPress={testNotifikasi} />
      </Card>

      <Button title="Logout" variant="danger" onPress={signOut} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 16, paddingBottom: 40 },
  header: { marginBottom: 4 },
  hi: { fontSize: 15, color: colors.muted },
  name: { fontSize: 28, fontWeight: '800', color: colors.text },
  statusCard: { backgroundColor: colors.primary, gap: 6 },
  statusTitle: { color: '#fff', fontSize: 17, fontWeight: '700' },
  statusText: { color: '#E0E7FF', fontSize: 14, lineHeight: 20 },
  section: { fontSize: 16, fontWeight: '700', color: colors.text },
  hint: { fontSize: 13, color: colors.muted, lineHeight: 19 },
});
