import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, QrCode } from 'lucide-react-native';
import { Colors } from '../theme';

export default function FriendsScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Friends</Text>
      </View>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search by username..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchbarInput}
        />
        <TouchableOpacity
          style={styles.qrButton}
          onPress={() => navigation.navigate('QRScanner')}
          activeOpacity={0.7}
        >
          <QrCode size={22} color={Colors.textSecondary} strokeWidth={1.75} />
        </TouchableOpacity>
      </View>

      {/* Empty state */}      <View style={styles.emptyState}>
        <View style={styles.emptyIconBox}>
          <Users size={36} color={Colors.textMuted} strokeWidth={1.5} />
        </View>
        <Text style={styles.emptyTitle}>No friends yet</Text>
        <Text style={styles.emptySubtitle}>
          Search by username or scan a QR code to add friends.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 28, fontWeight: '700', color: Colors.textPrimary },
  searchContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  searchbar: {
    flex: 1,
    backgroundColor: Colors.surface,
    elevation: 0,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    height: 48,
  },
  searchbarInput: { fontSize: 14 },
  qrButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingBottom: 80 },
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
});
