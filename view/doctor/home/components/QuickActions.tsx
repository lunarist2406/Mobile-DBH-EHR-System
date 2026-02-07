import { Camera, ClipboardPlus, Microscope, Pill, FileText, Stethoscope } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const actions = [
  { icon: ClipboardPlus, label: 'HSBÀ Mới', color: '#3B82F6', bg: '#DBEAFE' },
  { icon: Microscope, label: 'Xét Nghiệm', color: '#8B5CF6', bg: '#EDE9FE' },
  { icon: Pill, label: 'Kê Đơn', color: '#10B981', bg: '#D1FAE5' },
  { icon: Stethoscope, label: 'Khám Bệnh', color: '#F59E0B', bg: '#FEF3C7' },
];

export const QuickActions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Thao Tác Nhanh</Text>
      
      <View style={styles.grid}>
        {actions.map((a, i) => (
          <Pressable 
            key={i} 
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.actionCardPressed,
            ]}
          >
            <View style={[styles.iconContainer, { backgroundColor: a.bg }]}>
              <a.icon size={24} color={a.color} strokeWidth={2.5} />
            </View>
            <Text style={styles.actionLabel}>{a.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
  },
  
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000D28',
    marginBottom: 16,
    paddingHorizontal: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  
  actionCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  actionCardPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.8,
  },
  
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  
  actionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});