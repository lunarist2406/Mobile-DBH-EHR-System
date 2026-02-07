import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Bell, Search, Shield } from 'lucide-react-native';
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
          <Shield size={24} color="#3A8AFF" fill="#3A8AFF" />
        </View>
        <View style={styles.logoTextContainer}>
          <Text style={styles.logoTitle}>EHR</Text>
          <Text style={styles.logoSubtitle}>Systems</Text>
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
  },
  
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  
  logoTextContainer: {
    flexDirection: 'column',
  },
  
  logoTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.5,
  },
  
  logoSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: 0.5,
    marginTop: -2,
  },
  
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
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
  },
  
  notificationText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    paddingHorizontal: 4,
  },
});

export default PatientHeader;