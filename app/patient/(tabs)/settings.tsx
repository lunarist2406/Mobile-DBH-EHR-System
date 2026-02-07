import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
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
} from 'lucide-react-native';

function getIconColor(item: any) {
  // Extract color from icon element props
  if (item.icon && item.icon.props && item.icon.props.color) {
    return item.icon.props.color;
  }
  return "#3A8AFF";
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [biometric, setBiometric] = React.useState(true);
  const [sync, setSync] = React.useState(true);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: <User size={20} color="#3A8AFF" />,
          title: 'Profile Settings',
          subtitle: 'Update personal information',
          type: 'navigate',
        },
        {
          icon: <Lock size={20} color="#10B981" />,
          title: 'Security',
          subtitle: 'Change password, 2FA',
          type: 'navigate',
        },
        {
          icon: <Shield size={20} color="#8B5CF6" />,
          title: 'Privacy',
          subtitle: 'Data sharing preferences',
          type: 'navigate',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: <Bell size={20} color="#F59E0B" />,
          title: 'Notifications',
          subtitle: 'Alerts and reminders',
          type: 'toggle',
          value: notifications,
          onValueChange: setNotifications,
        },
        {
          icon: <Moon size={20} color="#6366F1" />,
          title: 'Dark Mode',
          subtitle: 'Switch theme',
          type: 'toggle',
          value: darkMode,
          onValueChange: setDarkMode,
        },
        {
          icon: <Smartphone size={20} color="#EC4899" />,
          title: 'Biometric Login',
          subtitle: 'Use fingerprint/face ID',
          type: 'toggle',
          value: biometric,
          onValueChange: setBiometric,
        },
      ],
    },
    {
      title: 'Data & Storage',
      items: [
        {
          icon: <Database size={20} color="#0EA5E9" />,
          title: 'Data Usage',
          subtitle: 'Storage and bandwidth',
          type: 'navigate',
        },
        {
          icon: <Globe size={20} color="#3A8AFF" />,
          title: 'Auto-sync',
          subtitle: 'Sync data automatically',
          type: 'toggle',
          value: sync,
          onValueChange: setSync,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: <HelpCircle size={20} color="#64748B" />,
          title: 'Help & Support',
          subtitle: 'FAQ and contact',
          type: 'navigate',
        },
        {
          icon: <SettingsIcon size={20} color="#64748B" />,
          title: 'About App',
          subtitle: 'Version 2.1.0',
          type: 'navigate',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <SettingsIcon size={24} color="#3A8AFF" />
              <Text style={styles.headerTitle}>Settings</Text>
            </View>
          </View>
          <Text style={styles.headerSubtitle}>
            Manage your account and preferences
          </Text>
        </View>

        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>JE</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Jane Elizabeth</Text>
              <Text style={styles.profileEmail}>jane.elizabeth@example.com</Text>
              <Text style={styles.profileRole}>Patient</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={itemIndex} 
                  style={styles.settingItem}
                  onPress={() => item.type === 'navigate' && console.log(`Navigate to ${item.title}`)}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIcon, { backgroundColor: `${getIconColor(item)}20` }]}>
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
                    <Text style={styles.chevron}>›</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>EHR Systems v2.1.0</Text>
          <Text style={styles.copyrightText}>© 2024 HealthTech Inc.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#3A8AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  profileRole: {
    fontSize: 12,
    color: '#3A8AFF',
    fontWeight: '600',
    marginTop: 2,
    backgroundColor: '#EFF6FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  editProfileButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3A8AFF',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A8AFF',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  sectionContent: {
    gap: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: '#94A3B8',
    marginLeft: 8,
  },
  logoutSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    padding: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 12,
  },
  versionSection: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 8,
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
});