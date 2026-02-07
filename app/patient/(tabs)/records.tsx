import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Shield, Lock, Globe, Download, Eye, FileText } from 'lucide-react-native';

export default function RecordsScreen() {
  const medicalRecords = [
    {
      id: '1',
      title: 'Medical History',
      description: 'Complete medical history since 2018',
      date: '2024-03-15',
      encrypted: true,
      hash: '0x1a2b3c...',
    },
    {
      id: '2',
      title: 'Lab Results',
      description: 'Blood tests and diagnostic reports',
      date: '2024-03-10',
      encrypted: true,
      hash: '0x4d5e6f...',
    },
    {
      id: '3',
      title: 'Prescriptions',
      description: 'Current and past medications',
      date: '2024-03-05',
      encrypted: true,
      hash: '0x7a8b9c...',
    },
    
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <Shield size={24} color="#3A8AFF" />
              <Text style={styles.headerTitle}>EHR Blockchain Vault</Text>
            </View>
            <TouchableOpacity style={styles.syncButton}>
              <Globe size={18} color="#3A8AFF" />
              <Text style={styles.syncText}>Synced</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>
            Your medical records secured on blockchain
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Records</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Encrypted</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
        </View>

        {/* Records List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Records</Text>
          {medicalRecords.map((record) => (
            <TouchableOpacity key={record.id} style={styles.recordCard}>
              <View style={styles.recordHeader}>
                <View style={styles.recordIcon}>
                  <FileText size={20} color="#3A8AFF" />
                </View>
                <View style={styles.recordInfo}>
                  <Text style={styles.recordTitle}>{record.title}</Text>
                  <Text style={styles.recordDate}>{record.date}</Text>
                </View>
                <View style={styles.recordActions}>
                  {record.encrypted && (
                    <Lock size={16} color="#10B981" style={styles.lockIcon} />
                  )}
                </View>
              </View>
              <Text style={styles.recordDescription}>{record.description}</Text>
              <View style={styles.blockchainInfo}>
                <Text style={styles.hashText}>Hash: {record.hash}</Text>
              </View>
              <View style={styles.recordFooter}>
                <TouchableOpacity style={styles.actionButton}>
                  <Eye size={16} color="#64748B" />
                  <Text style={styles.actionText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Download size={16} color="#64748B" />
                  <Text style={styles.actionText}>Download</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Blockchain Info */}
        <View style={styles.blockchainSection}>
          <Text style={styles.blockchainTitle}>Blockchain Security</Text>
          <Text style={styles.blockchainDescription}>
            All records are encrypted and stored on a decentralized blockchain network.
            Your data is immutable and tamper-proof.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  syncText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3A8AFF',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  section: {
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 16,
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recordInfo: {
    flex: 1,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  recordDate: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  recordActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockIcon: {
    marginLeft: 8,
  },
  recordDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  blockchainInfo: {
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  hashText: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#475569',
  },
  recordFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  actionText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 6,
  },
  blockchainSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  blockchainTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },
  blockchainDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
});