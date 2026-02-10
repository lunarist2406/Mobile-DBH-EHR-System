import { Doctor } from '@/types/patient/appointment';
import { ChevronRight, Clock, MapPin, Star } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

interface DoctorCardProps {
  doctor: Doctor;
  onBook?: (doctor: Doctor, timeSlot: string, date: string) => void;
  onPress?: () => void;
}

export default function DoctorCard({ doctor, onBook, onPress }: DoctorCardProps) {
  const handleBook = (timeSlot: string, date: string) => {
    if (onBook) {
      onBook(doctor, timeSlot, date);
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const firstSchedule = doctor.available_hours?.[0];
  const hasSchedule = firstSchedule && firstSchedule.available_slots?.length > 0;

  return (
    <TouchableOpacity style={styles.doctorCard} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.doctorHeader}>
        <View style={styles.doctorAvatar}>
          {doctor.avatar_url ? (
            <Image 
              source={{ uri: doctor.avatar_url }} 
              style={styles.avatarImage} 
            />
          ) : (
            <Text style={styles.avatarPlaceholder}>👨‍⚕️</Text>
          )}
        </View>
        
        <View style={styles.doctorInfoContainer}>
          <Text style={styles.doctorFullName}>{doctor.full_name}</Text>
          
          {doctor.specialties && doctor.specialties.length > 0 && (
            <View style={styles.doctorSpecialties}>
              {doctor.specialties.slice(0, 2).map((specialty, index) => (
                <View key={index} style={styles.specialtyTag}>
                  <Text style={styles.specialtyTagText}>{specialty}</Text>
                </View>
              ))}
              {doctor.specialties.length > 2 && (
                <Text style={styles.moreSpecialties}>
                  +{doctor.specialties.length - 2}
                </Text>
              )}
            </View>
          )}
          
          <View style={styles.doctorStats}>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>
                {doctor.average_rating?.toFixed(1) || 'N/A'} 
                {doctor.review_count ? ` (${doctor.review_count})` : ''}
              </Text>
            </View>
            
            {doctor.years_of_experience > 0 && (
              <View style={styles.experienceContainer}>
                <Clock size={14} color="#64748B" />
                <Text style={styles.experienceText}>
                  {doctor.years_of_experience} năm KN
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <ChevronRight size={20} color="#94A3B8" />
      </View>
      
      {/* Doctor schedule */}
      {hasSchedule && (
        <View style={styles.doctorSchedule}>
          <View style={styles.scheduleHeader}>
            <Text style={styles.scheduleHospitalName}>{firstSchedule.hospital_name}</Text>
            <View style={styles.roomContainer}>
              <MapPin size={14} color="#64748B" />
              <Text style={styles.roomText}>
                {firstSchedule.room_number || 'Phòng khám'}
              </Text>
            </View>
          </View>
          
          <Text style={styles.scheduleTime}>
            {firstSchedule.day_name}: {firstSchedule.start_time} - {firstSchedule.end_time}
          </Text>
          
          {firstSchedule.available_slots && firstSchedule.available_slots.length > 0 && (
            <View style={styles.scheduleGrid}>
              {firstSchedule.available_slots.slice(0, 4).map((slot: any, slotIndex: number) => (
                <TouchableOpacity
                  key={slotIndex}
                  style={[
                    styles.timeSlot,
                    slot.is_available && !slot.is_booked && styles.availableTimeSlot,
                    slot.is_booked && styles.bookedTimeSlot
                  ]}
                  onPress={() => slot.is_available && !slot.is_booked && 
                    handleBook(slot.time, '2024-03-15')}
                  disabled={!slot.is_available || slot.is_booked}
                >
                  <Text style={[
                    styles.timeSlotText,
                    slot.is_available && !slot.is_booked && styles.availableTimeSlotText
                  ]}>
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}
      
      <View style={styles.feeContainer}>
        <View>
          <Text style={styles.feeText}>
            {doctor.consultation_fee ? 
              `${doctor.consultation_fee.toLocaleString()} VNĐ` : 
              'Liên hệ để biết giá'
            }
          </Text>
          <Text style={styles.feeSubtext}>Phí tư vấn</Text>
        </View>
        
        {onBook && (
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => handleBook('09:00', '2024-03-15')}
          >
            <Text style={styles.bookButtonText}>Đặt lịch</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  doctorCard: {
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
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  doctorAvatar: {
    marginRight: 12,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarPlaceholder: {
    fontSize: 24,
    color: '#3A8AFF',
  },
  doctorInfoContainer: {
    flex: 1,
  },
  doctorFullName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  doctorSpecialties: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  specialtyTag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
  },
  specialtyTagText: {
    fontSize: 12,
    color: '#3A8AFF',
    fontWeight: '500',
  },
  moreSpecialties: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  doctorStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    color: '#64748B',
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  experienceText: {
    fontSize: 13,
    color: '#64748B',
  },
  doctorSchedule: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scheduleHospitalName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  roomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  scheduleTime: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  scheduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  availableTimeSlot: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  bookedTimeSlot: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  timeSlotText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  availableTimeSlotText: {
    color: '#16A34A',
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  feeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  feeSubtext: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  bookButton: {
    backgroundColor: '#3A8AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});