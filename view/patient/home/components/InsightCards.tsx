import { InsightItem } from '@/types/patient/patient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  items: InsightItem[];
}

export default function InsightCards({ items }: Props) {
  return (
    <View style={styles.row}>
      {items.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
          {item.status && (
            <Text style={styles.status}>{item.status}</Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 24,
    backgroundColor: '#f8fafc',
  },
  label: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '700',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '800',
    color: '#020617',
  },
  status: {
    fontSize: 9,
    marginTop: 4,
    color: '#10b981',
    fontWeight: '700',
  },
});
