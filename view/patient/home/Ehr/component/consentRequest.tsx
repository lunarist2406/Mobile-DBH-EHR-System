import { AlertCircle, CheckCircle, Clock, FileCheck, UserCheck, XCircle } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Mock data - bạn có thể thay bằng import từ mock file
const CONSENTS = [
  {
    id: '1',
    from: 'BS. Trần Thị Mai',
    fromHospital: 'BV Nhi Đồng 1',
    recordType: 'Hồ sơ bệnh án',
    patientName: 'Nguyễn Văn A',
    status: 'pending',
    requestDate: '2024-02-05T10:30:00',
    reason: 'Hội chẩn bệnh tim bẩm sinh',
  },
  {
    id: '2',
    from: 'BS. Lê Hoàng Nam',
    fromHospital: 'BV Đa khoa Quốc tế',
    recordType: 'Kết quả xét nghiệm',
    patientName: 'Trần Thị B',
    status: 'approved',
    requestDate: '2024-02-04T14:20:00',
    reason: 'Kiểm tra kết quả xét nghiệm',
  },
  {
    id: '3',
    from: 'BS. Phạm Minh Tuấn',
    fromHospital: 'BV Chợ Rẫy',
    recordType: 'Chẩn đoán hình ảnh',
    patientName: 'Lê Văn C',
    status: 'rejected',
    requestDate: '2024-02-03T09:15:00',
    reason: 'Tham khảo ý kiến chuyên môn',
  },
];

export default function ConsentRequests() {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          icon: CheckCircle,
          label: 'Đã chấp nhận',
          bg: '#D1FAE5',
          color: '#059669',
        };
      case 'rejected':
        return {
          icon: XCircle,
          label: 'Đã từ chối',
          bg: '#FEE2E2',
          color: '#DC2626',
        };
      case 'pending':
      default:
        return {
          icon: AlertCircle,
          label: 'Chờ phê duyệt',
          bg: '#FEF3C7',
          color: '#D97706',
        };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <FileCheck size={20} color="#4F46E5" strokeWidth={2.5} />
          <Text style={styles.title}>Yêu Cầu Chia Sẻ Dữ Liệu</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{CONSENTS.filter(c => c.status === 'pending').length}</Text>
        </View>
      </View>

      <View style={styles.list}>
        {CONSENTS.map((consent) => {
          const statusConfig = getStatusConfig(consent.status);
          const StatusIcon = statusConfig.icon;

          return (
            <View key={consent.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.fromSection}>
                  <UserCheck size={16} color="#64748B" strokeWidth={2} />
                  <View style={styles.fromDetails}>
                    <Text style={styles.fromName}>{consent.from}</Text>
                    <Text style={styles.fromHospital}>{consent.fromHospital}</Text>
                  </View>
                </View>

                <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                  <StatusIcon size={11} color={statusConfig.color} strokeWidth={2.5} />
                  <Text style={[styles.statusText, { color: statusConfig.color }]}>
                    {statusConfig.label}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Bệnh nhân:</Text>
                  <Text style={styles.infoValue}>{consent.patientName}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Loại dữ liệu:</Text>
                  <Text style={styles.infoValue}>{consent.recordType}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Lý do:</Text>
                  <Text style={styles.infoValue}>{consent.reason}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Clock size={12} color="#94A3B8" strokeWidth={2} />
                  <Text style={styles.timeText}>
                    {new Date(consent.requestDate).toLocaleString('vi-VN')}
                  </Text>
                </View>
              </View>

              {consent.status === 'pending' && (
                <View style={styles.actions}>
                  <Pressable style={[styles.actionButton, styles.approveButton]}>
                    <CheckCircle size={14} color="#FFFFFF" strokeWidth={2.5} />
                    <Text style={styles.approveText}>Chấp nhận</Text>
                  </Pressable>
                  
                  <Pressable style={[styles.actionButton, styles.rejectButton]}>
                    <XCircle size={14} color="#DC2626" strokeWidth={2.5} />
                    <Text style={styles.rejectText}>Từ chối</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000D28',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  badge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 28,
    alignItems: 'center',
  },
  
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D97706',
  },
  
  list: {
    gap: 12,
  },
  
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  
  fromSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    flex: 1,
  },
  
  fromDetails: {
    flex: 1,
  },
  
  fromName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000D28',
    marginBottom: 2,
  },
  
  fromHospital: {
    fontSize: 11,
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
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 12,
  },
  
  infoSection: {
    gap: 8,
  },
  
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    width: 90,
  },
  
  infoValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
    flex: 1,
  },
  
  timeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#94A3B8',
    flex: 1,
  },
  
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
  },
  
  approveButton: {
    backgroundColor: '#10B981',
  },
  
  approveText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  
  rejectButton: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1.5,
    borderColor: '#FEE2E2',
  },
  
  rejectText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
});