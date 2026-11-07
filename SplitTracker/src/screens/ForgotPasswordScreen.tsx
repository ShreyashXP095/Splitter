import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail } from 'lucide-react-native';
import { Colors } from '../theme';
import { sendPasswordReset, getAuthErrorMessage } from '../services/authService';

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await sendPasswordReset(email.trim());
      setSent(true);
    } catch (e: any) {
      setError(getAuthErrorMessage(e.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inner}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={20} color={Colors.owedGreen} strokeWidth={2} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {sent ? (
          <View style={styles.successBox}>
            {/* Lucide Mail icon in a colored circle */}
            <View style={styles.successIconBox}>
              <Mail size={36} color={Colors.owedGreen} strokeWidth={1.5} />
            </View>
            <Text style={styles.successTitle}>Check your email</Text>
            <Text style={styles.successBody}>
              We sent a password reset link to {email}. Check your inbox.
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Login')}
              style={styles.button}
              buttonColor={Colors.owedGreen}
            >
              Back to Sign In
            </Button>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.subtitle}>
              Enter your email and we'll send you a reset link.
            </Text>

            <TextInput
              label="Email"
              value={email}
              onChangeText={(v) => { setEmail(v); setError(''); }}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus
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
              onPress={handleReset}
              loading={loading}
              disabled={loading}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              buttonColor={Colors.owedGreen}
            >
              Send Reset Link
            </Button>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  inner: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', gap: 24 },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: { fontSize: 15, color: Colors.owedGreen, fontWeight: '500' },
  form: { gap: 12 },
  title: { fontSize: 26, fontWeight: '700', color: Colors.textPrimary },
  subtitle: { fontSize: 14, color: Colors.textSecondary, lineHeight: 20 },
  input: { backgroundColor: Colors.surface },
  button: { borderRadius: 12, marginTop: 4 },
  buttonContent: { height: 52 },
  buttonLabel: { fontSize: 16, fontWeight: '600' },
  successBox: { alignItems: 'center', gap: 16 },
  successIconBox: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  successBody: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
