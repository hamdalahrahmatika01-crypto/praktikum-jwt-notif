import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getMe } from '../../services/authService';
import { Card } from '../../components/UI';

export default function ProfileScreen() {
  const { token, signOut } = useAuth();
  const [profile, setProfile] = useState(null);

  // Membuktikan JWT dapat mengakses endpoint privat GET /auth/me
  useEffect(() => {
    getMe(token).then(setProfile).catch(console.error);
  }, [token]);

  const handleLogout = () => {
    Alert.alert('Konfirmasi Keluar', 'Apakah Anda yakin ingin keluar dari aplikasi?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: signOut },
    ]);
  };

  if (!profile) {
    return <ActivityIndicator style={{ flex: 1 }} color="#4f46e5" />;
  }

  const displayName = profile.nama;
  const displayEmail = profile.email;
  const displayId = String(profile.id);
  const initial = displayName ? displayName.charAt(0).toUpperCase() : 'P';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentWrapper}>
        {/* Card Profil */}
        <Card style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>{initial}</Text>
          </View>
          <Text style={styles.nameText}>{displayName}</Text>
          <Text style={styles.emailText}>{displayEmail}</Text>
        </Card>

        {/* Card Info Akun */}
        <Card style={{ gap: 12, marginTop: 16 }}>
          <Text style={styles.sectionTitle}>Informasi Akun</Text>
          <View style={styles.row}>
            <Text style={styles.label}>ID User:</Text>
            <Text style={styles.value}>{displayId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text style={[styles.value, { color: '#16a34a', fontWeight: '700' }]}>Aktif 🛡️</Text>
          </View>
        </Card>
      </View>

      {/* Tombol Logout */}
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Text style={styles.logoutText}>Keluar (Logout)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20, 
    backgroundColor: '#f8fafc',
    justifyContent: 'space-between',
  },
  contentWrapper: {
    width: '100%',
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 2,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarLargeText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  emailText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  label: {
    color: '#64748b',
    fontSize: 14,
  },
  value: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
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