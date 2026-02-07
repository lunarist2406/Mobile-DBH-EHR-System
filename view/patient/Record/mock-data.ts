import { MedicalRecord } from '@/types/patient/Record';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const medicalRecords: MedicalRecord[] = [
  {
    id: '1',
    title: 'Lịch sử Y tế',
    description: 'Lịch sử y tế đầy đủ từ năm 2018',
    date: '15-03-2024',
    encrypted: true,
    hash: '0x1a2b3c...',
    type: 'HISTORY',
  },
  {
    id: '2',
    title: 'Kết quả Xét nghiệm',
    description: 'Xét nghiệm máu và báo cáo chẩn đoán',
    date: '10-03-2024',
    encrypted: true,
    hash: '0x4d5e6f...',
    type: 'LAB',
  },
  {
    id: '3',
    title: 'Đơn thuốc',
    description: 'Thuốc hiện tại và trong quá khứ',
    date: '05-03-2024',
    encrypted: true,
    hash: '0x7a8b9c...',
    type: 'PRESCRIPTION',
  },
];

export const recordTypes = {
  HISTORY: {
    color: '#3A8AFF',
    icon: 'clipboard-text-outline',
    IconComponent: MaterialCommunityIcons,
  },
  LAB: {
    color: '#10B981',
    icon: 'test-tube',
    IconComponent: MaterialCommunityIcons,
  },
  PRESCRIPTION: {
    color: '#8B5CF6',
    icon: 'pill',
    IconComponent: MaterialCommunityIcons,
  },
};

export const statsData = [
  {
    id: '1',
    icon: '📊',
    number: '12',
    label: 'Hồ sơ',
    backgroundColor: '#EFF6FF',
    iconColor: '#3A8AFF',
  },
  {
    id: '2',
    icon: '🔐',
    number: '100%',
    label: 'Mã hóa',
    backgroundColor: '#ECFDF5',
    iconColor: '#10B981',
  },
  {
    id: '3',
    icon: '⏰',
    number: '24/7',
    label: 'Truy cập',
    backgroundColor: '#FEF3C7',
    iconColor: '#F59E0B',
  },
];