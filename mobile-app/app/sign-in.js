import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Perhatian', 'Email dan password wajib diisi!');
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
    } catch (error) {
      Alert.alert('Gagal Masuk', error.message || 'Terjadi kesalahan pada server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Selamat Datang</Text>
        <Text style={styles.subtitle}>Masuk untuk melanjutkan ke aplikasi</Text>
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@example.com"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Masuk</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Belum punya akun? </Text>
          <Link href="/register" style={styles.link}>Daftar</Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 24, 
    backgroundColor: '#ffffff' 
  },
  headerWrapper: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: '#0f172a',
    marginBottom: 6,
  },
  subtitle: { 
    fontSize: 14, 
    color: '#64748b', 
    textAlign: 'center' 
  },
  form: { 
    gap: 16,
  },
  label: { 
    fontSize: 13, 
    fontWeight: '700', 
    color: '#334155',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    padding: 14, 
    borderRadius: 12, 
    fontSize: 15, 
    backgroundColor: '#f8fafc',
    color: '#0f172a',
  },
  button: { 
    backgroundColor: '#4f46e5', 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10,
    elevation: 4,
  },
  buttonText: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: '700' 
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 12 
  },
  footerText: { 
    color: '#64748b',
    fontSize: 14,
  },
  link: { 
    color: '#4f46e5', 
    fontWeight: '700',
    fontSize: 14,
  }
});