import React from 'react';
import { View } from 'react-native';
import { RecordCard } from './RecordCard';
import { MedicalRecord } from '@/types/patient/Record';

interface RecordsListProps {
  records: MedicalRecord[];
  onViewAllPress?: () => void;
  onRecordPress?: (record: MedicalRecord) => void;
}

export const RecordsList: React.FC<RecordsListProps> = ({
  records,
  onRecordPress,
}) => {
  return (
    <View>
              
      {records.map((record) => (
        <RecordCard
          key={record.id}
          record={record}
          onViewPress={() => onRecordPress?.(record)}
        />
      ))}
    </View>

  );
};