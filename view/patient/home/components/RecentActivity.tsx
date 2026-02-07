import { Activity, ChevronRight } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ActivityItem = {
  title: string;
  desc: string;
  time: string;
};

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    title: 'Block v.7 Sync',
    desc: 'Dr. Smith appended diagnostic node.',
    time: '2h ago',
  },
  {
    title: 'Lab Payload',
    desc: 'SHA-256 Verification complete.',
    time: '1d ago',
  },
];

export default function RecentActivity({
  data = MOCK_ACTIVITIES,
}: {
  data?: ActivityItem[];
}) {
  return (
    <View style={styles.section}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Activity size={18} color="#4f46e5" />
          <Text style={styles.headerTitle}>RECENT ACTIVITY</Text>
        </View>
        <ChevronRight size={18} color="#cbd5e1" />
      </View>

      {/* List */}
      <View style={styles.list}>
        {data.map((item, i) => {
          const [value, unit] = item.time.split(' ');

          return (
            <Pressable
              key={i}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.timeBox}>
                <Text style={styles.timeValue}>{value}</Text>
                <Text style={styles.timeUnit}>{unit?.[0]}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  section: {
    paddingBottom: 32,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
    paddingHorizontal: 4,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headerTitle: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: '#0f172a',
  },

  list: {
    gap: 16,
  },

  card: {
    flexDirection: 'row',
    gap: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },

  cardPressed: {
    transform: [{ scale: 0.98 }],
  },

  timeBox: {
    width: 48,
    height: 48,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  timeValue: {
    fontSize: 12,
    fontWeight: '900',
    color: '#4f46e5',
  },

  timeUnit: {
    fontSize: 8,
    fontWeight: '700',
    color: '#4f46e5',
    textTransform: 'uppercase',
  },

  cardTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#1e293b',
    marginBottom: 4,
  },

  cardDesc: {
    fontSize: 10,
    fontWeight: '500',
    color: '#64748b',
    lineHeight: 14,
  },
});
