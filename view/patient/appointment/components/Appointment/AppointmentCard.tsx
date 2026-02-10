import { Appointment } from '@/types/patient/appointment';
import { Calendar, Clock, MapPin, User } from 'lucide-react-native';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';

interface AppointmentCardProps {
  appointment: Appointment;
  onPress?: () => void;
}

export default function AppointmentCard({ appointment, onPress }: AppointmentCardProps) {
  const status = getStatusColor(appointment.status);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={styles.doctorInfo}>
          <User size={16} color="#3A8AFF" />
          <Text style={styles.doctorName}>{appointment.doctor_name}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
          <Text style={[styles.statusText, { color: status.text }]}>
            {status.label}
          </Text>
        </View>
      </View>
      
      <Text style={styles.specialty}>{appointment.specialty}</Text>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Calendar size={14} color="#64748B" />
          <Text style={styles.detailLabel}>Ngày:</Text>
          <Text style={styles.detailValue}>{formatDate(appointment.scheduled_at)}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Clock size={14} color="#64748B" />
          <Text style={styles.detailLabel}>Giờ:</Text>
          <Text style={styles.detailValue}>{formatTime(appointment.scheduled_at)}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MapPin size={14} color="#64748B" />
          <Text style={styles.detailLabel}>Địa điểm:</Text>
          <Text style={styles.detailValue}>{appointment.hospital_name}</Text>
        </View>
      </View>
      
      {appointment.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>📝 Ghi chú:</Text>
          <Text style={styles.notesText}>{appointment.notes}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'confirmed':
      return { bg: '#EFF6FF', text: '#3A8AFF', label: 'Đã xác nhận' };
    case 'scheduled':
      return { bg: '#FEF3C7', text: '#D97706', label: 'Đã đặt lịch' };
    case 'completed':
      return { bg: '#D1FAE5', text: '#10B981', label: 'Đã hoàn thành' };
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
  specialty: {
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
    width: 70,
  },
  detailValue: {
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
  },
  notesContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
});