import { AccessLogUI } from '@/types/doctor/access-log.ui';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FileText, User, Shield, MapPin, Clock } from 'lucide-react-native';

interface Props {
  item: AccessLogUI;
}

export default function AccessLogItem({ item }: Props) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified':
      case 'xác thực':
        return { bg: '#D1FAE5', text: '#059669', icon: '#10B981' };
      case 'pending':
      case 'chờ xác thực':
        return { bg: '#FEF3C7', text: '#D97706', icon: '#F59E0B' };
      case 'failed':
      case 'thất bại':
        return { bg: '#FEE2E2', text: '#DC2626', icon: '#EF4444' };
      default:
        return { bg: '#F1F5F9', text: '#64748B', icon: '#94A3B8' };
    }
  };

  const statusColors = getStatusColor(item.verifyStatus);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={[styles.actionBadge, getActionBadgeStyle(item.action)]}>
            <FileText size={14} color={getActionColor(item.action)} strokeWidth={2.5} />
          </View>
          <View style={styles.titleContent}>
            <Text style={styles.action}>{item.action}</Text>
            <Text style={styles.recordType}>{item.reportType}</Text>
          </View>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
          <Shield size={10} color={statusColors.icon} strokeWidth={2.5} />
          <Text style={[styles.statusText, { color: statusColors.text }]}>
            {item.verifyStatus}
          </Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.metaContainer}>
        <View style={styles.metaRow}>
          <User size={13} color="#64748B" strokeWidth={2} />
          <Text style={styles.metaLabel}>Người thực hiện:</Text>
          <Text style={styles.metaValue}>{item.accessedByName}</Text>
        </View>
        
        <View style={styles.metaRow}>
          <MapPin size={13} color="#64748B" strokeWidth={2} />
          <Text style={styles.metaLabel}>IP:</Text>
          <Text style={styles.metaValueMono}>{item.ipAddress}</Text>
        </View>
        
        <View style={styles.metaRow}>
          <Clock size={13} color="#64748B" strokeWidth={2} />
          <Text style={styles.metaLabel}>Thời gian:</Text>
          <Text style={styles.metaValue}>
            {new Date(item.accessedAt).toLocaleString('vi-VN')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const getActionBadgeStyle = (action: string) => {
  if (action.toLowerCase().includes('view') || action.toLowerCase().includes('xem')) {
    return { backgroundColor: '#DBEAFE' };
  }
  if (action.toLowerCase().includes('edit') || action.toLowerCase().includes('sửa')) {
    return { backgroundColor: '#FEF3C7' };
  }
  if (action.toLowerCase().includes('delete') || action.toLowerCase().includes('xóa')) {
    return { backgroundColor: '#FEE2E2' };
  }
  return { backgroundColor: '#F1F5F9' };
};

const getActionColor = (action: string) => {
  if (action.toLowerCase().includes('view') || action.toLowerCase().includes('xem')) {
    return '#3B82F6';
  }
  if (action.toLowerCase().includes('edit') || action.toLowerCase().includes('sửa')) {
    return '#F59E0B';
  }
  if (action.toLowerCase().includes('delete') || action.toLowerCase().includes('xóa')) {
    return '#EF4444';
  }
  return '#64748B';
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 10,
  },
  
  actionBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  titleContent: {
    flex: 1,
  },
  
  action: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000D28',
    marginBottom: 2,
  },
  
  recordType: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 12,
  },
  
  metaContainer: {
    gap: 8,
  },
  
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  
  metaLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  
  metaValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
    flex: 1,
  },
  
  metaValueMono: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
    fontFamily: 'monospace',
    flex: 1,
  },
});