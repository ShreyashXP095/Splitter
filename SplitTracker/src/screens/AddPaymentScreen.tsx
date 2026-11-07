import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text, TextInput, SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check } from 'lucide-react-native';
import { Colors } from '../theme';
import { SplitMethod } from '../types';

export default function AddPaymentScreen({ navigation, route }: any) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [splitMethod, setSplitMethod] = useState<SplitMethod>('equal');

  const handleSave = () => {
    Alert.alert('Coming Soon', 'Payment saving will be wired up in Task 5.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.appbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <ArrowLeft size={22} color={Colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Payment</Text>
        <TouchableOpacity onPress={handleSave} style={styles.headerBtn}>
          <Check size={22} color={Colors.owedGreen} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionLabel}>DETAILS</Text>
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          placeholder="e.g. Dinner at Barbeque Nation"
          style={styles.input}
          outlineColor={Colors.border}
          activeOutlineColor={Colors.owedGreen}
        />
        <TextInput
          label="Total Amount"
          value={amount}
          onChangeText={setAmount}
          mode="outlined"
          keyboardType="numeric"
          left={<TextInput.Affix text="₹" />}
          style={styles.input}
          outlineColor={Colors.border}
          activeOutlineColor={Colors.owedGreen}
        />

        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>SPLIT METHOD</Text>
        <SegmentedButtons
          value={splitMethod}
          onValueChange={(v) => setSplitMethod(v as SplitMethod)}
          buttons={[
            { value: 'equal', label: 'Equal' },
            { value: 'percentage', label: 'Percent' },
            { value: 'manual', label: 'Manual' },
          ]}
          style={styles.segmented}
        />

        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>MEMBERS INVOLVED</Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            Member checkboxes will appear here in Task 5.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Check size={18} color="#fff" strokeWidth={2.5} />
          <Text style={styles.saveBtnLabel}>Save Payment</Text>
        </TouchableOpacity>
      </View>
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
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: { backgroundColor: Colors.surface, marginBottom: 12 },
  segmented: { backgroundColor: Colors.surface },
  placeholder: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  placeholderText: { color: Colors.textMuted, fontSize: 14 },
  footer: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  saveBtn: {
    height: 52,
    backgroundColor: Colors.owedGreen,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveBtnLabel: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
