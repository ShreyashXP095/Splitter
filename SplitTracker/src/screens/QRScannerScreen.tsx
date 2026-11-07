import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, QrCode } from 'lucide-react-native';
import { Colors } from '../theme';

export default function QRScannerScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.appbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <ArrowLeft size={22} color="#fff" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan QR Code</Text>
        <View style={styles.headerBtn} />
      </View>

      <View style={styles.body}>
        <View style={styles.scanArea}>
          <QrCode size={64} color="rgba(255,255,255,0.6)" strokeWidth={1.25} />
          <Text style={styles.scanText}>Camera will open here in Task 3</Text>
        </View>
        <Text style={styles.hint}>
          Point your camera at a friend's QR code to add them instantly.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    paddingHorizontal: 24,
  },
  scanArea: {
    width: 260,
    height: 260,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.owedGreen,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  scanText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  hint: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
});
