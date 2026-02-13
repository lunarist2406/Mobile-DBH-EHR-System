import { LogOut } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onLogout: () => void;
}

const DangerZone: React.FC<Props> = ({ onLogout }) => {
  return (
    <View style={styles.dangerSection}>
      <TouchableOpacity style={styles.dangerButton} onPress={onLogout}>
        <LogOut size={20} color="#EF4444" />
        <Text style={styles.dangerButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default DangerZone;