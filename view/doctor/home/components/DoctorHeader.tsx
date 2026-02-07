import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Activity } from 'lucide-react-native';

export default function DoctorHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.statusBadge}>
        <Activity size={12} color="#10b981" />
        <Text style={styles.statusText}>Đang Hoạt Động</Text>
      </View>
      
      <Text style={styles.doctorName}>BS. Nguyễn Văn An</Text>
      
      <View style={styles.infoRow}>
        <View style={styles.specialtyBadge}>
          <Text style={styles.specialtyText}>Tim Mạch</Text>
        </View>
        <Text style={styles.licenseText}>• CCHN: VN-CARD-9981</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>Bệnh viện Đa khoa Trung ương</Text>
        <View style={styles.dot} />
        <Text style={styles.metaText}>Khoa Nội Tim mạch</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    
  },
  
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  doctorName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000D28',
    marginBottom: 8,
  },
  
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  
  specialtyBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  
  specialtyText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4F46E5',
  },
  
  licenseText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  metaText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#CBD5E1',
  },
});