import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { getExpoPushToken } from '../../utils/notifications';
import {
  simpanPushToken,
  kirimNotifikasiUji,
} from '../../services/notificationService';

export default function HomeScreen() {
  const { user, token, signOut } = useAuth();
  const userName = user?.nama || 'Pengguna';

  // Langkah 25: izin notifikasi diminta lewat tombol, bukan otomatis saat login.
  async function aktifkanNotifikasi() {
    try {
      const expoPushToken = await getExpoPushToken();
      await simpanPushToken(token, expoPushToken);
      Alert.alert('Berhasil', 'Perangkat terdaftar untuk notifikasi');
    } catch (e) {
      Alert.alert('Notifikasi', e.message);
    }
  }

  // Langkah 28: panggil endpoint /notifications/test.
  async function testNotifikasi() {
    try {
      const data = await kirimNotifikasiUji(token);
      Alert.alert('Server', data.pesan);
    } catch (e) {
      Alert.alert('Gagal', e.message);
    }
  }

  const handleLogout = () => {
    Alert.alert('Konfirmasi Keluar', 'Apakah Anda yakin ingin keluar dari aplikasi?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: signOut },
    ]);
  };

  const initial = userName ? userName.charAt(0).toUpperCase() : 'P';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Profil */}
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.hi}>Selamat Datang,</Text>
          <Text style={styles.name}>{userName} 👋</Text>
        </View>
      </View>

      {/* Banner Card Status JWT */}
      <View style={styles.bannerCard}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>SECURE SESSION</Text>
        </View>
        <Text style={styles.statusTitle}>Autentikasi JWT Aktif 🛡️</Text>
        <Text style={styles.statusText}>
          Sesi Anda aman, terenkripsi, dan tersimpan secara lokal di SecureStore perangkat.
        </Text>
      </View>

      {/* Menu Navigasi */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Menu Utama</Text>
        
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => router.push('/profile')}
          activeOpacity={0.7}
        >
          <View style={styles.menuIconBox}>
            <Text style={{ fontSize: 18 }}>👤</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Profil Saya</Text>
            <Text style={styles.menuSubtitle}>Lihat informasi akun dan detail user</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Pengujian Notifikasi */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Pengujian Modul 3</Text>
        
        <TouchableOpacity 
          style={[styles.menuItem, { marginBottom: 12 }]} 
          onPress={aktifkanNotifikasi}
          activeOpacity={0.7}
        >
          <View style={styles.menuIconBox}>
            <Text style={{ fontSize: 18 }}>📲</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuTitle}>Aktifkan Notifikasi</Text>
            <Text style={styles.menuSubtitle}>Izinkan notifikasi & daftarkan perangkat</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: '#eef2ff', borderColor: '#c7d2fe' }]} 
          onPress={testNotifikasi}
          activeOpacity={0.7}
        >
          <View style={[styles.menuIconBox, { backgroundColor: '#4f46e5' }]}>
            <Text style={{ fontSize: 18 }}>🔔</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.menuTitle, { color: '#312e81' }]}>Kirim Notifikasi Uji</Text>
            <Text style={[styles.menuSubtitle, { color: '#4338ca' }]}>Uji coba kirim push notification ke HP</Text>
          </View>
          <Text style={[styles.menuArrow, { color: '#4f46e5' }]}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Tombol Logout */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Keluar (Logout)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 24, 
    paddingBottom: 40,
    backgroundColor: '#f8fafc',
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerTextWrapper: {
    flex: 1,
  },
  hi: { 
    fontSize: 14, 
    color: '#64748b',
    fontWeight: '500',
  },
  name: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: '#0f172a',
    marginTop: 2,
  },
  bannerCard: { 
    backgroundColor: '#4f46e5', 
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  badgeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  statusTitle: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '700',
    marginBottom: 6,
  },
  statusText: { 
    color: '#e0e7ff', 
    fontSize: 13, 
    lineHeight: 18, 
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  menuIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 20,
    color: '#94a3b8',
    fontWeight: '600',
  },
  logoutContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});