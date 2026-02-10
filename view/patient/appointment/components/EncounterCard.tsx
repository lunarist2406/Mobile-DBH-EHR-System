import { Encounter } from '@/types/patient/appointment';
import { Calendar, Clock, MapPin, Stethoscope } from 'lucide-react-native';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';

interface EncounterCardProps {
  encounter: Encounter;
  onPress?: () => void;
}

export default function EncounterCard({ encounter, onPress }: EncounterCardProps) {
  const status = getStatusColor(encounter.status);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={styles.doctorInfo}>
          <Stethoscope size={16} color="#8B5CF6" />
          <Text style={styles.doctorName}>{encounter.doctor_name}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
          <Text style={[styles.statusText, { color: status.text }]}>
            {status.label}
          </Text>
        </View>
      </View>
      
      <Text style={styles.reason}>{encounter.reason_for_visit}</Text>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Calendar size={14} color="#64748B" />
          <Text style={styles.detailLabel}>Ngày nhập viện:</Text>
          <Text style={styles.detailValue}>{formatDate(encounter.admitted_at)}</Text>
        </View>
        
        {encounter.discharged_at && (
          <View style={styles.detailRow}>
            <Clock size={14} color="#64748B" />
            <Text style={styles.detailLabel}>Ngày xuất viện:</Text>
            <Text style={styles.detailValue}>{formatDate(encounter.discharged_at)}</Text>
          </View>
        )}
        
        <View style={styles.detailRow}>
          <MapPin size={14} color="#64748B" />
          <Text style={styles.detailLabel}>Bệnh viện:</Text>
          <Text style={styles.detailValue}>{encounter.hospital_name}</Text>
        </View>
      </View>
      
      {encounter.diagnosis && (
        <View style={styles.diagnosisContainer}>
          <Text style={styles.diagnosisLabel}>📋 Chẩn đoán:</Text>
          <Text style={styles.diagnosisText}>{encounter.diagnosis}</Text>
        </View>
      )}
      
      {encounter.appointment_date && (
        <View style={styles.appointmentRef}>
          <Text style={styles.appointmentRefText}>
            📅 Từ lịch hẹn: {formatDate(encounter.appointment_date)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'admitted':
      return { bg: '#EFF6FF', text: '#3A8AFF', label: 'Đang điều trị' };
    case 'in-progress':
      return { bg: '#FEF3C7', text: '#D97706', label: 'Đang khám' };
    case 'completed':
      return { bg: '#D1FAE5', text: '#10B981', label: 'Đã hoàn thành' };
    case 'discharged':
      return { bg: '#D1FAE5', text: '#10B981', label: 'Đã xuất viện' };
    case 'cancelled':
      return { bg: '#FEE2E2', text: '#EF4444', label: 'Đã hủy' };
    default:
      return { bg: '#F1F5F9', text: '#64748B', label: 'Không xác định' };
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  reason: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  detailsContainer: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748B',
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
  },
  diagnosisContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  diagnosisLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 4,
  },
  diagnosisText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  appointmentRef: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  appointmentRefText: {
    fontSize: 14,
    color: '#64748B',
    fontStyle: 'italic',
  },
});