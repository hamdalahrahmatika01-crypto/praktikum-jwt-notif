import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getMe } from '../../services/authService';
import { Card, Row } from '../../components/UI';
import { colors } from '../../constants/theme';

export default function ProfileScreen() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getMe(token).then(setProfile).catch(console.error);
  }, [token]);

  if (!profile) {
    return <ActivityIndicator style={{ flex: 1 }} color={colors.primary} />;
  }

  const inisial = (profile.nama || '?').trim().charAt(0).toUpperCase();
  const tanggal = new Date(profile.dibuat_pada).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{inisial}</Text>
      </View>
      <Text style={styles.name}>{profile.nama}</Text>
      <Text style={styles.email}>{profile.email}</Text>

      <Card style={{ alignSelf: 'stretch', marginTop: 12 }}>
        <Row label="Nama" value={profile.nama} />
        <Row label="Email" value={profile.email} />
        <Row label="ID" value={String(profile.id)} />
        <Row label="Bergabung" value={tanggal} />
      </Card>

      <Text style={styles.note}>
        Data ini diambil dari endpoint privat GET /auth/me menggunakan Bearer JWT.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center', gap: 4 },
  avatar: {
    width: 88, height: 88, borderRadius: 44, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 8,
  },
  avatarText: { color: '#fff', fontSize: 36, fontWeight: '800' },
  name: { fontSize: 22, fontWeight: '800', color: colors.text },
  email: { fontSize: 14, color: colors.muted },
  note: { marginTop: 16, fontSize: 12, color: colors.muted, textAlign: 'center' },
});
