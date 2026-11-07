import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  MoreVertical,
  CreditCard,
  ClipboardList,
  Plus,
  CheckCircle,
} from 'lucide-react-native';
import { Colors } from '../theme';

type Tab = 'payments' | 'activity';

export default function GroupDetailScreen({ navigation, route }: any) {
  const [activeTab, setActiveTab] = useState<Tab>('payments');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Custom header */}
      <View style={styles.appbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <ArrowLeft size={22} color={Colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Group Name</Text>
          <Text style={styles.headerSubtitle}>3 members · INR</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <MoreVertical size={22} color={Colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Balance bar */}
      <View style={styles.balanceBar}>
        <Text style={styles.balanceLabel}>Your balance</Text>
        <Text style={[styles.balanceValue, { color: Colors.owedGreen }]}>₹0.00</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <SegmentedButtons
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as Tab)}
          buttons={[
            { value: 'payments', label: 'Payments' },
            { value: 'activity', label: 'Activity' },
          ]}
          style={styles.segmented}
        />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'payments' && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconBox}>
              <CreditCard size={36} color={Colors.textMuted} strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyTitle}>No payments yet</Text>
            <Text style={styles.emptySubtitle}>Add the first payment to start tracking.</Text>
          </View>
        )}
        {activeTab === 'activity' && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconBox}>
              <ClipboardList size={36} color={Colors.textMuted} strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyTitle}>No activity yet</Text>
            <Text style={styles.emptySubtitle}>Activity will appear when payments are added.</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.actionBtnPrimary]}
          onPress={() => navigation.navigate('AddPayment', { groupId: 'placeholder' })}
          activeOpacity={0.85}
        >
          <Plus size={18} color="#fff" strokeWidth={2.5} />
          <Text style={styles.actionBtnPrimaryLabel}>Add Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.actionBtnSecondary]}
          onPress={() => navigation.navigate('SettleUp', { groupId: 'placeholder' })}
          activeOpacity={0.85}
        >
          <CheckCircle size={18} color={Colors.owedGreen} strokeWidth={2} />
          <Text style={styles.actionBtnSecondaryLabel}>Settle</Text>
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
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  headerSubtitle: { fontSize: 12, color: Colors.textSecondary },
  balanceBar: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  balanceLabel: { fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },
  balanceValue: { fontSize: 20, fontWeight: '700' },
  tabContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  segmented: { backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
  emptyState: { alignItems: 'center', paddingVertical: 64, gap: 12 },
  emptyIconBox: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyTitle: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 32,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    paddingBottom: 24,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionBtnPrimary: { flex: 2, backgroundColor: Colors.owedGreen },
  actionBtnSecondary: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.owedGreen,
  },
  actionBtnPrimaryLabel: { color: '#fff', fontWeight: '600', fontSize: 15 },
  actionBtnSecondaryLabel: { color: Colors.owedGreen, fontWeight: '600', fontSize: 15 },
});
