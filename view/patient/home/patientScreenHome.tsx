import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';

import InsightCards from './components/InsightCards';
import FloatingAIButton from './components/FloatingAIButton';
import { MOCK_PATIENT_DASHBOARD } from './ehr.mock';
import AccessLogItem from './Ehr/component/accesslog';
import { ACCESS_LOGS_UI } from '@/view/doctor/mock';
import ConsentRequests from './Ehr/component/consentRequest';
import RecentActivity from './components/RecentActivity';
import { PatientHeader } from './components/patientHeader';
import EHRCard3D from './Ehr/EHRCard3D/EHRCard3D';

export default function PatientHome() {
  const { insights } = MOCK_PATIENT_DASHBOARD;
  
  // Chỉ hiển thị 3 log gần nhất
  const recentLogs = ACCESS_LOGS_UI.slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#F8FAFC" 
        translucent={Platform.OS === 'android'}
      />
      
      <View style={styles.container}>
        {/* Header Section */}
        <PatientHeader />
        <View style={styles.sectionContent}>
          <EHRCard3D 
            record={{
              id: '1',
              report_type: 'LAB',
              current_version: 2,
              patient: {
                full_name: 'Jane Elizabeth',
                dob: '1985-06-15',
                blood_type: 'O+',
              },
              hospital: {
                name: 'City Hospital',
                license_number: 'HOSP-12345',
              },
              doctor: {
                full_name: 'Dr. Sarah Johnson',
                license_number: 'DOC-67890',
              },
              created_at: '2024-03-15 10:30',
              blockchain_tx_hash: '0x1a2b3c4d5e6f7890abcdef1234567890',
              block_number: 1234567,
              integrity_status: 'VERIFI',
              file_hash: 'sha256:abcdef123456...',
              ehr_id: 'EHR-2024-001',
            }}
            onSyncPress={() => console.log('Sync node')}
          />
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* Insights Section */}
          <View style={styles.sectionWrapper}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <View style={styles.sectionIndicator} />
                <Text style={styles.sectionTitle}>Health Insights</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContent}>
              <InsightCards items={insights} />
            </View>
          </View>

          {/* Access Log Section */}
          <View style={styles.sectionWrapper}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <View style={styles.sectionIndicator} />
                <Text style={styles.sectionTitle}>Recent Access</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>View All</Text>
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

          {/* Consent Requests Section */}
          <View style={styles.sectionWrapper}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <View style={styles.sectionIndicator} />
                <Text style={styles.sectionTitle}>Consent Requests</Text>
              </View>
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>2 New</Text>
                </View>
              </View>
            </View>
            <View style={styles.sectionContent}>
              <ConsentRequests />
            </View>
          </View>

          {/* Recent Activity Section */}
          <View style={[styles.sectionWrapper, styles.lastSection]}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <View style={styles.sectionIndicator} />
                <Text style={styles.sectionTitle}>Recent Activity</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>View Timeline</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContent}>
              <RecentActivity />
            </View>
          </View>

          {/* Spacer cho floating button */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Floating AI Button */}
        <FloatingAIButton onPress={() => {}} />
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
    backgroundColor: '#4F46E5',
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
    color: '#4F46E5',
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
  
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  badge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  
  bottomSpacer: {
    height: 32,
  },
});