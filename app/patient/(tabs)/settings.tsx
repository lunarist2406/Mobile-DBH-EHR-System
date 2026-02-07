import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
  Modal,
} from 'react-native';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Lock,
  Globe,
  User,
  HelpCircle,
  LogOut,
  Moon,
  Smartphone,
  Database,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Edit,
  Check,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface SettingsItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  type: 'navigate' | 'toggle';
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(true);
  const [sync, setSync] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    // Xử lý logout thực tế ở đây
    Alert.alert('Đã đăng xuất', 'Bạn đã đăng xuất thành công');
    // router.replace('/auth/login');
  };

  const userProfile = {
    name: 'Jane Elizabeth',
    email: 'jane.elizabeth@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Center, New York, NY 10001',
    patientId: 'PID-789012',
    bloodType: 'O+',
    age: 36,
  };

  const quickSettings = [
    {
      title: 'Quick Access',
      items: [
        {
          icon: <Bell size={20} color="#F59E0B" />,
          title: 'Notifications',
          subtitle: 'Alerts and reminders',
          type: 'toggle' as const,
          value: notifications,
          onValueChange: setNotifications,
        },
        {
          icon: <Smartphone size={20} color="#EC4899" />,
          title: 'Biometric Login',
          subtitle: 'Use fingerprint/face ID',
          type: 'toggle' as const,
          value: biometric,
          onValueChange: setBiometric,
        },
        {
          icon: <Globe size={20} color="#3A8AFF" />,
          title: 'Auto-sync',
          subtitle: 'Sync data automatically',
          type: 'toggle' as const,
          value: sync,
          onValueChange: setSync,
        },
        {
          icon: <Moon size={20} color="#6366F1" />,
          title: 'Dark Mode',
          subtitle: 'Switch theme',
          type: 'toggle' as const,
          value: darkMode,
          onValueChange: setDarkMode,
        },
      ],
    },
  ];

  const accountSettings = [
    {
      title: 'Account Settings',
      items: [
        {
          icon: <User size={20} color="#3A8AFF" />,
          title: 'Profile Information',
          subtitle: 'Update personal details',
          type: 'navigate' as const,
        },
        {
          icon: <Lock size={20} color="#10B981" />,
          title: 'Security & Password',
          subtitle: 'Change password, 2FA settings',
          type: 'navigate' as const,
        },
        {
          icon: <Shield size={20} color="#8B5CF6" />,
          title: 'Privacy Controls',
          subtitle: 'Manage data sharing',
          type: 'navigate' as const,
        },
      ],
    },
  ];

  const systemSettings = [
    {
      title: 'System & Support',
      items: [
        {
          icon: <Database size={20} color="#0EA5E9" />,
          title: 'Data & Storage',
          subtitle: 'Storage usage, clear cache',
          type: 'navigate' as const,
        },
        {
          icon: <HelpCircle size={20} color="#64748B" />,
          title: 'Help Center',
          subtitle: 'FAQ, guides and support',
          type: 'navigate' as const,
        },
        {
          icon: <SettingsIcon size={20} color="#64748B" />,
          title: 'About EHR Systems',
          subtitle: 'Version 2.1.0 • Build 247',
          type: 'navigate' as const,
        },
      ],
    },
  ];

  const renderSettingsSection = (section: any, index: number) => (
    <View key={index} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.sectionContent}>
        {section.items.map((item: SettingsItem, itemIndex: number) => (
          <TouchableOpacity
            key={itemIndex}
            style={styles.settingItem}
            onPress={() => item.type === 'navigate' && console.log(`Navigate to ${item.title}`)}
          >
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                {item.icon}
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
            
            {item.type === 'toggle' ? (
              <Switch
                value={item.value}
                onValueChange={item.onValueChange}
                trackColor={{ false: '#E2E8F0', true: '#3A8AFF' }}
                thumbColor="#FFFFFF"
              />
            ) : (
              <ChevronRight size={20} color="#CBD5E1" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <SettingsIcon size={24} color="#3A8AFF" />
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JE</Text>
              </View>
              <View style={styles.onlineIndicator} />
            </View>
            
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.profileName}>{userProfile.name}</Text>
                <View style={styles.roleBadge}>
                  <Text style={styles.roleText}>Patient</Text>
                </View>
              </View>
              
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>ID</Text>
                  <Text style={styles.statValue}>{userProfile.patientId}</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Blood</Text>
                  <Text style={[styles.statValue, styles.bloodValue]}>{userProfile.bloodType}</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Age</Text>
                  <Text style={styles.statValue}>{userProfile.age}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Contact Info */}
          <View style={styles.contactInfo}>
            <View style={styles.contactRow}>
              <Mail size={16} color="#64748B" />
              <Text style={styles.contactText}>{userProfile.email}</Text>
            </View>
            <View style={styles.contactRow}>
              <Phone size={16} color="#64748B" />
              <Text style={styles.contactText}>{userProfile.phone}</Text>
            </View>
            <View style={styles.contactRow}>
              <MapPin size={16} color="#64748B" />
              <Text style={styles.contactText} numberOfLines={1}>{userProfile.address}</Text>
            </View>
          </View>

          {/* Edit Button */}
          <TouchableOpacity style={styles.editButton}>
            <Edit size={16} color="#3A8AFF" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Settings */}
        {quickSettings.map(renderSettingsSection)}

        {/* Account Settings */}
        {accountSettings.map(renderSettingsSection)}

        {/* System Settings */}
        {systemSettings.map(renderSettingsSection)}

        {/* Danger Zone */}
        <View style={styles.dangerSection}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <TouchableOpacity style={styles.dangerButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.dangerButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>EHR Systems v2.1.0</Text>
          <Text style={styles.copyrightText}>© 2024 HealthTech Inc. All rights reserved.</Text>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <LogOut size={48} color="#EF4444" />
            </View>
            <Text style={styles.modalTitle}>Log Out?</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to log out? You'll need to sign in again to access your health records.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmLogout}
              >
                <LogOut size={16} color="#FFFFFF" />
                <Text style={styles.confirmButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#3A8AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginRight: 12,
  },
  roleBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3A8AFF',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  bloodValue: {
    color: '#EF4444',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  contactInfo: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#475569',
    flex: 1,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A8AFF',
    backgroundColor: '#FFFFFF',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A8AFF',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  sectionContent: {
    paddingTop: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  dangerSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
    overflow: 'hidden',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FEF2F2',
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  versionInfo: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  confirmButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    gap: 8,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});