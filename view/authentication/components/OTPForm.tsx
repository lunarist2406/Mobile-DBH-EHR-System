import { 
  Pressable, 
  Text, 
  TextInput, 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  Animated,
  StyleSheet 
} from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, RefreshCw, CheckCircle2, Mail, AlertCircle } from 'lucide-react-native';

interface Props {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

export default function OTPForm({ email, onVerified, onBack }: Props) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.spring(fadeAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-focus first input
    setTimeout(() => inputRefs.current[0]?.focus(), 400);
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [timeLeft]);

  // Pulse animation for timer when low
  useEffect(() => {
    if (timeLeft > 0 && timeLeft <= 10) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [timeLeft]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
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
    setTimeLeft(60);
    setIsResendEnabled(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        {/* Back Button */}
        <Animated.View style={[styles.backButtonContainer, { opacity: fadeAnim }]}>
          <Pressable 
            onPress={onBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed
            ]}
          >
            <ChevronLeft size={22} color="#3A8AFF" strokeWidth={2.5} />
          </Pressable>
        </Animated.View>

        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Animated.View 
              style={[
                styles.iconContainer,
                {
                  transform: [{
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    })
                  }]
                }
              ]}
            >
              <Mail size={32} color="#3A8AFF" />
            </Animated.View>
            
            <Text style={styles.title}>
              Enter Verification Code
            </Text>
            
            <Text style={styles.subtitle}>
              We've sent a 6-digit code to
            </Text>
            
            <Text style={styles.emailText}>
              {email}
            </Text>
          </View>

          {/* OTP Input Section */}
          <View style={styles.otpSection}>
            <Text style={styles.otpLabel}>Enter 6-digit code</Text>
            <View style={styles.otpContainer}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.otpInputWrapper,
                    {
                      transform: [{
                        scale: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1],
                        })
                      }]
                    }
                  ]}
                >
                  <TextInput
                    ref={ref => {
                      if (ref) inputRefs.current[index] = ref;
                    }}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={otp[index]}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    style={[
                      styles.otpInput,
                      otp[index] && styles.otpInputFilled,
                    ]}
                  />
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Timer Section */}
          <Animated.View 
            style={[
              styles.timerContainer,
              timeLeft <= 10 && styles.timerContainerWarning,
              {
                transform: [{ scale: timeLeft <= 10 ? pulseAnim : 1 }],
              },
            ]}
          >
            <View style={styles.timerContent}>
              <View style={[
                styles.timerIndicator,
                timeLeft <= 10 ? styles.timerIndicatorWarning : styles.timerIndicatorNormal
              ]} />
              <Text style={[
                styles.timerText,
                timeLeft <= 10 && styles.timerTextWarning
              ]}>
                {formatTime(timeLeft)}
              </Text>
            </View>
            <Text style={styles.timerLabel}>
              {timeLeft <= 10 ? 'Time running out!' : 'Time remaining'}
            </Text>
          </Animated.View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            {isResendEnabled ? (
              <Pressable 
                onPress={handleResend}
                style={({ pressed }) => [
                  styles.resendButton,
                  pressed && styles.resendButtonPressed
                ]}
              >
                <RefreshCw size={20} color="#3A8AFF" />
                <Text style={styles.resendButtonText}>
                  Resend Code
                </Text>
              </Pressable>
            ) : (
              <Pressable 
                style={({ pressed }) => [
                  styles.verifyButton,
                  isComplete && styles.verifyButtonActive,
                  pressed && isComplete && styles.verifyButtonPressed
                ]}
                disabled={!isComplete}
                onPress={onVerified}
              >
                {isComplete && (
                  <CheckCircle2 size={20} color="#FFFFFF" style={styles.verifyIcon} />
                )}
                <Text style={[
                  styles.verifyButtonText,
                  isComplete && styles.verifyButtonTextActive
                ]}>
                  Verify & Continue
                </Text>
              </Pressable>
            )}
          </View>

          {/* Help Text */}
          <View style={styles.helpContainer}>
            <AlertCircle size={16} color="#64748B" />
            <Text style={styles.helpText}>
              Didn't receive the code? Check spam folder or request a new code in{' '}
              <Text style={styles.helpHighlight}>{formatTime(timeLeft)}</Text>
            </Text>
          </View>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 24,
  },
  backButtonContainer: {
    marginBottom: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  backButtonPressed: {
    backgroundColor: '#F1F5F9',
    transform: [{ scale: 0.95 }],
  },
  contentContainer: {
    flex: 1,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 72,
    height: 72,
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#DBEAFE',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3A8AFF',
    textAlign: 'center',
  },
  otpSection: {
    marginBottom: 32,
  },
  otpLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 16,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  otpInputWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
  otpInput: {
    width: '100%',
    aspectRatio: 0.9,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  otpInputFilled: {
    borderColor: '#3A8AFF',
    backgroundColor: '#F8FAFC',
    shadowColor: '#3A8AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  timerContainerWarning: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  timerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timerIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  timerIndicatorNormal: {
    backgroundColor: '#3A8AFF',
  },
  timerIndicatorWarning: {
    backgroundColor: '#EF4444',
  },
  timerText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3A8AFF',
    letterSpacing: 2,
  },
  timerTextWarning: {
    color: '#EF4444',
  },
  timerLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  actionsContainer: {
    marginBottom: 24,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
  },
  verifyButtonActive: {
    backgroundColor: '#3A8AFF',
    shadowColor: '#3A8AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  verifyButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  verifyIcon: {
    marginRight: 8,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94A3B8',
  },
  verifyButtonTextActive: {
    color: '#FFFFFF',
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3A8AFF',
  },
  resendButtonPressed: {
    backgroundColor: '#F8FAFC',
    transform: [{ scale: 0.98 }],
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3A8AFF',
    marginLeft: 8,
  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  helpText: {
    flex: 1,
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
    marginLeft: 12,
  },
  helpHighlight: {
    color: '#3A8AFF',
    fontWeight: '600',
  },
});