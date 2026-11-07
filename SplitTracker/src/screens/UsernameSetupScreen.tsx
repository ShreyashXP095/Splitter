import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme';
import { useAuthStore } from '../store/authStore';
import { isUsernameTaken, createUserProfile } from '../services/userService';

function validateFormat(value: string): string {
  if (value.length < 3) return 'Username must be at least 3 characters.';
  if (value.length > 20) return 'Username must be 20 characters or less.';
  if (!/^[a-z0-9_]+$/.test(value)) {
    return 'Only lowercase letters, numbers, and underscores.';
  }
  return '';
}

export default function UsernameSetupScreen() {
  const { firebaseUser, setUserProfile } = useAuthStore();

  const [username, setUsername] = useState('');
  const [formatError, setFormatError] = useState('');
  const [takenError, setTakenError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = useCallback((value: string) => {
    const clean = value.toLowerCase().replace(/\s/g, '');
    setUsername(clean);
    setFormatError(validateFormat(clean));
    setTakenError(''); // clear taken error on new input
  }, []);

  const handleConfirm = async () => {
    const fmtErr = validateFormat(username);
    if (fmtErr) {
      setFormatError(fmtErr);
      return;
    }

    setSaving(true);
    try {
      const taken = await isUsernameTaken(username);
      if (taken) {
        setTakenError('That username is already taken. Try another.');
        return;
      }

      if (!firebaseUser) return;

      const newProfile = {
        uid: firebaseUser.uid,
        username: username.toLowerCase(),
        email: firebaseUser.email ?? '',
        displayName: firebaseUser.displayName ?? username,
        photoURL: firebaseUser.photoURL ?? '',
      };

      await createUserProfile(newProfile);

      // Update local store so navigation switches to AppStack immediately
      setUserProfile({
        ...newProfile,
        friendIds: [],
        createdAt: Date.now(),
      });
    } catch (error: any) {
      console.error('Username setup error:', error?.code, error?.message);
      const msg = error?.code === 'permission-denied'
        ? 'Permission denied. Check your Firestore security rules in Firebase Console.'
        : 'Something went wrong. Please try again.';
      Alert.alert('Error', msg);
    } finally {
      setSaving(false);
    }
  };

  const error = formatError || takenError;
  const canSubmit = username.length >= 3 && !formatError && !saving;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inner}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Choose a username</Text>
          <Text style={styles.subtitle}>
            Friends will search for you by this name. You can't change it later.
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Username"
            value={username}
            onChangeText={handleChange}
            mode="outlined"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            left={<TextInput.Affix text="@" />}
            error={!!error}
            style={styles.input}
            outlineColor={Colors.border}
            activeOutlineColor={Colors.owedGreen}
          />
          <HelperText type={error ? 'error' : 'info'} visible>
            {error || 'Letters, numbers, and underscores only.'}
          </HelperText>
        </View>

        <Button
          mode="contained"
          onPress={handleConfirm}
          disabled={!canSubmit}
          loading={saving}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          buttonColor={Colors.owedGreen}
        >
          Continue
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    gap: 24,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  form: {
    gap: 4,
  },
  input: {
    backgroundColor: Colors.surface,
  },
  button: {
    borderRadius: 12,
  },
  buttonContent: {
    height: 52,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});
