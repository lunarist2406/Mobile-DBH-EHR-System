import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';

interface AppointmentsHeaderProps {
  onNewAppointment?: () => void;
}

export const AppointmentsHeader: React.FC<AppointmentsHeaderProps> = ({
  onNewAppointment,
}) => {
  return (
    <View style={{
      padding: 20,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#F1F5F9',
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{
          fontSize: 24,
          fontWeight: '700',
          color: '#0F2A5F',
        }}>
          Lịch hẹn
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#3A8AFF',
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 12,
          }}
          onPress={onNewAppointment}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#FFFFFF',
            marginLeft: 6,
          }}>
            Đặt lịch mới
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{
        fontSize: 14,
        color: '#64748B',
        marginTop: 8,
      }}>
        Quản lý lịch khám và tìm bác sĩ
      </Text>
    </View>
  );
};