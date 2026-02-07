import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Lock, Eye } from 'lucide-react-native';
import { recordTypes } from '../mock-data';
import { styles } from '../../../../styles/Record';
import { MedicalRecord } from '@/types/patient/Record';

interface RecordCardProps {
  record: MedicalRecord;
  onViewPress?: () => void;
}

export const RecordCard: React.FC<RecordCardProps> = ({ record, onViewPress }) => {
  const recordType = recordTypes[record.type];
  const IconComponent = recordType.IconComponent;

  return (
    <TouchableOpacity style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <View style={styles.recordIconContainer}>
          <IconComponent name={recordType.icon as any} size={24} color={recordType.color} />
        </View>
        
        <View style={styles.recordContent}>
          <View style={styles.recordTitleRow}>
            <Text style={styles.recordTitle}>{record.title}</Text>
            {record.encrypted && (
              <Lock size={14} color="#10B981" />
            )}
          </View>
          <Text style={styles.recordDescription}>{record.description}</Text>
          <View style={styles.recordFooter}>
            <Text style={styles.recordDate}>{record.date}</Text>
            <TouchableOpacity style={styles.viewButton} onPress={onViewPress}>
              <Eye size={16} color="#3A8AFF" />
              <Text style={styles.viewButtonText}>Xem</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <View style={styles.blockchainHash}>
        <Text style={styles.hashText}>Hash: {record.hash}</Text>
      </View>
    </TouchableOpacity>
  );
};