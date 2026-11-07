import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { Colors } from '../theme';

export default function SettleUpScreen({ navigation, route }: any) {
  const [amount, setAmount] = useState('');

  const handleSettle = () => {
    Alert.alert('Coming Soon', 'Settle Up will be fully wired in Task 7.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.appbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <ArrowLeft size={22} color={Colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settle Up</Text>
        <View style={styles.headerBtn} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inner}
      >
        <View style={styles.content}>
          <Text style={styles.sectionLabel}>FROM</Text>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>From selector — Task 7</Text>
          </View>

          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>TO</Text>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>To selector — Task 7</Text>
          </View>

          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>AMOUNT</Text>
          <TextInput
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            mode="outlined"
            keyboardType="numeric"
            left={<TextInput.Affix text="₹" />}
            style={styles.input}
            outlineColor={Colors.border}
            activeOutlineColor={Colors.owedGreen}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleSettle} activeOpacity={0.85}>
            <Text style={styles.buttonLabel}>Record Settlement</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  inner: { flex: 1 },
  content: { flex: 1, padding: 16 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  placeholder: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  placeholderText: { color: Colors.textMuted, fontSize: 14 },
  input: { backgroundColor: Colors.surface },
  footer: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  button: {
    height: 52,
    backgroundColor: Colors.owedGreen,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
