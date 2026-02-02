import { Pressable, Text, TextInput, View, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { useOtpTimer } from '../hook/useOtpTimer';
import { ChevronLeft, RefreshCw, CheckCircle2, Mail } from 'lucide-react-native';

interface Props {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

export default function OTPForm({ email, onVerified, onBack }: Props) {
  const { time, reset } = useOtpTimer(60);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-focus first input
    setTimeout(() => inputRefs.current[0]?.focus(), 300);
  }, []);

  // Pulse animation for timer
  useEffect(() => {
    if (time > 0 && time <= 10) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [time]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // If all filled, animate
    if (newOtp.every(digit => digit !== '')) {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  };

  const handleResend = () => {
    reset();
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    
    // Reset animation
    Animated.spring(slideAnim, {
      toValue: 0,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={{ 
        flex: 1, 
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 24,
        backgroundColor: '#FFFFFF',
      }}>
        {/* Back Button */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Pressable 
            onPress={onBack}
            style={({ pressed }) => [
              {
                marginBottom: 24,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F3F4F6',
                borderRadius: 12,
              },
              pressed && { opacity: 0.7, backgroundColor: '#E5E7EB' }
            ]}
          >
            <ChevronLeft size={20} color="#000D28" strokeWidth={2.5} />
          </Pressable>
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Header */}
          <View style={{ marginBottom: 40 }}>
            <View style={{
              width: 64,
              height: 64,
              backgroundColor: '#F3F7FF',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
              borderWidth: 2,
              borderColor: '#3A8AFF',
            }}>
              <Mail size={32} color="#3A8AFF" strokeWidth={2} />
            </View>

            <Text style={{
              fontSize: 28,
              fontWeight: '800',
              color: '#000D28',
              marginBottom: 12,
              letterSpacing: -0.5,
            }}>
              Verify OTP
            </Text>
            <Text style={{
              fontSize: 15,
              color: '#6B7280',
              lineHeight: 22,
            }}>
              We've sent a 6-digit code to{'\n'}
              <Text style={{ fontWeight: '600', color: '#3A8AFF' }}>{email}</Text>
            </Text>
          </View>

          {/* OTP Input */}
          <Animated.View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            marginBottom: 32,
            transform: [{ translateX: shakeAnim }],
          }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Animated.View
                key={i}
                style={{
                  transform: [{
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    })
                  }]
                }}
              >
                <TextInput
                  ref={ref => {
                    if (ref) inputRefs.current[i] = ref;
                  }}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={otp[i]}
                  onChangeText={(text) => handleOtpChange(text, i)}
                  onKeyPress={(e) => handleKeyPress(e, i)}
                  style={{
                    width: 52,
                    height: 60,
                    borderWidth: 2,
                    borderColor: otp[i] ? '#3A8AFF' : '#E5E7EB',
                    backgroundColor: otp[i] ? '#F3F7FF' : '#FAFAFA',
                    borderRadius: 14,
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: '700',
                    color: '#000D28',
                    shadowColor: otp[i] ? '#3A8AFF' : 'transparent',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: otp[i] ? 2 : 0,
                  }}
                />
              </Animated.View>
            ))}
          </Animated.View>

          {/* Timer Display */}
          <Animated.View style={{ 
            alignItems: 'center', 
            marginBottom: 32,
            paddingVertical: 20,
            backgroundColor: time <= 10 ? '#FEF2F2' : '#F9FAFB',
            borderRadius: 16,
            borderWidth: 2,
            borderColor: time <= 10 ? '#FEE2E2' : '#F3F4F6',
            transform: [{ scale: time <= 10 ? pulseAnim : 1 }],
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: time <= 10 ? '#EF4444' : '#3A8AFF',
                marginRight: 8,
              }} />
              <Text style={{ 
                fontSize: 36,
                fontWeight: '800',
                color: time <= 10 ? '#EF4444' : '#3A8AFF',
                letterSpacing: 3,
              }}>
                00:{String(time).padStart(2, '0')}
              </Text>
            </View>
            <Text style={{ 
              fontSize: 13, 
              color: '#6B7280',
              fontWeight: '600',
            }}>
              {time <= 10 ? 'Hurry up!' : 'Time remaining'}
            </Text>
          </Animated.View>

          {/* Action Buttons */}
          {time === 0 ? (
            <Pressable 
              onPress={handleResend}
              style={({ pressed }) => [
                {
                  paddingVertical: 18,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 2,
                  borderColor: '#3A8AFF',
                  borderRadius: 16,
                  marginBottom: 16,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                pressed && { opacity: 0.7, backgroundColor: '#F3F7FF' }
              ]}
            >
              <RefreshCw size={20} color="#3A8AFF" strokeWidth={2.5} />
              <Text style={{ 
                color: '#3A8AFF', 
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '700',
                marginLeft: 8,
              }}>
                Resend OTP Code
              </Text>
            </Pressable>
          ) : (
            <Pressable 
              style={({ pressed }) => [
                {
                  backgroundColor: isComplete ? '#3A8AFF' : '#E5E7EB',
                  paddingVertical: 18,
                  borderRadius: 16,
                  marginBottom: 16,
                  shadowColor: isComplete ? '#3A8AFF' : 'transparent',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: isComplete ? 6 : 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                pressed && isComplete && { 
                  opacity: 0.9,
                  transform: [{ scale: 0.98 }]
                }
              ]}
              disabled={!isComplete}
              onPress={onVerified}
            >
              {isComplete && (
                <CheckCircle2 size={20} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 8 }} />
              )}
              <Text style={{ 
                color: isComplete ? '#FFFFFF' : '#9CA3AF',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '700',
                letterSpacing: 0.5,
              }}>
                Verify & Continue
              </Text>
            </Pressable>
          )}

          {/* Help Text */}
          <View style={{
            backgroundColor: '#F3F7FF',
            padding: 16,
            borderRadius: 12,
            borderLeftWidth: 4,
            borderLeftColor: '#3A8AFF',
          }}>
            <Text style={{
              textAlign: 'center',
              color: '#374151',
              fontSize: 13,
              lineHeight: 20,
            }}>
              Didn't receive the code?{' '}
              <Text style={{ color: '#3A8AFF', fontWeight: '600' }}>
                Check spam folder
              </Text>
              {' or wait for resend option'}
            </Text>
          </View>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}