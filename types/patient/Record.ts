export type RecordType = 'HISTORY' | 'LAB' | 'PRESCRIPTION';

export interface MedicalRecord {
  id: string;
  title: string;
  description: string;
  date: string;
  encrypted: boolean;
  hash: string;
  type: RecordType;
}

export interface RecordTypeConfig {
  color: string;
  icon: string;
  IconComponent: React.ComponentType<any>;
}

export interface StatsCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  backgroundColor: string;
}

export interface ActionButtonProps {
  icon: React.ReactNode;
  text: string;
  onPress?: () => void;
  type: 'primary' | 'secondary';
}