import { Appointment, Encounter } from '@/types/patient/appointment';
import React, { useState } from 'react';
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import AllAppointments from './components/Appointment/AllAppointments';
import { AppointmentHeader } from './components/Appointment/AppointmentHeader';
import ControllingAppointScreen from './components/Appointment/ControllingAppoint';
import DoctorList from './components/Doctor/DoctorList';
import EncounterList from './components/EncounterList';
import HospitalList from './components/Hospital/HospitalList';
import TabBar from './components/TabBar';


type TabType = 'appointments' | 'encounters' | 'doctors' | 'hospitals' | 'all-appointments';

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
    specialty: 'Tim mạch',
    phone: '024 3869 3731',
    email: 'contact@bachmai.gov.vn',
    estimated_duration: 30,
    appointment_type: 'regular',
    symptoms: ['Đau ngực', 'Khó thở'],
    documents: ['xray_001.jpg', 'blood_test.pdf']
  }
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
  }
];

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('appointments');
  const [refreshing, setRefreshing] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);


  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };
    const handleBellPress = () => {
    // Điều hướng đến màn hình thông báo
    setShowNotifications(true);
  };
  const handleNotificationPress = () => {
    console.log('Notification button pressed');
  };

  const handleCancelAppointment = (appointmentId: string) => {
    console.log('Cancel appointment:', appointmentId);
    // API call here
  };

  const handleCreateAppointment = (data: any) => {
    console.log('Create appointment:', data);
    setShowCreateModal(false);
  };
  const handleBackFromAppointment = () => {
    setShowNotifications(false);
  };
  const renderContent = () => {
    if (showNotifications) {
      return (
        <ControllingAppointScreen
          appointments={mockAppointments}
          encounters={mockEncounters}
          onBack={handleBackFromAppointment}
        />
      );
    }
    switch (activeTab) {
      case 'appointments':
        return (
          <AllAppointments
            appointments={mockAppointments}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        );
      case 'encounters':
        return (
          <EncounterList
            encounters={mockEncounters}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        );
      case 'doctors':
        return (
          <DoctorList
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        );
      case 'hospitals':
        return (
          <HospitalList
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        );
      case 'all-appointments':
        return (
          <AllAppointments
            appointments={mockAppointments}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        );
      default:
        return null;
    }
  };
if (showNotifications) {
    return renderContent();
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppointmentHeader 
        onBellPress={handleBellPress}
        showBadge={true}
      />

      <TabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {renderContent()}
        </View>
      </ScrollView>
{/* 
      <CreateAppointmentModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateAppointment}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});