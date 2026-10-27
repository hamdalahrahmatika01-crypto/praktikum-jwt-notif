import { useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { registerUser } from '../services/authService';
import { Button, Input } from '../components/UI';
import { colors } from '../constants/theme';

export default function RegisterScreen() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!nama || !email || !password) {
      Alert.alert('Perhatian', 'Semua kolom wajib diisi!');
      return;
    }

    try {
      setLoading(true);
      await registerUser(nama, email, password);
      Alert.alert('Berhasil', 'Akun dibuat. Silakan login.', [
        { text: 'OK', onPress: () => router.replace('/sign-in') }
      ]);
    } catch (e) {
      Alert.alert('Registrasi gagal', e.message || 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg || '#ffffff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={{ gap: 6 }}>
          <Text style={styles.title}>Buat Akun</Text>
          <Text style={styles.subtitle}>Lengkapi data berikut untuk mendaftar</Text>
        </View>

        <View style={{ gap: 16 }}>
          <Input label="Nama" placeholder="Nama lengkap" value={nama} onChangeText={setNama} />
          <Input
            label="Email"
            placeholder="nama@email.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Password"
            placeholder="Min. 8 karakter"
            secure
            value={password}
            onChangeText={setPassword}
          />
          <View style={{ height: 6 }} />
          <Button title="Daftar" onPress={handleRegister} loading={loading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 28, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: colors.text || '#0f172a' },
  subtitle: { fontSize: 15, color: colors.muted || '#64748b' },
});