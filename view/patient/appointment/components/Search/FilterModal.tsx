import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { X, Star } from 'lucide-react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onChange?: (filters: any) => void;
  type?: 'doctor' | 'hospital';
}

export default function FilterModal({ 
  visible, 
  onClose, 
  onChange,
  type = 'doctor' 
}: FilterModalProps) {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const specialties = [
    { id: 'cardiology', name: 'Tim mạch' },
    { id: 'neurology', name: 'Thần kinh' },
    { id: 'pediatrics', name: 'Nhi khoa' },
    { id: 'dermatology', name: 'Da liễu' },
    { id: 'orthopedics', name: 'Chỉnh hình' },
    { id: 'dentistry', name: 'Nha khoa' },
    { id: 'ophthalmology', name: 'Mắt' },
    { id: 'ent', name: 'Tai mũi họng' },
  ];

  const hospitalTypes = [
    { id: 'PUBLIC', name: 'Công lập' },
    { id: 'PRIVATE', name: 'Tư nhân' },
    { id: 'SPECIALIZED', name: 'Chuyên khoa' },
  ];

  const hospitalLevels = [
    { id: 'LEVEL_1', name: 'Cấp I' },
    { id: 'LEVEL_2', name: 'Cấp II' },
    { id: 'LEVEL_3', name: 'Cấp III' },
  ];

  const ratings = [4.5, 4.0, 3.5, 3.0];

  const toggleSpecialty = (specialtyId: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialtyId)
        ? prev.filter(id => id !== specialtyId)
        : [...prev, specialtyId]
    );
  };

  const toggleHospitalType = (typeId: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const toggleHospitalLevel = (levelId: string) => {
    setSelectedLevels(prev =>
      prev.includes(levelId)
        ? prev.filter(id => id !== levelId)
        : [...prev, levelId]
    );
  };

  const handleReset = () => {
    setSelectedSpecialties([]);
    setMinRating(null);
    setSelectedTypes([]);
    setSelectedLevels([]);
  };

  const handleApply = () => {
    const filters = {
      specialties: selectedSpecialties,
      minRating,
      hospitalTypes: selectedTypes,
      hospitalLevels: selectedLevels,
    };
    
    if (onChange) {
      onChange(filters);
    }
    onClose();
  };

  const activeFilterCount = [
    selectedSpecialties.length,
    minRating ? 1 : 0,
    selectedTypes.length,
    selectedLevels.length,
  ].reduce((a, b) => a + b, 0);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Bộ lọc</Text>
            <TouchableOpacity onPress={onClose} style={styles.modalClose}>
              <X size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* Chuyên khoa - Hiển thị cho cả bác sĩ và bệnh viện */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Chuyên khoa</Text>
              <View style={styles.chipContainer}>
                {specialties.map(specialty => (
                  <TouchableOpacity
                    key={specialty.id}
                    style={[
                      styles.chip,
                      selectedSpecialties.includes(specialty.id) && styles.activeChip
                    ]}
                    onPress={() => toggleSpecialty(specialty.id)}
                  >
                    <Text style={[
                      styles.chipText,
                      selectedSpecialties.includes(specialty.id) && styles.activeChipText
                    ]}>
                      {specialty.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Đánh giá - Chỉ cho bác sĩ và bệnh viện */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Đánh giá tối thiểu</Text>
              <View style={styles.chipContainer}>
                {ratings.map(rating => (
                  <TouchableOpacity
                    key={rating}
                    style={[
                      styles.chip,
                      minRating === rating && styles.activeChip
                    ]}
                    onPress={() => setMinRating(minRating === rating ? null : rating)}
                  >
                    <View style={styles.ratingChipContent}>
                      <Star size={14} color="#F59E0B" fill="#F59E0B" />
                      <Text style={[
                        styles.chipText,
                        minRating === rating && styles.activeChipText,
                        styles.ratingChipText
                      ]}>
                        {rating}+
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Loại bệnh viện - Chỉ cho bệnh viện */}
            {type === 'hospital' && (
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Loại bệnh viện</Text>
                <View style={styles.chipContainer}>
                  {hospitalTypes.map(type => (
                    <TouchableOpacity
                      key={type.id}
                      style={[
                        styles.chip,
                        selectedTypes.includes(type.id) && styles.activeChip
                      ]}
                      onPress={() => toggleHospitalType(type.id)}
                    >
                      <Text style={[
                        styles.chipText,
                        selectedTypes.includes(type.id) && styles.activeChipText
                      ]}>
                        {type.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Cấp bệnh viện - Chỉ cho bệnh viện */}
            {type === 'hospital' && (
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Cấp bệnh viện</Text>
                <View style={styles.chipContainer}>
                  {hospitalLevels.map(level => (
                    <TouchableOpacity
                      key={level.id}
                      style={[
                        styles.chip,
                        selectedLevels.includes(level.id) && styles.activeChip
                      ]}
                      onPress={() => toggleHospitalLevel(level.id)}
                    >
                      <Text style={[
                        styles.chipText,
                        selectedLevels.includes(level.id) && styles.activeChipText
                      ]}>
                        {level.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>

          <View style={styles.filterFooter}>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Text style={styles.resetText}>Đặt lại</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={handleApply}
            >
              <Text style={styles.applyText}>
                Áp dụng {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  modalClose: {
    padding: 4,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeChip: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3A8AFF',
  },
  chipText: {
    fontSize: 14,
    color: '#64748B',
  },
  activeChipText: {
    color: '#3A8AFF',
    fontWeight: '500',
  },
  ratingChipContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingChipText: {
    marginLeft: 4,
  },
  filterFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  resetText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748B',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#3A8AFF',
    alignItems: 'center',
  },
  applyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});