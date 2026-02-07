import { AccessLogUI } from '@/types/doctor/access-log.ui';
import { ChevronRight, Clock, Edit2, Eye, FileText, MapPin, Shield, Trash2, User } from 'lucide-react-native';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface Props {
  item: AccessLogUI;
}

export default function AccessLogItem({ item }: Props) {
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes('xác thực') || statusLower.includes('verified')) {
      return { 
        bg: '#ECFDF5', 
        text: '#065F46', 
        icon: '#10B981',
        border: '#A7F3D0'
      };
    }
    if (statusLower.includes('chờ') || statusLower.includes('pending')) {
      return { 
        bg: '#FFFBEB', 
        text: '#92400E', 
        icon: '#F59E0B',
        border: '#FDE68A'
      };
    }
    if (statusLower.includes('thất bại') || statusLower.includes('failed')) {
      return { 
        bg: '#FEF2F2', 
        text: '#991B1B', 
        icon: '#EF4444',
        border: '#FECACA'
      };
    }
    return { 
      bg: '#F8FAFC', 
      text: '#475569', 
      icon: '#94A3B8',
      border: '#E2E8F0'
    };
  };

  const getActionConfig = (action: string) => {
    const actionLower = action.toLowerCase();
    
    if (actionLower.includes('xem') || actionLower.includes('view')) {
      return {
        icon: Eye,
        color: '#3A8AFF',
        bg: '#EFF6FF',
        label: 'Xem hồ sơ'
      };
    }
    if (actionLower.includes('sửa') || actionLower.includes('edit')) {
      return {
        icon: Edit2,
        color: '#F59E0B',
        bg: '#FEF3C7',
        label: 'Chỉnh sửa'
      };
    }
    if (actionLower.includes('xóa') || actionLower.includes('delete')) {
      return {
        icon: Trash2,
        color: '#EF4444',
        bg: '#FEE2E2',
        label: 'Xóa'
      };
    }
    return {
      icon: FileText,
      color: '#64748B',
      bg: '#F1F5F9',
      label: 'Thao tác'
    };
  };

  const statusColors = getStatusColor(item.verifyStatus);
  const actionConfig = getActionConfig(item.action);
  const ActionIcon = actionConfig.icon;

  return (
    <View style={styles.container}>
      {/* Header with Action and Status */}
      <View style={styles.header}>
        <View style={styles.actionSection}>
          <View style={[styles.actionIconContainer, { backgroundColor: actionConfig.bg }]}>
            <ActionIcon size={18} color={actionConfig.color} strokeWidth={2} />
          </View>
          <View style={styles.actionInfo}>
            <Text style={styles.actionLabel}>{actionConfig.label}</Text>
            <Text style={styles.recordType}>{item.reportType}</Text>
          </View>
        </View>
        
        <View style={[styles.statusContainer, { 
          backgroundColor: statusColors.bg,
          borderColor: statusColors.border 
        }]}>
          <Shield size={12} color={statusColors.icon} strokeWidth={2.5} />
          <Text style={[styles.statusText, { color: statusColors.text }]}>
            {item.verifyStatus}
          </Text>
        </View>
      </View>
      
      {/* Details Grid */}
      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <View style={styles.detailLabelContainer}>
            <User size={14} color="#64748B" />
            <Text style={styles.detailLabel}>Người thực hiện</Text>
          </View>
          <Text style={styles.detailValue} numberOfLines={1}>
            {item.accessedByName}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <View style={styles.detailLabelContainer}>
            <MapPin size={14} color="#64748B" />
            <Text style={styles.detailLabel}>Địa chỉ IP</Text>
          </View>
          <Text style={styles.detailValueMono} numberOfLines={1}>
            {item.ipAddress}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <View style={styles.detailLabelContainer}>
            <Clock size={14} color="#64748B" />
            <Text style={styles.detailLabel}>Thời gian</Text>
          </View>
          <Text style={styles.detailValue}>
            {new Date(item.accessedAt).toLocaleString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
      </View>
      
      {/* Footer with Chevron */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Xem chi tiết</Text>
        <ChevronRight size={16} color="#94A3B8" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  
  actionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  actionInfo: {
    flex: 1,
  },
  
  actionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  
  recordType: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
  },
  
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  
  detailsGrid: {
    gap: 12,
    marginBottom: 16,
  },
  
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  
  detailLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
  },
  
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    textAlign: 'right',
    flex: 1,
    marginLeft: 12,
  },
  
  detailValueMono: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    textAlign: 'right',
    flex: 1,
    marginLeft: 12,
  },
  
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  
  footerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3A8AFF',
  },
});