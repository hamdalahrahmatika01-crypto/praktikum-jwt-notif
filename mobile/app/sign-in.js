import { useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/UI';
import { colors } from '../constants/theme';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (e) {
      Alert.alert('Login gagal', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>🔐</Text>
          </View>
          <Text style={styles.title}>Selamat Datang</Text>
          <Text style={styles.subtitle}>Masuk untuk melanjutkan ke aplikasi</Text>
        </View>

        <View style={styles.form}>
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
            placeholder="Masukkan password"
            secure
            value={password}
            onChangeText={setPassword}
          />
          <View style={{ height: 6 }} />
          <Button title="Masuk" onPress={handleLogin} loading={loading} />
        </View>

        <Text style={styles.footer}>
          Belum punya akun?{' '}
          <Link href="/register" style={styles.link}>Daftar</Link>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, justifyContent: 'center', gap: 28 },
  hero: { alignItems: 'center', gap: 8 },
  logo: {
    width: 76, height: 76, borderRadius: 24,
    backgroundColor: colors.primarySoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  logoText: { fontSize: 36 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 15, color: colors.muted },
  form: { gap: 16 },
  footer: { textAlign: 'center', color: colors.muted, fontSize: 14 },
  link: { color: colors.primary, fontWeight: '700' },
});
