import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { Colors } from '../theme';
import { registerWithEmail, getAuthErrorMessage } from '../services/authService';

export default function RegisterScreen({ navigation }: any) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!displayName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await registerWithEmail(email.trim(), password, displayName.trim());
      // onAuthStateChanged fires → detects no Firestore profile → routes to UsernameSetup
    } catch (e: any) {
      setError(getAuthErrorMessage(e.code));
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.kav}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft size={20} color={Colors.owedGreen} strokeWidth={2} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>
              Join SplitTracker and start splitting bills with friends.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <TextInput
              label="Full name"
              value={displayName}
              onChangeText={(v) => { setDisplayName(v); clearError(); }}
              mode="outlined"
              autoCapitalize="words"
              style={styles.input}
              outlineColor={Colors.border}
              activeOutlineColor={Colors.owedGreen}
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={(v) => { setEmail(v); clearError(); }}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              outlineColor={Colors.border}
              activeOutlineColor={Colors.owedGreen}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={(v) => { setPassword(v); clearError(); }}
              mode="outlined"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              style={styles.input}
              outlineColor={Colors.border}
              activeOutlineColor={Colors.owedGreen}
              right={
                <TextInput.Affix
                  text={showPassword ? '🙈' : '👁'}
                  onPress={() => setShowPassword((p) => !p)}
                />
              }
            />

            <TextInput
              label="Confirm password"
              value={confirmPassword}
              onChangeText={(v) => { setConfirmPassword(v); clearError(); }}
              mode="outlined"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              style={styles.input}
              outlineColor={Colors.border}
              activeOutlineColor={Colors.owedGreen}
            />

            {!!error && (
              <HelperText type="error" visible>
                {error}
              </HelperText>
            )}

            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              buttonColor={Colors.owedGreen}
            >
              Create Account
            </Button>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  kav: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 28,
  },
  header: { paddingTop: 16, gap: 8 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  backText: { fontSize: 15, color: Colors.owedGreen, fontWeight: '500' },
  title: { fontSize: 26, fontWeight: '700', color: Colors.textPrimary },
  subtitle: { fontSize: 14, color: Colors.textSecondary, lineHeight: 20 },
  form: { gap: 12 },
  input: { backgroundColor: Colors.surface },
  button: { borderRadius: 12, marginTop: 4 },
  buttonContent: { height: 52 },
  buttonLabel: { fontSize: 16, fontWeight: '600' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: { fontSize: 14, color: Colors.textSecondary },
  footerLink: { fontSize: 14, color: Colors.owedGreen, fontWeight: '600' },
});
