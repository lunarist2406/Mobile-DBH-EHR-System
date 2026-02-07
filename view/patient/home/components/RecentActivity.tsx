import { Activity, ChevronRight, Clock, ShieldCheck, FileCheck } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ActivityItem = {
  title: string;
  desc: string;
  time: string;
  icon: React.ReactNode;
};

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    title: 'Đồng bộ Khối v.7',
    desc: 'BS. Nguyễn Văn A đã thêm nút chẩn đoán mới',
    time: '2 giờ trước',
    icon: <ShieldCheck size={18} color="#3A8AFF" />,
  },
  {
    title: 'Xác minh Dữ liệu',
    desc: 'Xác minh SHA-256 đã hoàn tất',
    time: '1 ngày trước',
    icon: <FileCheck size={18} color="#10B981" />,
  },
  {
    title: 'Truy cập Hồ sơ',
    desc: 'Bệnh viện X đã truy cập hồ sơ của bạn',
    time: '3 ngày trước',
    icon: <Activity size={18} color="#8B5CF6" />,
  },
];

export default function RecentActivity({
  data = MOCK_ACTIVITIES,
}: {
  data?: ActivityItem[];
}) {
  return (
    <View style={styles.section}>

      {/* List */}
      <View style={styles.list}>
        {data.map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
          >
            <View style={[styles.iconContainer, { backgroundColor: getIconBgColor(item.icon) }]}>
              {item.icon}
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// Hàm helper để lấy màu nền cho icon
const getIconBgColor = (icon: React.ReactNode) => {
  // Dựa trên màu icon để chọn màu nền phù hợp
  if (!icon || typeof icon !== 'object' || !('props' in icon)) {
    return '#F8FAFC'; // Xám nhạt
  }
  const iconColor = (icon as any).props.color;
  switch (iconColor) {
    case '#3A8AFF':
      return '#EFF6FF'; // Xanh nhạt
    case '#10B981':
      return '#ECFDF5'; // Xanh lá nhạt
    case '#8B5CF6':
      return '#F5F3FF'; // Tím nhạt
    default:
      return '#F8FAFC'; // Xám nhạt
  }
};

const styles = StyleSheet.create({
  section: {
    paddingBottom: 8,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#0F2A5F',
  },

  list: {
    gap: 12,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },

  cardPressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: '#F8FAFC',
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  contentContainer: {
    flex: 1,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    flex: 1,
    marginRight: 12,
  },

  timeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
    minWidth: 60,
    textAlign: 'right',
  },

  cardDesc: {
    fontSize: 13,
    fontWeight: '400',
    color: '#64748B',
    lineHeight: 18,
  },
});