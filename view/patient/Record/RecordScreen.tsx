import EHRCard3D from '@/view/patient/home/Ehr/EHRCard3D/EHRCard3D';
import { CheckCircle, Globe } from 'lucide-react-native';
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

import { MinimalHeader } from './Components/MinimalHeader';
import { RecordsList } from './Components/RecordsList';
import { SecurityBadge } from './Components/SecurityBadge';
import { medicalRecords } from './mock-data';

export default function RecordsScreen() {
  const handleSyncPress = () => {
    console.log('Đồng bộ node');
  };

  const handleViewAllPress = () => {
    console.log('Xem tất cả hồ sơ');
  };

  const handleRecordPress = (record: any) => {
    console.log('Xem hồ sơ:', record.title);
  };

  const handleAddRecordPress = () => {
    console.log('Thêm hồ sơ mới');
  };

  const handleExportAllPress = () => {
    console.log('Xuất tất cả hồ sơ');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#F8FAFC" 
        translucent={Platform.OS === 'android'}
      />
      
      <View style={styles.container}>
        {/* Header Section - đã có trong MinimalHeader */}
        <MinimalHeader onSyncPress={handleSyncPress} />
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* 3D EHR Card Section */}
          <View style={styles.sectionWrapper}>
              <EHRCard3D
                record={{
                  id: '1',
                  report_type: 'LAB',
                  current_version: 2,
                  patient: {
                    full_name: 'Nguyễn Văn A',
                    dob: '1985-06-15',
                    blood_type: 'O+',
                  },
                  hospital: {
                    name: 'Bệnh viện Đa khoa Thành phố',
                    license_number: 'BV-12345',
                  },
                  doctor: {
                    full_name: 'BS. Lê Thị B',
                    license_number: 'BS-67890',
                  },
                  created_at: '15-03-2024 10:30',
                  blockchain_tx_hash: '0x1a2b3c4d5e6f7890abcdef1234567890',
                  block_number: 1234567,
                  integrity_status: 'Đã xác minh',
                  file_hash: 'sha256:abcdef123456...',
                  ehr_id: 'EHR-2024-001',
                }}
                onSyncPress={handleSyncPress}
              />
          </View>

          {/* Records List Section */}
          <View style={styles.sectionWrapper}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <View style={styles.sectionIndicator} />
                <Text style={styles.sectionTitle}>Hồ sơ Y tế</Text>
              </View>
              <TouchableOpacity onPress={handleViewAllPress}>
                <Text style={styles.seeAllText}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContent}>
              <RecordsList
                records={medicalRecords}
                onViewAllPress={handleViewAllPress}
                onRecordPress={handleRecordPress}
              />
            </View>
          </View>



          {/* Security Badge Section */}
          <View style={styles.sectionWrapper}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <View style={styles.sectionIndicator} />
                <Text style={styles.sectionTitle}>Bảo mật Blockchain</Text>
              </View>
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <CheckCircle size={12} color="#10B981" />
                  <Text style={styles.badgeText}>An toàn</Text>
                </View>
              </View>
            </View>
            <View style={styles.sectionContent}>
              <SecurityBadge />
            </View>
          </View>

          {/* Spacer cho bottom */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  
  container: {
    flex: 1,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
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
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.04,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
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
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  
  syncText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3A8AFF',
  },
  
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  badge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
  },
  
  bottomSpacer: {
    height: 32,
  },
});