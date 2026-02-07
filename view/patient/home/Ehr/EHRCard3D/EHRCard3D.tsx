// components/EHRCard3D.tsx
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
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
} from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 48;

interface EHRRecord {
  id: string;
  report_type: 'LAB' | 'PRESCRIPTION' | 'VITAL_SIGNS' | 'OTHER';
  current_version: number;
  patient: {
    full_name: string;
    dob: string;
    blood_type: string;
  };
  hospital: {
    name: string;
    license_number: string;
  };
  doctor: {
    full_name: string;
    license_number: string;
  };
  created_at: string;
  blockchain_tx_hash: string;
  block_number: number;
  integrity_status: string;
  file_hash: string;
  ehr_id: string;
}

interface Props {
  record: EHRRecord;
  onSyncPress?: () => void;
}

const EHRCard3D: React.FC<Props> = ({ record, onSyncPress }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const rotateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const frontOpacity = rotateY.interpolate({
    inputRange: [0, 90],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const backOpacity = rotateY.interpolate({
    inputRange: [90, 180],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const frontRotate = rotateY.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backRotate = rotateY.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    const toValue = isFlipped ? 0 : 180;
    setIsFlipped(!isFlipped);
    
    Animated.parallel([
      Animated.timing(rotateY, {
        toValue,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.5,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      opacity.setValue(1);
    });
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

  return (
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
            opacity: frontOpacity,
            transform: [
              { rotateY: frontRotate },
              { perspective: 1000 },
            ],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.frontHeader}>
          <View style={styles.verifiedBadge}>
            <ShieldCheck size={14} color="#22D3EE" />
            <Text style={styles.verifiedText}>EHR Protocol V.{record.current_version}</Text>
          </View>
          <View style={styles.typeIcon}>
            {getTypeIcon()}
          </View>
        </View>

        {/* Patient Info */}
        <View style={styles.patientInfo}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Fingerprint size={28} color="#FFFFFF" />
            </View>
            <View style={styles.patientDetails}>
              <Text style={styles.patientName} numberOfLines={1}>
                {record.patient.full_name}
              </Text>
              <View style={styles.patientMeta}>
                <View style={styles.metaRow}>
                  <Calendar size={12} color="#FFFFFF90" />
                  <Text style={styles.metaText}>{record.patient.dob}</Text>
                </View>
                <View style={styles.bloodTypeBadge}>
                  <Text style={styles.bloodTypeText}>Type: {record.patient.blood_type}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Medical Context */}
        <View style={styles.medicalContext}>
          <View style={styles.contextHeader}>
            <View>
              <Text style={styles.contextLabel}>Medical Context</Text>
              <Text style={styles.contextValue}>
                {record.report_type.replace('_', ' ')}
              </Text>
            </View>
            <View style={styles.integrityBadge}>
              <Text style={styles.integrityText}>BLOCK VERIFIED</Text>
            </View>
          </View>
          <View style={styles.hospitalInfo}>
            <MapPin size={14} color="#22D3EE" />
            <Text style={styles.hospitalName} numberOfLines={1}>
              {record.hospital.name}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.frontFooter}>
          <View style={styles.doctorInfo}>
            <View style={styles.doctorIcon}>
              <User size={16} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.doctorLabel}>Physician</Text>
              <Text style={styles.doctorName} numberOfLines={1}>
                {record.doctor.full_name}
              </Text>
            </View>
          </View>
          <View style={styles.timestamp}>
            <Text style={styles.timestampLabel}>Timestamp</Text>
            <Text style={styles.timestampValue}>{record.created_at}</Text>
          </View>
        </View>
      </Animated.View>

      {/* Back Card */}
      <Animated.View
        style={[
          styles.card,
          styles.backCard,
          {
            backgroundColor: '#0A0F1E',
            opacity: backOpacity,
            transform: [
              { rotateY: backRotate },
              { perspective: 1000 },
            ],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.backHeader}>
          <View style={styles.auditHeader}>
            <View style={styles.auditTitle}>
              <Zap size={18} color="#22D3EE" />
              <Text style={styles.auditText}>Audit Ledger Node</Text>
            </View>
            <View style={styles.idBadge}>
              <Text style={styles.idText}>ID: {record.ehr_id.split('-')[0]}</Text>
            </View>
          </View>
        </View>

        {/* Blockchain Info */}
        <View style={styles.blockchainInfo}>
          {/* TXID */}
          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoLabel}>Blockchain TXID</Text>
              <Link size={12} color="#64748B" />
            </View>
            <View style={styles.hashContainer}>
              <Text style={styles.hashText} numberOfLines={1}>
                {record.blockchain_tx_hash}
              </Text>
            </View>
          </View>

          {/* Block Height & Status */}
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.infoLabel}>Block Height</Text>
              <View style={styles.blockHeightContainer}>
                <View style={styles.pulseDot} />
                <Text style={styles.blockHeight}>
                  {record.block_number.toLocaleString()}
                </Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.infoLabel}>Status</Text>
              <View style={styles.statusContainer}>
                <Shield size={14} color="#10B981" />
                <Text style={styles.statusText}>{record.integrity_status}ED</Text>
              </View>
            </View>
          </View>

          {/* Content Hash */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Content Hash (SHA-256)</Text>
            <View style={styles.hashContainer}>
              <Text style={styles.smallHashText} numberOfLines={1}>
                {record.file_hash}
              </Text>
            </View>
          </View>

          {/* Licenses */}
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.infoLabel}>Hosp License</Text>
              <Text style={styles.licenseText}>{record.hospital.license_number}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.infoLabel}>Doc License</Text>
              <Text style={styles.licenseText}>{record.doctor.license_number}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.backFooter}>
          <View style={styles.footerLeft}>
            <Hash size={12} color="#64748B" />
            <Text style={styles.footerText}>Distributed Hash Ledger</Text>
          </View>
          <TouchableOpacity
            style={styles.syncButton}
            onPress={onSyncPress}
            activeOpacity={0.8}
          >
            <Share2 size={12} color="#22D3EE" />
            <Text style={styles.syncButtonText}>SYNC NODE</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Hint */}
      {!isFlipped && (
        <View style={styles.hintContainer}>
          <Info size={12} color="#22D3EE" />
          <Text style={styles.hintText}>Tap to verify audit chain</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 320,
    marginHorizontal: 24,
    marginBottom: 48,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 25,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    padding: 24,
    position: 'absolute',
    backfaceVisibility: 'hidden',
    borderWidth: 1,
    overflow: 'hidden',
  },
  frontCard: {
    borderColor: '#FFFFFF30',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  backCard: {
    borderColor: '#1E293B',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  frontHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF20',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF30',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginLeft: 6,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#00000040',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF20',
  },
  patientInfo: {
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFFFFF20',
    borderWidth: 1,
    borderColor: '#FFFFFF30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  patientDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  patientMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF90',
  },
  bloodTypeBadge: {
    backgroundColor: '#00000040',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bloodTypeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  medicalContext: {
    backgroundColor: '#FFFFFF15',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF20',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  contextHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  contextLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF80',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  contextValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  integrityBadge: {
    backgroundColor: '#10B98140',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#10B98160',
  },
  integrityText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#10B981',
  },
  hospitalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hospitalName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  frontFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  doctorIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#FFFFFF20',
    borderWidth: 1,
    borderColor: '#FFFFFF30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF80',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  doctorName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  timestamp: {
    alignItems: 'flex-end',
  },
  timestampLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF80',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  timestampValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  backHeader: {
    marginBottom: 20,
  },
  auditHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  auditTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  auditText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  idBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  idText: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: '600',
    color: '#22D3EE',
  },
  blockchainInfo: {
    flex: 1,
    gap: 16,
  },
  infoSection: {
    gap: 8,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  hashContainer: {
    backgroundColor: '#1E293B90',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  hashText: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: '600',
    color: '#22D3EE',
  },
  smallHashText: {
    fontSize: 9,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: '600',
    color: '#64748B',
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  gridItem: {
    flex: 1,
    gap: 8,
  },
  blockHeightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1E293B90',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22D3EE',
    ...Platform.select({
      ios: {
        shadowColor: '#22D3EE',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  blockHeight: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1E293B90',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#10B981',
    textTransform: 'uppercase',
  },
  licenseText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#CBD5E1',
    marginTop: 4,
  },
  backFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    marginTop: 'auto',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#22D3EE15',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#22D3EE30',
  },
  syncButtonText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#22D3EE',
  },
  hintContainer: {
    position: 'absolute',
    bottom: -30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  hintText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
});

export default EHRCard3D;