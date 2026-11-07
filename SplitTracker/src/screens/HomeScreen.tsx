import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, LayoutList } from 'lucide-react-native';
import { Colors } from '../theme';

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hey there 👋</Text>
          <Text style={styles.subGreeting}>Here's your balance overview</Text>
        </View>

        {/* Dashboard Summary Card */}
        <Card style={styles.summaryCard} mode="elevated">
          <Card.Content style={styles.summaryContent}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>You are owed</Text>
              <Text style={[styles.balanceAmount, { color: Colors.owedGreen }]}>
                ₹0.00
              </Text>
            </View>
            <View style={styles.balanceDivider} />
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>You owe</Text>
              <Text style={[styles.balanceAmount, { color: Colors.owingRed }]}>
                ₹0.00
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Groups Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Groups</Text>

          {/* Empty state */}
          <View style={styles.emptyState}>
            <View style={styles.emptyIconBox}>
              <LayoutList size={36} color={Colors.textMuted} strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyTitle}>No groups yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the button below to create your first group.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* FAB to create group */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => { /* TODO: Task 4 */ }}
        activeOpacity={0.85}
      >
        <Plus size={20} color="#fff" strokeWidth={2.5} />
        <Text style={styles.fabLabel}>New Group</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  header: { paddingTop: 16, paddingBottom: 20, gap: 4 },
  greeting: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  subGreeting: { fontSize: 14, color: Colors.textSecondary },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 2,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  balanceItem: { flex: 1, alignItems: 'center', gap: 6 },
  balanceLabel: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  balanceAmount: { fontSize: 26, fontWeight: '700', letterSpacing: -0.5 },
  balanceDivider: { width: 1, height: 48, backgroundColor: Colors.border },
  section: { gap: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: Colors.textPrimary },
  emptyState: { alignItems: 'center', paddingVertical: 48, gap: 12 },
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
    paddingHorizontal: 24,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    backgroundColor: Colors.owedGreen,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    elevation: 4,
    shadowColor: Colors.owedGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabLabel: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
