import { Bell, Calendar } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AppointmentHeaderProps {
  onNotificationPress?: () => void;
  showBadge?: boolean;
}

export const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({
  onNotificationPress,
  showBadge = true,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.leftContent}>
          <View style={styles.iconContainer}>
            <Calendar size={24} color="#3A8AFF" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.headerTitle}>Lịch hẹn & Cuộc gặp</Text>
            <Text style={styles.headerSubtitle}>Quản lý lịch khám và cuộc gặp y tế</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={onNotificationPress}
        >
          <Bell size={20} color="#64748B" />
          {showBadge && <View style={styles.notificationBadge} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F2A5F',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});