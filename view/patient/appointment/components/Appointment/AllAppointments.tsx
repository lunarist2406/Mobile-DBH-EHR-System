import { Appointment } from '@/types/patient/appointment';
import { Calendar } from 'lucide-react-native';
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import AppointmentCard from './AppointmentCard';

interface AllAppointmentsProps {
  appointments: Appointment[];
  onRefresh: () => void;
  refreshing: boolean;
}

export default function AllAppointments({
  appointments,
}: AllAppointmentsProps) {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Tất cả lịch hẹn</Text>
        <Text style={styles.seeAllText}>
          {appointments.length} lịch hẹn
        </Text>
      </View>

      {appointments.length > 0 ? (
        appointments.map(appointment => (
          <AppointmentCard
            key={appointment.appointment_id}
            appointment={appointment}
          />
        ))
      ) : (
        <View style={styles.emptyState}>
          <Calendar size={48} color="#94A3B8" />
          <Text style={styles.emptyText}>Không có lịch hẹn nào</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3A8AFF',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginTop: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 12,
  },
});