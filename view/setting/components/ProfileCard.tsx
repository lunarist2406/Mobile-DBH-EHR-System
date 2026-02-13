import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Mail, Phone, Edit, IdCard } from 'lucide-react-native';
import { UserProfile } from '@/types/settings';

interface Props {
  profile: UserProfile;
  onEditPress?: () => void;
}

const ProfileCard: React.FC<Props> = ({ profile, onEditPress }) => {
  const initials = profile.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const formattedDate = new Date(profile.createdAt).toLocaleDateString('vi-VN');

  return (
    <View style={styles.profileCard}>
      {/* Hàng trên: Avatar + cột thông tin bên phải */}
      <View style={styles.profileHeader}>
        {/* Cột avatar + role badge bên dưới */}
        <View style={styles.avatarColumn}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{profile.roleName}</Text>
          </View>
        </View>

        {/* Cột thông tin bên phải: Tên + 2 thống kê */}
        <View style={styles.infoColumn}>
          <Text style={styles.profileName}>{profile.fullName}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Trạng thái</Text>
              <Text style={styles.statValue}>
                {profile.status === 'active'
                  ? 'Hoạt động'
                  : profile.status === 'inactive'
                  ? 'Không hoạt động'
                  : 'Đã khoá'}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Tham gia</Text>
              <Text style={styles.statValue}>{formattedDate}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Thông tin liên lạc + Mã người dùng */}
      <View style={styles.contactInfo}>
        <View style={styles.contactRow}>
          <View style={styles.iconWrapper}>
            <IdCard size={18} color="#64748B" />
          </View>
          <Text style={styles.contactText}>{profile.userId.slice(-8)}</Text>
          <Text style={styles.contactLabel}>(Mã người dùng)</Text>
        </View>
        <View style={styles.contactRow}>
          <View style={styles.iconWrapper}>
            <Mail size={18} color="#64748B" />
          </View>
          <Text style={styles.contactText}>{profile.email}</Text>
        </View>
        <View style={styles.contactRow}>
          <View style={styles.iconWrapper}>
            <Phone size={18} color="#64748B" />
          </View>
          <Text style={styles.contactText}>{profile.phone}</Text>
        </View>
      </View>

      {/* Nút chỉnh sửa */}
      <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
        <Edit size={18} color="#3A8AFF" />
        <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  avatarColumn: {
    alignItems: 'center',
    marginRight: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#3A8AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  roleBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
  },
  roleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3A8AFF',
  },
  infoColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E2E8F0',
  },
  contactInfo: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    gap: 14,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 32,
    alignItems: 'center',
    marginRight: 8,
  },
  contactText: {
    fontSize: 15,
    color: '#1E293B',
    flex: 1,
  },
  contactLabel: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#3A8AFF',
    backgroundColor: '#FFFFFF',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3A8AFF',
  },
});

export default ProfileCard;