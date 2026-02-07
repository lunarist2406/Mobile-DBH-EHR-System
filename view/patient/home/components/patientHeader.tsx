import { Bell, Search } from 'lucide-react-native';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface HeaderProps {
  notificationCount?: number;
  onNotificationPress?: () => void;
  onSearchPress?: () => void;
  onLogoPress?: () => void;
}
export const PatientHeader: React.FC<HeaderProps> = ({
  notificationCount = 1,
  onNotificationPress,
  onSearchPress,
  onLogoPress,
}) => {
  // Animation values
  const notificationScale = useSharedValue(1);
  const searchScale = useSharedValue(1);
  const logoScale = useSharedValue(1);

  const notificationAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: notificationScale.value }],
  }));

  const searchAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchScale.value }],
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const handlePressIn = (scale: any) => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = (scale: any) => {
    scale.value = withSpring(1);
  };

  // Sử dụng logo tùy theo platform cho hiệu quả tốt nhất
  const getLogoSource = () => {
    if (Platform.OS === 'android') {
      // Sử dụng logo 512x512 cho Android, chất lượng cao
      return require('../../../../assets/images/android-chrome-512x512.png');
    } else {
      // Sử dụng logo 192x192 cho iOS
      return require('../../../../assets/images/apple-touch-icon.png');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <AnimatedTouchableOpacity
        style={[styles.logoContainer, logoAnimatedStyle]}
        onPressIn={() => handlePressIn(logoScale)}
        onPressOut={() => handlePressOut(logoScale)}
        onPress={onLogoPress}
        activeOpacity={0.8}
      >
        <View style={styles.logoIcon}>
          <Image
            source={getLogoSource()}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.logoTextContainer}>
          <Text style={styles.logoTitle}>Decentral EHR</Text>
          <Text style={styles.logoSubtitle}>Hồ Sơ Y Tế Phi Tập Trung </Text>
        </View>
      </AnimatedTouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <AnimatedTouchableOpacity
          style={[styles.actionButton, notificationAnimatedStyle]}
          onPressIn={() => handlePressIn(notificationScale)}
          onPressOut={() => handlePressOut(notificationScale)}
          onPress={onNotificationPress}
          activeOpacity={0.7}
        >
          <Bell size={22} color="#64748B" />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>
                {notificationCount > 9 ? '9+' : notificationCount}
              </Text>
            </View>
          )}
        </AnimatedTouchableOpacity>

        <AnimatedTouchableOpacity
          style={[styles.actionButton, searchAnimatedStyle]}
          onPressIn={() => handlePressIn(searchScale)}
          onPressOut={() => handlePressOut(searchScale)}
          onPress={onSearchPress}
          activeOpacity={0.7}
        >
          <Search size={22} color="#64748B" />
        </AnimatedTouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 12 : 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  logoIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#EFF6FF',
    shadowColor: '#3A8AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  logoImage: {
    width: 32,
    height: 32,
  },
  
  logoTextContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  
  logoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F2A5F', // Navy Blue
    letterSpacing: -0.3,
  },
  
  logoSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF4D4D',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  
  notificationText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    paddingHorizontal: 4,
  },
});

export default PatientHeader;