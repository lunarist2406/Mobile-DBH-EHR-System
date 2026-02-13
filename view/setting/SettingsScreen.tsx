import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Bell,
  Smartphone,
  Globe,
  Moon,
  User,
  Lock,
  Shield,
  Database,
  HelpCircle,
  Settings as SettingsIcon,
} from 'lucide-react-native';



// Types
import { UserProfile, SettingsSection as SettingsSectionType } from '@/types/settings';
import SettingsHeader from './components/SettingsHeader';
import ProfileCard from './components/ProfileCard';
import SettingsSection from './components/SettingsSection';
import DangerZone from './components/DangerZone';
import VersionInfo from './components/VersionInfo';
import LogoutModal from './components/LogoutModal';

export default function SettingsScreen() {
  const router = useRouter();

  // State cho các tuỳ chọn nhanh
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(true);
  const [sync, setSync] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ========== DỮ LIỆU MẪU – phù hợp với schema users & roles ==========
  const userProfile: UserProfile = {
    userId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', // uuid
    fullName: 'Nguyễn Thị Minh Anh',
    email: 'minh.anh@example.com',
    phone: '+84 912 345 678',
    roleName: 'Bệnh nhân',       // lấy từ bảng roles
    status: 'active',            // user_status_t
    createdAt: '2024-09-15T10:30:00Z',
  };

  // ========== CÁC NHÓM CÀI ĐẶT (tiếng Việt) ==========
  const quickSettings: SettingsSectionType = {
    title: 'Truy cập nhanh',
    items: [
      {
        icon: <Bell size={20} color="#F59E0B" />,
        title: 'Thông báo',
        subtitle: 'Cảnh báo và nhắc nhở',
        type: 'toggle',
        value: notifications,
        onValueChange: setNotifications,
      },
      {
        icon: <Smartphone size={20} color="#EC4899" />,
        title: 'Đăng nhập sinh trắc học',
        subtitle: 'Sử dụng vân tay / Face ID',
        type: 'toggle',
        value: biometric,
        onValueChange: setBiometric,
      },
      {
        icon: <Globe size={20} color="#3A8AFF" />,
        title: 'Tự động đồng bộ',
        subtitle: 'Đồng bộ dữ liệu tự động',
        type: 'toggle',
        value: sync,
        onValueChange: setSync,
      },
      {
        icon: <Moon size={20} color="#6366F1" />,
        title: 'Chế độ tối',
        subtitle: 'Chuyển đổi giao diện',
        type: 'toggle',
        value: darkMode,
        onValueChange: setDarkMode,
      },
    ],
  };

  const accountSettings: SettingsSectionType = {
    title: 'Cài đặt tài khoản',
    items: [
      {
        icon: <User size={20} color="#3A8AFF" />,
        title: 'Thông tin hồ sơ',
        subtitle: 'Cập nhật thông tin cá nhân',
        type: 'navigate',
      },
      {
        icon: <Lock size={20} color="#10B981" />,
        title: 'Bảo mật & Mật khẩu',
        subtitle: 'Đổi mật khẩu, xác thực 2 lớp',
        type: 'navigate',
      },
      {
        icon: <Shield size={20} color="#8B5CF6" />,
        title: 'Quyền riêng tư',
        subtitle: 'Quản lý chia sẻ dữ liệu',
        type: 'navigate',
      },
    ],
  };

  const systemSettings: SettingsSectionType = {
    title: 'Hệ thống & Hỗ trợ',
    items: [
      {
        icon: <Database size={20} color="#0EA5E9" />,
        title: 'Dữ liệu & Bộ nhớ',
        subtitle: 'Dung lượng lưu trữ, xoá cache',
        type: 'navigate',
      },
      {
        icon: <HelpCircle size={20} color="#64748B" />,
        title: 'Trung tâm trợ giúp',
        subtitle: 'Câu hỏi thường gặp, hướng dẫn',
        type: 'navigate',
      },
      {
        icon: <SettingsIcon size={20} color="#64748B" />,
        title: 'Giới thiệu EHR Systems',
        subtitle: 'Phiên bản 2.1.0 • Build 247',
        type: 'navigate',
      },
    ],
  };

  // Handlers
  const handleItemPress = (itemTitle: string) => {
    console.log(`Điều hướng đến: ${itemTitle}`);
    // Thực tế: router.push(...)
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    Alert.alert('Đã đăng xuất', 'Bạn đã đăng xuất khỏi hệ thống.');
    router.replace('/auth');
  };

  const handleEditProfile = () => {
    console.log('Chỉnh sửa hồ sơ');
    // Điều hướng đến màn hình chỉnh sửa
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SettingsHeader />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileCard profile={userProfile} onEditPress={handleEditProfile} />
        <SettingsSection
          title={quickSettings.title}
          items={quickSettings.items}
          onItemPress={handleItemPress}
        />
        <SettingsSection
          title={accountSettings.title}
          items={accountSettings.items}
          onItemPress={handleItemPress}
        />
        <SettingsSection
          title={systemSettings.title}
          items={systemSettings.items}
          onItemPress={handleItemPress}
        />
        <DangerZone onLogout={handleLogout} />
        <VersionInfo />
      </ScrollView>

      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});