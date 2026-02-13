import { colors } from '@/styles/colors';
import { ChevronLeft, Archive } from 'lucide-react-native';
import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 🔧 Đặt icon vào: assets/icons/
const AI_ICON = Platform.OS === 'ios'
  ? require('../../../assets/images/ai_apple-touch-icon.png')
  : require('../../../assets/images/ai_android-chrome-192x192.png');

interface AIHeaderProps {
  title: string;
  onBack?: () => void;
  onArchivePress?: () => void;      // 👈 nút lưu trữ
}

const AIHeader: React.FC<AIHeaderProps> = ({ title, onBack, onArchivePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ChevronLeft size={20} color={colors.textDark} strokeWidth={2} />
          </TouchableOpacity>
        )}
        <View style={styles.iconWrapper}>
          <Image source={AI_ICON} style={styles.iconImage} resizeMode="contain" />
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Trực tuyến</Text>
          </View>
        </View>
      </View>

      {/* Nút lưu trữ tin nhắn */}
      <TouchableOpacity style={styles.archiveBtn} onPress={onArchivePress} activeOpacity={0.75}>
        <Archive size={18} color={colors.primaryBlue} strokeWidth={1.8} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 13,
    backgroundColor: colors.background,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  backButton: {
    marginRight: 4,
    width: 32, height: 32,
    borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  iconWrapper: {
    width: 40, height: 40, borderRadius: 13,
    backgroundColor: colors.lightBlue,
    borderWidth: 1, borderColor: 'rgba(0,122,255,0.22)',
    alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: colors.primaryBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12, shadowRadius: 6, elevation: 2,
  },
  iconImage: {
    width: 28, height: 28,
    borderRadius: 6,
  },
  titleBlock: { gap: 2 },
  title: { fontSize: 16, fontWeight: '700', color: colors.textDark, letterSpacing: -0.2 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#34C759' },
  statusText: { fontSize: 11, color: '#8E8E93', fontWeight: '400', letterSpacing: 0.3 },
  archiveBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.lightBlue,
    borderWidth: 1, borderColor: 'rgba(0,122,255,0.22)',
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  },
  archiveText: { fontSize: 13, fontWeight: '500', color: colors.primaryBlue },
});

export default AIHeader;