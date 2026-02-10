import { styles } from '@/styles/appointment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar as CalendarIcon, Clock, MapPin, User, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface CreateAppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreateAppointmentModal({ visible, onClose, onSubmit }: CreateAppointmentModalProps) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedHospital, setSelectedHospital] = useState<any>(null);

  const handleSubmit = () => {
    const appointmentData = {
      doctor_id: selectedDoctor?.doctor_id,
      hospital_id: selectedHospital?.hospital_id,
      scheduled_date: date.toISOString().split('T')[0],
      scheduled_time: time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      reason,
      notes,
      appointment_type: 'regular'
    };
    onSubmit(appointmentData);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Đặt lịch hẹn mới</Text>
            <TouchableOpacity onPress={onClose} style={styles.modalClose}>
              <X size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {/* Doctor Selection */}
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.detailSectionTitle}>Chọn bác sĩ</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {/* Navigate to doctor selection */}}
              >
                {selectedDoctor ? (
                  <>
                    <User size={20} color="#3A8AFF" />
                    <View style={{ marginLeft: 12, flex: 1 }}>
                      <Text style={{ fontSize: 16, fontWeight: '600', color: '#0F2A5F' }}>
                        {selectedDoctor.full_name}
                      </Text>
                      <Text style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
                        {selectedDoctor.specialties?.[0]}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <User size={20} color="#94A3B8" />
                    <Text style={{ marginLeft: 12, fontSize: 16, color: '#94A3B8' }}>
                      Chọn bác sĩ
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Hospital Selection */}
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.detailSectionTitle}>Chọn bệnh viện/phòng khám</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {/* Navigate to hospital selection */}}
              >
                {selectedHospital ? (
                  <>
                    <MapPin size={20} color="#3A8AFF" />
                    <View style={{ marginLeft: 12, flex: 1 }}>
                      <Text style={{ fontSize: 16, fontWeight: '600', color: '#0F2A5F' }}>
                        {selectedHospital.name}
                      </Text>
                      <Text style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
                        {selectedHospital.address}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <MapPin size={20} color="#94A3B8" />
                    <Text style={{ marginLeft: 12, fontSize: 16, color: '#94A3B8' }}>
                      Chọn địa điểm
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Date Selection */}
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.detailSectionTitle}>Chọn ngày</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => setShowDatePicker(true)}
              >
                <CalendarIcon size={20} color="#3A8AFF" />
                <Text style={{ marginLeft: 12, fontSize: 16, color: '#0F2A5F' }}>
                  {formatDate(date)}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Time Selection */}
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.detailSectionTitle}>Chọn giờ</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => setShowTimePicker(true)}
              >
                <Clock size={20} color="#3A8AFF" />
                <Text style={{ marginLeft: 12, fontSize: 16, color: '#0F2A5F' }}>
                  {formatTime(time)}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Reason for Visit */}
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.detailSectionTitle}>Lý do khám *</Text>
              <TextInput
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 16,
                  color: '#0F2A5F',
                  minHeight: 100,
                  textAlignVertical: 'top',
                }}
                placeholder="Mô tả triệu chứng/lý do khám bệnh..."
                multiline
                numberOfLines={4}
                value={reason}
                onChangeText={setReason}
              />
            </View>

            {/* Notes */}
            <View style={{ marginBottom: 30 }}>
              <Text style={styles.detailSectionTitle}>Ghi chú thêm</Text>
              <TextInput
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 16,
                  color: '#0F2A5F',
                  minHeight: 80,
                  textAlignVertical: 'top',
                }}
                placeholder="Thông tin bổ sung..."
                multiline
                numberOfLines={3}
                value={notes}
                onChangeText={setNotes}
              />
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#F1F5F9',
                borderRadius: 12,
                paddingVertical: 16,
                marginRight: 8,
                alignItems: 'center',
              }}
              onPress={onClose}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#64748B' }}>
                Hủy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#3A8AFF',
                borderRadius: 12,
                paddingVertical: 16,
                marginLeft: 8,
                alignItems: 'center',
              }}
              onPress={handleSubmit}
              disabled={!reason.trim()}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>
                Đặt lịch
              </Text>
            </TouchableOpacity>
          </View>

          {/* Date Picker */}
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              minimumDate={new Date()}
              onChange={(_event: any, selectedDate?: Date) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}

          {/* Time Picker */}
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event: any, selectedTime?: Date) => {
                setShowTimePicker(false);
                if (selectedTime) {
                  setTime(selectedTime);
                }
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}