import { Encounter } from '@/types/patient/appointment';
import { Stethoscope } from 'lucide-react-native';
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import EncounterCard from './EncounterCard';

interface EncounterListProps {
  encounters: Encounter[];
  onRefresh: () => void;
  refreshing: boolean;
}

export default function EncounterList({
  encounters,
  onRefresh,
  refreshing,
}: EncounterListProps) {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Lịch sử khám bệnh</Text>
      </View>
      
      {encounters.length > 0 ? (
        encounters.map((encounter) => (
          <EncounterCard
            key={encounter.encounter_id}
            encounter={encounter}
          />
        ))
      ) : (
        <View style={styles.emptyState}>
          <Stethoscope size={48} color="#94A3B8" />
          <Text style={styles.emptyText}>Không có cuộc gặp nào</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginTop: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 12,
  },
});