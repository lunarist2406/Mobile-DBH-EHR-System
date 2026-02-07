// components/EHRDetailModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import {
  Shield,
  Share2,
  Info,
  Hash,
  Activity,
  FileText,
  Pill,
  Microscope,
  User,
  MapPin,
  Zap,
  Fingerprint,
  Link,
  ShieldCheck,
  Calendar,
  X,
  Clock,
  Building,
  Stethoscope,
  Lock,
  Globe,
} from 'lucide-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface EHRRecord {
  id: string;
  report_type: 'LAB' | 'PRESCRIPTION' | 'VITAL_SIGNS' | 'OTHER';
  current_version: number;
  patient: {
    full_name: string;
    dob: string;
    blood_type: string;
    gender?: string;
    allergies?: string[];
  };
  hospital: {
    name: string;
    license_number: string;
    address?: string;
    phone?: string;
  };
  doctor: {
    full_name: string;
    license_number: string;
    specialty?: string;
    department?: string;
  };
  created_at: string;
  blockchain_tx_hash: string;
  block_number: number;
  integrity_status: string;
  file_hash: string;
  ehr_id: string;
  additional_data?: {
    diagnosis?: string;
    treatment?: string;
    medications?: string[];
    notes?: string;
  };
}

interface Props {
  visible: boolean;
  record: EHRRecord;
  onClose: () => void;
}

const EHRDetailModal: React.FC<Props> = ({ visible, record, onClose }) => {
  const getTypeIcon = () => {
    switch (record.report_type) {
      case 'LAB':
        return <Microscope size={24} color="#4F46E5" />;
      case 'PRESCRIPTION':
        return <Pill size={24} color="#10B981" />;
      case 'VITAL_SIGNS':
        return <Activity size={24} color="#F43F5E" />;
      default:
        return <FileText size={24} color="#3B82F6" />;
    }
  };

  const getThemeColor = () => {
    switch (record.report_type) {
      case 'LAB':
        return '#4F46E5';
      case 'PRESCRIPTION':
        return '#10B981';
      case 'VITAL_SIGNS':
        return '#F43F5E';
      default:
        return '#3B82F6';
    }
  };

  const themeColor = getThemeColor();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              {getTypeIcon()}
              <Text style={styles.modalTitle}>EHR Record Details</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Patient Information */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <User size={18} color={themeColor} />
                <Text style={[styles.sectionTitle, { color: themeColor }]}>
                  Patient Information
                </Text>
              </View>
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Full Name</Text>
                  <Text style={styles.infoValue}>{record.patient.full_name}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Date of Birth</Text>
                  <View style={styles.infoRow}>
                    <Calendar size={14} color="#64748B" />
                    <Text style={styles.infoValue}>{record.patient.dob}</Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Blood Type</Text>
                  <View style={[styles.badge, { backgroundColor: `${themeColor}15` }]}>
                    <Text style={[styles.badgeText, { color: themeColor }]}>
                      {record.patient.blood_type}
                    </Text>
                  </View>
                </View>
                {record.patient.gender && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Gender</Text>
                    <Text style={styles.infoValue}>{record.patient.gender}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Medical Details */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Stethoscope size={18} color={themeColor} />
                <Text style={[styles.sectionTitle, { color: themeColor }]}>
                  Medical Details
                </Text>
              </View>
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Report Type</Text>
                  <View style={[styles.badge, { backgroundColor: `${themeColor}15` }]}>
                    <Text style={[styles.badgeText, { color: themeColor }]}>
                      {record.report_type.replace('_', ' ')}
                    </Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>EHR Version</Text>
                  <View style={styles.infoRow}>
                    <ShieldCheck size={14} color={themeColor} />
                    <Text style={styles.infoValue}>V.{record.current_version}</Text>
                  </View>
                </View>
                {record.additional_data?.diagnosis && (
                  <View style={styles.fullWidthItem}>
                    <Text style={styles.infoLabel}>Diagnosis</Text>
                    <Text style={styles.infoValue}>{record.additional_data.diagnosis}</Text>
                  </View>
                )}
                {record.additional_data?.treatment && (
                  <View style={styles.fullWidthItem}>
                    <Text style={styles.infoLabel}>Treatment</Text>
                    <Text style={styles.infoValue}>{record.additional_data.treatment}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Healthcare Provider */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Building size={18} color={themeColor} />
                <Text style={[styles.sectionTitle, { color: themeColor }]}>
                  Healthcare Provider
                </Text>
              </View>
              <View style={styles.infoGrid}>
                <View style={styles.fullWidthItem}>
                  <View style={styles.infoRow}>
                    <MapPin size={14} color="#64748B" />
                    <Text style={styles.infoLabel}>Hospital</Text>
                  </View>
                  <Text style={styles.infoValue}>{record.hospital.name}</Text>
                  {record.hospital.address && (
                    <Text style={styles.subText}>{record.hospital.address}</Text>
                  )}
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Doctor</Text>
                  <View style={styles.infoRow}>
                    <User size={14} color="#64748B" />
                    <Text style={styles.infoValue}>{record.doctor.full_name}</Text>
                  </View>
                </View>
                {record.doctor.specialty && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Specialty</Text>
                    <Text style={styles.infoValue}>{record.doctor.specialty}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Blockchain Information */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Lock size={18} color={themeColor} />
                <Text style={[styles.sectionTitle, { color: themeColor }]}>
                  Blockchain Information
                </Text>
              </View>
              <View style={styles.infoGrid}>
                <View style={styles.fullWidthItem}>
                  <View style={styles.infoRow}>
                    <Globe size={14} color="#64748B" />
                    <Text style={styles.infoLabel}>Transaction Hash</Text>
                  </View>
                  <View style={styles.hashContainer}>
                    <Text style={styles.hashText}>{record.blockchain_tx_hash}</Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Block Number</Text>
                  <View style={styles.infoRow}>
                    <Hash size={14} color="#64748B" />
                    <Text style={styles.infoValue}>{record.block_number.toLocaleString()}</Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Status</Text>
                  <View style={styles.infoRow}>
                    <Shield size={14} color="#10B981" />
                    <Text style={[styles.infoValue, { color: '#10B981' }]}>
                      {record.integrity_status}ED
                    </Text>
                  </View>
                </View>
                <View style={styles.fullWidthItem}>
                  <Text style={styles.infoLabel}>Content Hash (SHA-256)</Text>
                  <View style={styles.hashContainer}>
                    <Text style={styles.smallHashText}>{record.file_hash}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Timestamps */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Clock size={18} color={themeColor} />
                <Text style={[styles.sectionTitle, { color: themeColor }]}>
                  Timestamps
                </Text>
              </View>
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Created At</Text>
                  <Text style={styles.infoValue}>{record.created_at}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>EHR ID</Text>
                  <View style={[styles.badge, { backgroundColor: '#F1F5F9' }]}>
                    <Text style={[styles.badgeText, { color: '#475569' }]}>
                      {record.ehr_id}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Medications */}
            {record.additional_data?.medications && record.additional_data.medications.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Pill size={18} color={themeColor} />
                  <Text style={[styles.sectionTitle, { color: themeColor }]}>
                    Medications
                  </Text>
                </View>
                <View style={styles.medicationList}>
                  {record.additional_data.medications.map((medication, index) => (
                    <View key={index} style={styles.medicationItem}>
                      <Text style={styles.medicationText}>{medication}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Allergies */}
            {record.patient.allergies && record.patient.allergies.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Activity size={18} color="#EF4444" />
                  <Text style={[styles.sectionTitle, { color: '#EF4444' }]}>
                    Allergies
                  </Text>
                </View>
                <View style={styles.allergyList}>
                  {record.patient.allergies.map((allergy, index) => (
                    <View key={index} style={styles.allergyItem}>
                      <Text style={styles.allergyText}>{allergy}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Additional Notes */}
            {record.additional_data?.notes && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <FileText size={18} color={themeColor} />
                  <Text style={[styles.sectionTitle, { color: themeColor }]}>
                    Additional Notes
                  </Text>
                </View>
                <View style={styles.notesContainer}>
                  <Text style={styles.notesText}>{record.additional_data.notes}</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.secondaryButton}>
              <Share2 size={16} color="#64748B" />
              <Text style={styles.secondaryButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.primaryButton, { backgroundColor: themeColor }]}>
              <Shield size={16} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Verify Integrity</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: SCREEN_WIDTH * 0.95,
    maxHeight: SCREEN_HEIGHT * 0.85,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  scrollView: {
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  infoItem: {
    flex: 1,
    minWidth: '45%',
  },
  fullWidthItem: {
    width: '100%',
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  hashContainer: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginTop: 4,
  },
  hashText: {
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#475569',
  },
  smallHashText: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#94A3B8',
  },
  subText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  medicationList: {
    gap: 8,
  },
  medicationItem: {
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  medicationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#065F46',
  },
  allergyList: {
    gap: 8,
  },
  allergyItem: {
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  allergyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#991B1B',
  },
  notesContainer: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  notesText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default EHRDetailModal;