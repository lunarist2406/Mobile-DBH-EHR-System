import { Doctor } from '@/types/patient/appointment';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FilterModal from '../Search/FilterModal';

import DoctorCard from './DoctorCard';
import SearchBar from '../Search/SearchBar';

interface DoctorListProps {
  onRefresh?: () => void;
  refreshing?: boolean;
}

const mockDoctors: Doctor[] = [
  {
    doctor_id: 'd1',
    user_id: 'u1',
    full_name: 'BS. Nguyễn Văn A',
    license_number: 'BS-12345',
    qualifications: ['Tiến sĩ Y khoa', 'Chuyên khoa I Tim mạch'],
    years_of_experience: 15,
    biography: 'Chuyên gia tim mạch với 15 năm kinh nghiệm, từng tu nghiệp tại Pháp.',
    avatar_url: null,
    specialties: ['cardiology', 'internal_medicine'],
    average_rating: 4.8,
    review_count: 124,
    languages: ['Tiếng Việt', 'Tiếng Anh', 'Tiếng Pháp'],
    consultation_fee: 500000,
    available_hours: [{
      schedule_id: 's1',
      hospital_id: 'h1',
      hospital_name: 'Bệnh viện Bạch Mai',
      day_of_week: 1,
      day_name: 'Thứ 2',
      start_time: '08:00',
      end_time: '12:00',
      room_number: '301',
      is_available: true,
      available_slots: [
        { time: '08:00', is_available: true, is_booked: false },
        { time: '09:00', is_available: true, is_booked: false },
        { time: '10:00', is_available: false, is_booked: true },
        { time: '11:00', is_available: true, is_booked: false },
      ]
    }],
    hospitals: [{
      hospital_id: 'h1',
      hospital_name: 'Bệnh viện Bạch Mai',
      department: 'Khoa Tim mạch',
      job_title: 'Trưởng khoa',
      employment_type: 'FULL_TIME',
      assigned_at: '2020-01-15'
    }],
    created_at: '2020-01-01',
    updated_at: '2024-01-01'
  }
];

export default function DoctorList({ onRefresh, refreshing }: DoctorListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    const count = [
      filters.specialties?.length || 0,
      filters.minRating ? 1 : 0,
    ].reduce((a, b) => a + b, 0);
    
    setActiveFilters(count);
  };

  const handleBookDoctor = (doctor: Doctor, timeSlot: string, date: string) => {
    console.log('Booking doctor:', doctor.full_name, 'at', timeSlot, 'on', date);
  };

  const handlePressDoctor = () => {
    console.log('Press doctor card');
  };

  return (
    <>
      <SearchBar
        placeholder="Tìm bác sĩ theo tên, chuyên khoa..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={() => setShowFilterModal(true)}
        filterCount={activeFilters}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bác sĩ</Text>
        <Text style={styles.seeAllText}>
          {mockDoctors.length} bác sĩ
        </Text>
      </View>

      {mockDoctors.map(doctor => (
        <DoctorCard
          key={doctor.doctor_id}
          doctor={doctor}
          onBook={handleBookDoctor}
          onPress={handlePressDoctor}
        />
      ))}

      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onChange={handleFilterChange}
        type="doctor"
      />
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
    marginTop: 16,
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
});