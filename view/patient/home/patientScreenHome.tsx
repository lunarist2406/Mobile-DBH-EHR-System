// screens/PatientHome.tsx
import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MOCK_PATIENT_DASHBOARD } from './ehr.mock';
import AccessLogItem from './Ehr/component/accesslog';
import { ACCESS_LOGS_UI } from '@/view/doctor/mock';
import ConsentRequests from './Ehr/component/consentRequest';
import RecentActivity from './components/RecentActivity';
import { PatientHeader } from './components/patientHeader';
import EHRCard3D from './Ehr/EHRCard3D/EHRCard3D';
import AIFloatingButton from '@/view/AiChat/AIFloating';

export default function PatientHome() {
  const { insights } = MOCK_PATIENT_DASHBOARD;
  const recentLogs = ACCESS_LOGS_UI.slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8FAFC"
        translucent={Platform.OS === 'android'}
      />

      {/* 
        ✅ Dùng position: 'relative' + zIndex để FAB nổi trên ScrollView
        KHÔNG bọc thêm View nếu không cần — giữ cấu trúc gốc
      */}
      <View style={styles.container}>
        <PatientHeader />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* EHR Card */}
          <View style={styles.sectionWrapper}>
            <EHRCard3D
              record={{
                id: '1',
                report_type: 'LAB',
                current_version: 2,
                patient: {
                  full_name: 'Nguyễn Văn An',
                  dob: '1985-06-15',
                  blood_type: 'O+',
                },
                hospital: {
                  name: 'Bệnh viện Đa khoa Thành phố',
                  license_number: 'BV-12345',
                },
                doctor: {
                  full_name: 'BS. Lê Thị Bình',
                  license_number: 'BS-67890',
                },
                created_at: '15-03-2024 10:30',
                blockchain_tx_hash: '0x1a2b3c4d5e6f7890abcdef1234567890',
                block_number: 1234567,
                integrity_status: 'ĐÃ XÁC MINH',
                file_hash: 'sha256:abcdef123456...',
                ehr_id: 'EHR-2024-001',
              }}
              onSyncPress={() => console.log('Đồng bộ node')}
            />
          </View>

          {/* Yêu cầu cấp quyền */}
          <View style={styles.sectionWrapper}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <View style={styles.sectionIndicator} />
                <Text style={styles.sectionTitle}>Yêu cầu cấp quyền</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Xem thêm</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContent}>
              <ConsentRequests />
            </View>
          </View>

          {/* Truy cập Gần đây */}
          <View style={styles.sectionWrapper}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <View style={styles.sectionIndicator} />
                <Text style={styles.sectionTitle}>Truy cập Gần đây</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Xem thêm</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContent}>
              <View style={styles.accessLogsContainer}>
                {recentLogs.map((item) => (
                  <View key={item.id} style={styles.accessLogItem}>
                    <AccessLogItem item={item} />
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Hoạt động Gần đây */}
          <View style={[styles.sectionWrapper, styles.lastSection]}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <View style={styles.sectionIndicator} />
                <Text style={styles.sectionTitle}>Hoạt động Gần đây</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Xem thêm</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContent}>
              <RecentActivity />
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* ✅ Floating AI Button — nổi trên tất cả, position absolute */}
        <AIFloatingButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // ✅ position: 'relative' để AIFloatingButton dùng position: 'absolute' bên trong
  container: {
    flex: 1,
    position: 'relative',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    paddingTop: 8,
  },

  sectionWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  lastSection: {
    marginBottom: 32,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },

  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    backgroundColor: '#3A8AFF',
    marginRight: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: -0.3,
  },

  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A8AFF',
  },

  sectionContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  accessLogsContainer: {
    gap: 12,
  },

  accessLogItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  bottomSpacer: {
    height: 32,
  },
});