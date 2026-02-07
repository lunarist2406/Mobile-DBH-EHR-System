import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Shield, Globe } from 'lucide-react-native';

interface MinimalHeaderProps {
  onSyncPress?: () => void;
}

export const MinimalHeader: React.FC<MinimalHeaderProps> = ({
  onSyncPress,
}) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 16,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#F1F5F9',
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: '#EFF6FF',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Shield size={24} color="#0F2A5F" />
        </View>
        <View>
          <Text style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#0F2A5F',
          }}>
            Hồ sơ Y tế
          </Text>
          <Text style={{
            fontSize: 12,
            color: '#64748B',
            marginTop: 2,
          }}>
            Phi tập trung • Đã mã hóa
          </Text>
        </View>
      </View>
      <TouchableOpacity 
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: '#F8FAFC',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#E2E8F0',
          position: 'relative',
        }}
        onPress={onSyncPress}
      >
        <Globe size={20} color="#64748B" />
        <View style={{
          position: 'absolute',
          top: 10,
          right: 10,
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#10B981',
          borderWidth: 2,
          borderColor: '#FFFFFF',
        }} />
      </TouchableOpacity>
    </View>
  );
};