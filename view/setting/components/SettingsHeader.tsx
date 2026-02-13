import { Settings } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SettingsHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Settings size={24} color="#3A8AFF" />
        <Text style={styles.headerTitle}>Cài đặt</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default SettingsHeader;