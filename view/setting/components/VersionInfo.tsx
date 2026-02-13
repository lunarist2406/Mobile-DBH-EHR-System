import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const VersionInfo: React.FC = () => {
  return (
    <View style={styles.versionInfo}>
      <Text style={styles.versionText}>EHR Systems v2.1.0</Text>
      <Text style={styles.copyrightText}>© 2024 HealthTech Inc. Bảo lưu mọi quyền.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default VersionInfo;