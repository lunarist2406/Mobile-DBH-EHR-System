import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';

import DoctorHeader from './components/DoctorHeader';
import { QuickActions } from './components/QuickActions';
import { DoctorStats } from './components/DoctorStats';

export default function DoctorScreen() {
  return (
    <View style={styles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <DoctorHeader />


        {/* Quick Actions */}
        <View style={styles.section}>
          <QuickActions />
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <DoctorStats />
        </View>

        {/* No Access Permission */}
        <View style={styles.noAccessBox}>
          <ShieldCheck size={28} color="#16A34A" strokeWidth={2.5} />
          <Text style={styles.noAccessTitle}>
            Quyền truy cập được kiểm soát
          </Text>
          <Text style={styles.noAccessDesc}>
            Bác sĩ không có quyền xem nhật ký truy cập hệ thống.
            Mọi thao tác đều được ghi nhận và xác thực tự động.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  container: {
    paddingBottom: 32,
  },

  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  noAccessBox: {
    marginTop: 24,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    alignItems: 'center',
    gap: 8,
  },

  noAccessTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#14532D',
  },

  noAccessDesc: {
    fontSize: 13,
    color: '#166534',
    textAlign: 'center',
    lineHeight: 18,
  },
});
