// components/EHRCard3D.tsx
import {
    Activity,
    Calendar,
    ChevronRight,
    FileText,
    Fingerprint,
    MapPin,
    Microscope,
    Pill,
    Share2,
    Shield,
    ShieldCheck,
    User,
} from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import EHRDetailModal from './EHRDetailModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH;

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
  record: EHRRecord;
  onSyncPress?: () => void;
  compact?: boolean;
}

const EHRCard3D: React.FC<Props> = ({ record, onSyncPress, compact = false }) => {
  const [showDetail, setShowDetail] = useState(false);
  const rotateY = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    if (compact) return; // Disable flip in compact mode
    
    const toValue = isFlipped ? 0 : 180;
    setIsFlipped(!isFlipped);
    
    Animated.timing(rotateY, {
      toValue,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const getTypeIcon = () => {
    switch (record.report_type) {
      case 'LAB':
        return <Microscope size={20} color="#FFFFFF" />;
      case 'PRESCRIPTION':
        return <Pill size={20} color="#FFFFFF" />;
      case 'VITAL_SIGNS':
        return <Activity size={20} color="#FFFFFF" />;
      default:
        return <FileText size={20} color="#FFFFFF" />;
    }
  };

  const getThemeColor = () => {
    switch (record.report_type) {
      case 'LAB':
        return { bg: '#4F46E5', light: '#6366F1', dark: '#3730A3' };
      case 'PRESCRIPTION':
        return { bg: '#10B981', light: '#34D399', dark: '#047857' };
      case 'VITAL_SIGNS':
        return { bg: '#F43F5E', light: '#FB7185', dark: '#9F1239' };
      default:
        return { bg: '#3B82F6', light: '#60A5FA', dark: '#1E40AF' };
    }
  };

  const theme = getThemeColor();

  // Front card rotation
  const frontRotate = rotateY.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  // Back card rotation
  const backRotate = rotateY.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  if (compact) {
    // Compact mode for Home screen
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowDetail(true)}
          style={styles.compactContainer}
        >
          <View style={[styles.compactCard, { backgroundColor: theme.bg }]}>
            <View style={styles.compactHeader}>
              <View style={styles.compactIcon}>
                {getTypeIcon()}
              </View>
              <View style={styles.compactTitle}>
                <Text style={styles.compactType}>
                  {record.report_type.replace('_', ' ')}
                </Text>
                <Text style={styles.compactDate}>{record.created_at}</Text>
              </View>
              <ChevronRight size={20} color="#FFFFFF90" />
            </View>
            
            <View style={styles.compactContent}>
              <Text style={styles.compactPatient} numberOfLines={1}>
                {record.patient.full_name}
              </Text>
              <View style={styles.compactMeta}>
                <View style={styles.compactMetaItem}>
                  <User size={12} color="#FFFFFF90" />
                  <Text style={styles.compactMetaText}>{record.doctor.full_name}</Text>
                </View>
                <View style={styles.compactMetaItem}>
                  <MapPin size={12} color="#FFFFFF90" />
                  <Text style={styles.compactMetaText} numberOfLines={1}>
                    {record.hospital.name}
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.compactFooter}>
              <View style={[styles.verifiedBadge, { backgroundColor: `${theme.dark}50` }]}>
                <ShieldCheck size={12} color="#FFFFFF" />
                <Text style={styles.verifiedText}>{record.integrity_status}</Text>
              </View>
              <View style={styles.idBadge}>
                <Text style={styles.idText}>#{record.ehr_id.split('-')[1]}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <EHRDetailModal
          visible={showDetail}
          record={record}
          onClose={() => setShowDetail(false)}
        />
      </>
    );
  }

  // Full 3D mode for Records screen
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={flipCard}
        style={styles.container}
      >
        {/* Front Card */}
        <Animated.View
          style={[
            styles.card,
            styles.frontCard,
            {
              backgroundColor: theme.bg,
              transform: [
                { rotateY: frontRotate },
                { perspective: 1000 },
              ],
            },
          ]}
        >
          <View style={styles.frontContent}>
            <View style={styles.frontHeader}>
              <View style={styles.verifiedBadge}>
                <ShieldCheck size={14} color="#22D3EE" />
                <Text style={styles.verifiedText}>EHR V.{record.current_version}</Text>
              </View>
              {getTypeIcon()}
            </View>

            <View style={styles.patientSection}>
              <View style={styles.avatar}>
                <Fingerprint size={24} color="#FFFFFF" />
              </View>
              <View style={styles.patientInfo}>
                <Text style={styles.patientName} numberOfLines={1}>
                  {record.patient.full_name}
                </Text>
                <View style={styles.patientMeta}>
                  <View style={styles.metaItem}>
                    <Calendar size={12} color="#FFFFFF90" />
                    <Text style={styles.metaText}>{record.patient.dob}</Text>
                  </View>
                  <View style={styles.bloodBadge}>
                    <Text style={styles.bloodText}>{record.patient.blood_type}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.detailsSection}>
              <View style={styles.detailRow}>
                <User size={14} color="#FFFFFF90" />
                <Text style={styles.detailText}>{record.doctor.full_name}</Text>
              </View>
              <View style={styles.detailRow}>
                <MapPin size={14} color="#FFFFFF90" />
                <Text style={styles.detailText} numberOfLines={1}>
                  {record.hospital.name}
                </Text>
              </View>
            </View>

            <View style={styles.frontFooter}>
              <Text style={styles.timestamp}>{record.created_at}</Text>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={(e) => {
                  e.stopPropagation();
                  setShowDetail(true);
                }}
              >
                <Text style={styles.detailButtonText}>VIEW DETAILS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Back Card */}
        <Animated.View
          style={[
            styles.card,
            styles.backCard,
            {
              backgroundColor: '#0F172A',
              transform: [
                { rotateY: backRotate },
                { perspective: 1000 },
              ],
            },
          ]}
        >
          <View style={styles.backContent}>
            <View style={styles.backHeader}>
              <View style={styles.blockchainBadge}>
                <Shield size={16} color="#22D3EE" />
                <Text style={styles.blockchainText}>BLOCKCHAIN VERIFIED</Text>
              </View>
            </View>

            <View style={styles.blockchainInfo}>
              <View style={styles.blockchainItem}>
                <Text style={styles.blockchainLabel}>Transaction Hash</Text>
                <Text style={styles.blockchainValue} numberOfLines={1}>
                  {record.blockchain_tx_hash.substring(0, 24)}...
                </Text>
              </View>
              
              <View style={styles.blockchainGrid}>
                <View style={styles.gridItem}>
                  <Text style={styles.blockchainLabel}>Block #</Text>
                  <Text style={styles.blockchainNumber}>
                    {record.block_number.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.blockchainLabel}>Status</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{record.integrity_status}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.blockchainItem}>
                <Text style={styles.blockchainLabel}>EHR ID</Text>
                <Text style={styles.ehrId}>{record.ehr_id}</Text>
              </View>
            </View>

            <View style={styles.backFooter}>
              <TouchableOpacity
                style={styles.syncButton}
                onPress={(e) => {
                  e.stopPropagation();
                  onSyncPress?.();
                }}
              >
                <Share2 size={14} color="#22D3EE" />
                <Text style={styles.syncText}>SYNC</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={(e) => {
                  e.stopPropagation();
                  setShowDetail(true);
                }}
              >
                <Text style={styles.viewDetailsText}>VIEW FULL DETAILS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>

      <EHRDetailModal
        visible={showDetail}
        record={record}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  // Compact mode styles (for Home screen)
  compactContainer: {
    width: SCREEN_WIDTH - 32,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  compactCard: {
    borderRadius: 16,
    padding: 16,
  },
  compactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  compactIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactTitle: {
    flex: 1,
    marginLeft: 12,
  },
  compactType: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  compactDate: {
    fontSize: 11,
    color: '#FFFFFF90',
    fontWeight: '500',
  },
  compactContent: {
    marginBottom: 12,
  },
  compactPatient: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  compactMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  compactMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  compactMetaText: {
    fontSize: 12,
    color: '#FFFFFF90',
    flexShrink: 1,
  },
  compactFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Full 3D mode styles
  container: {
    width: CARD_WIDTH,
    height: 280,
    marginBottom: 36,
  },
  card: {
    width: '90%',
    height: '100%',
    borderRadius: 24,
    padding: 20,
    position: 'absolute',
    backfaceVisibility: 'hidden',
    borderWidth: 1,
    overflow: 'hidden',
  },
  frontCard: {
    borderColor: '#FFFFFF20',
  },
  backCard: {
    borderColor: '#1E293B',
  },
  frontContent: {
    flex: 1,
  },
  frontHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF20',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  patientSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  patientMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#FFFFFF90',
    fontWeight: '500',
  },
  bloodBadge: {
    backgroundColor: '#00000040',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  bloodText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  detailsSection: {
    gap: 10,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
    flex: 1,
  },
  frontFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  timestamp: {
    fontSize: 12,
    color: '#FFFFFF90',
    fontWeight: '500',
  },
  detailButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF20',
    borderWidth: 1,
    borderColor: '#FFFFFF40',
  },
  detailButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  
  // Back card styles
  backContent: {
    flex: 1,
  },
  backHeader: {
    marginBottom: 20,
  },
  blockchainBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#22D3EE15',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#22D3EE30',
  },
  blockchainText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#22D3EE',
    letterSpacing: 0.5,
  },
  blockchainInfo: {
    flex: 1,
    gap: 16,
  },
  blockchainItem: {
    gap: 6,
  },
  blockchainLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  blockchainValue: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#CBD5E1',
  },
  blockchainGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  gridItem: {
    flex: 1,
    gap: 6,
  },
  blockchainNumber: {
    fontSize: 20,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statusBadge: {
    backgroundColor: '#10B98120',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10B98140',
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
  },
  ehrId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  backFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#22D3EE15',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#22D3EE30',
  },
  syncText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#22D3EE',
    letterSpacing: 0.5,
  },
  viewDetailsButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#4072c2',
  },
  viewDetailsText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  idBadge: {
    backgroundColor: '#FFFFFF20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  idText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});

export default EHRCard3D;