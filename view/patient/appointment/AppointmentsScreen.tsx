import React, { useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Calendar, Clock, MapPin, Stethoscope, User } from 'lucide-react-native';
import { Appointment, Encounter } from '@/types/patient/appointment';
import { styles } from '@/styles/appointment';


const mockAppointments: Appointment[] = [
  {
    appointment_id: '1',
    patient_id: 'p1',
    doctor_id: 'd1',
    hospital_id: 'h1',
    scheduled_at: '2024-03-15T09:00:00',
    status: 'confirmed',
    notes: 'Nhớ mang theo kết quả xét nghiệm',
    created_at: '2024-03-01T10:00:00',
    doctor_name: 'BS. Nguyễn Văn A',
    hospital_name: 'Bệnh viện Bạch Mai',
    specialty: 'Tim mạch'
  },
  {
    appointment_id: '2',
    patient_id: 'p1',
    doctor_id: 'd2',
    hospital_id: 'h2',
    scheduled_at: '2024-03-20T14:30:00',
    status: 'scheduled',
    notes: null,
    created_at: '2024-03-05T11:00:00',
    doctor_name: 'BS. Trần Thị B',
    hospital_name: 'Bệnh viện Việt Đức',
    specialty: 'Thần kinh'
  },
];

const mockEncounters: Encounter[] = [
  {
    encounter_id: '1',
    patient_id: 'p1',
    doctor_id: 'd1',
    appointment_id: '1',
    hospital_id: 'h1',
    status: 'completed',
    reason_for_visit: 'Khám định kỳ tim mạch',
    diagnosis: 'Huyết áp cao giai đoạn 1',
    admitted_at: '2024-03-10T09:00:00',
    discharged_at: '2024-03-10T10:30:00',
    created_at: '2024-03-10T09:00:00',
    doctor_name: 'BS. Nguyễn Văn A',
    hospital_name: 'Bệnh viện Bạch Mai',
    appointment_date: '2024-03-10'
  },
  {
    encounter_id: '2',
    patient_id: 'p1',
    doctor_id: 'd3',
    appointment_id: null,
    hospital_id: 'h3',
    status: 'admitted',
    reason_for_visit: 'Đau bụng cấp',
    diagnosis: null,
    admitted_at: '2024-03-12T15:00:00',
    discharged_at: null,
    created_at: '2024-03-12T15:00:00',
    doctor_name: 'BS. Lê Văn C',
    hospital_name: 'Phòng khám Đa khoa ABC',
  },
];

type TabType = 'appointments' | 'encounters';

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('appointments');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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

  const getStatusColor = (status: Appointment['status'] | Encounter['status']) => {
    switch (status) {
      case 'confirmed':
      case 'admitted':
        return { bg: '#EFF6FF', text: '#3A8AFF', label: 'Đã xác nhận' };
      case 'scheduled':
        return { bg: '#FEF3C7', text: '#D97706', label: 'Đã đặt lịch' };
      case 'completed':
        return { bg: '#D1FAE5', text: '#10B981', label: 'Đã hoàn thành' };
      case 'cancelled':
        return { bg: '#FEE2E2', text: '#EF4444', label: 'Đã hủy' };
      case 'in-progress':
        return { bg: '#FEF3C7', text: '#D97706', label: 'Đang khám' };
      case 'discharged':
        return { bg: '#D1FAE5', text: '#10B981', label: 'Đã xuất viện' };
      default:
        return { bg: '#F1F5F9', text: '#64748B', label: 'Không xác định' };
    }
  };

  const renderAppointmentCard = (appointment: Appointment) => {
    const status = getStatusColor(appointment.status);
    
    return (
      <TouchableOpacity key={appointment.appointment_id} style={styles.card}>
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
  };

  const renderEncounterCard = (encounter: Encounter) => {
    const status = getStatusColor(encounter.status);
    
    return (
      <TouchableOpacity key={encounter.encounter_id} style={styles.card}>
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
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lịch hẹn & Cuộc gặp</Text>
        <Text style={styles.headerSubtitle}>Quản lý lịch khám và cuộc gặp y tế</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'appointments' && styles.activeTab]}
          onPress={() => setActiveTab('appointments')}
        >
          <Text style={[styles.tabText, activeTab === 'appointments' && styles.activeTabText]}>
            Lịch hẹn ({mockAppointments.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'encounters' && styles.activeTab]}
          onPress={() => setActiveTab('encounters')}
        >
          <Text style={[styles.tabText, activeTab === 'encounters' && styles.activeTabText]}>
            Cuộc gặp ({mockEncounters.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {activeTab === 'appointments' ? (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Lịch hẹn sắp tới</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>Xem tất cả</Text>
                </TouchableOpacity>
              </View>
              
              {mockAppointments.length > 0 ? (
                mockAppointments.map(renderAppointmentCard)
              ) : (
                <View style={styles.emptyState}>
                  <Calendar size={48} color="#94A3B8" />
                  <Text style={styles.emptyText}>Không có lịch hẹn nào</Text>
                </View>
              )}
            </>
          ) : (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Lịch sử khám bệnh</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>Xem tất cả</Text>
                </TouchableOpacity>
              </View>
              
              {mockEncounters.length > 0 ? (
                mockEncounters.map(renderEncounterCard)
              ) : (
                <View style={styles.emptyState}>
                  <Stethoscope size={48} color="#94A3B8" />
                  <Text style={styles.emptyText}>Không có cuộc gặp nào</Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}