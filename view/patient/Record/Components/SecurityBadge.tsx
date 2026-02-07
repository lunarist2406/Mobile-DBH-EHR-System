import React from 'react';
import { View, Text } from 'react-native';
import { CheckCircle } from 'lucide-react-native';

export const SecurityBadge: React.FC = () => {
  return (
    <View style={{
      backgroundColor: '#0F2A5F',
      borderRadius: 16,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    }}>
      <CheckCircle size={24} color="#FFFFFF" />
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#FFFFFF',
          marginBottom: 4,
        }}>
          Bảo mật blockchain
        </Text>
        <Text style={{
          fontSize: 14,
          color: '#E2E8F0',
          lineHeight: 20,
        }}>
          Tất cả hồ sơ được mã hóa và lưu trữ trên mạng blockchain phi tập trung. 
          Dữ liệu của bạn được bảo vệ an toàn và không thể bị thay đổi.
        </Text>
      </View>
    </View>
  );
};