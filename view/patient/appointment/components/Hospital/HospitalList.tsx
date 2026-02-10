import { Hospital } from '@/types/patient/appointment';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import FilterModal from '../Search/FilterModal';
import SearchBar from '../Search/SearchBar';
import HospitalCard from './HospitalCard';

interface HospitalListProps {
  onRefresh?: () => void;
  refreshing?: boolean;
}

const mockHospitals: Hospital[] = [
  {
    hospital_id: 'h1',
    name: 'Bệnh viện Bạch Mai',
    address: '78 Giải Phóng, Đống Đa, Hà Nội',
    license_number: 'BV-001',
    status: 'active',
    phone: '024 3869 3731',
    email: 'contact@bachmai.gov.vn',
    website: 'https://bachmai.gov.vn',
    hospital_type: 'PUBLIC',
    level: 'LEVEL_1',
    province: 'Hà Nội',
    district: 'Đống Đa',
    ward: 'Phương Liên',
    latitude: 21.001,
    longitude: 105.842,
    specialties: ['cardiology', 'neurology', 'emergency'],
    facilities: ['MRI', 'CT Scan', 'ICU', 'Phòng mổ hiện đại'],
    description: 'Bệnh viện đa khoa hạng đặc biệt',
    image_url: null,
    operating_hours: {},
    average_rating: 4.5,
    review_count: 1250,
    distance: 2.5,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  }
];

export default function HospitalList({ onRefresh, refreshing }: HospitalListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  const handleFilterChange = (filters: any) => {
    console.log('Hospital filters changed:', filters);
    const count = [
      filters.specialties?.length || 0,
      filters.minRating ? 1 : 0,
      filters.hospitalTypes?.length || 0,
      filters.hospitalLevels?.length || 0,
    ].reduce((a, b) => a + b, 0);
    
    setActiveFilters(count);
  };

  const handlePressHospital = () => {
    console.log('Press hospital card');
  };

  const handleBookHospital = () => {
    console.log('Book hospital');
  };

  return (
    <>
      <SearchBar
        placeholder="Tìm bệnh viện theo tên, địa chỉ..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={() => setShowFilterModal(true)}
        filterCount={activeFilters}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bệnh viện & Phòng khám</Text>
        <Text style={styles.seeAllText}>
          {mockHospitals.length} địa điểm
        </Text>
      </View>

      {mockHospitals.map(hospital => (
        <HospitalCard
          key={hospital.hospital_id}
          hospital={hospital}
          onPress={handlePressHospital}
          onBook={handleBookHospital}
        />
      ))}

      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onChange={handleFilterChange}
        type="hospital"
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