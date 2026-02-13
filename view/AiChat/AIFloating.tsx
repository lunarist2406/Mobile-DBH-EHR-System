// components/AIFloatingButton.tsx
import { colors } from '@/styles/colors';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Chiều cao tab bar — khớp với _layout.tsx
const TAB_BAR_HEIGHT = Platform.select({ ios: 84, android: 68 }) ?? 68;

const AIFloatingButton: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
    const AI_ICON = Platform.OS === 'ios'
  ? require('../../assets/images/ai_apple-touch-icon.png')
  : require('../../assets/images/ai_android-chrome-192x192.png');

  // ── Animations ────────────────────────────────────────────────
  const scaleAnim   = useRef(new Animated.Value(0)).current;  // mount pop-in
  const pulseAnim   = useRef(new Animated.Value(1)).current;  // idle pulse ring
  const shimmerAnim = useRef(new Animated.Value(0)).current;  // shimmer loop
  const pressAnim   = useRef(new Animated.Value(1)).current;  // press scale

  // Pop-in on mount
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 160,
      delay: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  // Pulse ring — subtle breathing effect
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.18,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Shimmer sweep
  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.9,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      friction: 4,
      tension: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    // Navigate to AI chat tab
    router.push('patient/aichat' as any);
  };

  // Position above tab bar
  const bottomPosition = TAB_BAR_HEIGHT + 16;

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, 80],
  });

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          bottom: bottomPosition,
          transform: [{ scale: scaleAnim }],
        },
      ]}
      pointerEvents="box-none"
    >
      {/* Pulse ring */}
      <Animated.View
        style={[
          styles.pulseRing,
          { transform: [{ scale: pulseAnim }] },
        ]}
      />

      {/* Main button */}
      <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          {/* Shimmer overlay */}
          <Animated.View
            style={[
              styles.shimmer,
              { transform: [{ translateX: shimmerTranslate }] },
            ]}
          />

          {/* Icon */}
          <View style={styles.iconRow}>
            <Image source={AI_ICON} style={styles.iconImage} resizeMode="contain" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },

  // ── Pulse ring behind button ──
  pulseRing: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(58,138,255,0.15)',
    zIndex: -1,
  },

  // ── Main pill button ──
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingHorizontal: 15,
    borderRadius: 26,
    backgroundColor: colors.primaryBlue,
    overflow: 'hidden',
    // Shadow
    ...Platform.select({
      ios: {
        shadowColor: colors.primaryBlue,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.45,
        shadowRadius: 16,
      },
      android: {
        elevation: 10,
      },
    }),
  },

  // ── Shimmer strip ──
  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 40,
    backgroundColor: 'rgba(255,255,255,0.18)',
    transform: [{ skewX: '-20deg' }],
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  iconImage: {
    width: 20,
    height: 25,
    tintColor: '#FFFFFF',
    borderRadius: 6,
    overflow: 'hidden',
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});

export default AIFloatingButton;