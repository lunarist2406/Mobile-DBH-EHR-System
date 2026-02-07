import { useState, useRef, useEffect } from 'react';
import { 
  KeyboardAvoidingView, 
  Platform, 
  Pressable, 
  Text, 
  TextInput, 
  View, 
  StyleSheet,
  Animated,
  Alert,
  Dimensions
} from 'react-native';
import AuthHeader from './AuthHeader';
import { Mail, Send, AlertCircle, CheckCircle2 } from 'lucide-react-native';

interface Props {
  onOtp: (email: string) => void;
  onBack: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ForgotPasswordForm({ onOtp, onBack }: Props) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

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
  }, []);

  const handleSubmit = async () => {
    if (!email.trim() || isLoading) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    setIsLoading(true);
    
    // Animation for button press
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      
      // Success animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      // Show success then proceed
      setTimeout(() => {
        onOtp(email);
      }, 800);
      
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to send recovery code. Please try again.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <AuthHeader
          title="Reset Password"
          subtitle="Enter your email to receive a verification code"
          onBack={onBack}
        />

        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Email Input Section */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Mail size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                placeholder="your.email@example.com"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
                style={[
                  styles.input,
                  email && isEmailValid(email) && styles.inputValid,
                  email && !isEmailValid(email) && styles.inputInvalid,
                ]}
                editable={!isLoading && !isSubmitted}
              />
              {email && isEmailValid(email) && (
                <CheckCircle2 size={20} color="#10B981" style={styles.validIcon} />
              )}
              {email && !isEmailValid(email) && (
                <AlertCircle size={20} color="#EF4444" style={styles.invalidIcon} />
              )}
            </View>
            
            {/* Email Validation Messages */}
            {email && !isEmailValid(email) && (
              <View style={styles.validationMessage}>
                <AlertCircle size={14} color="#EF4444" />
                <Text style={styles.validationText}>
                  Please enter a valid email address
                </Text>
              </View>
            )}
            
            {email && isEmailValid(email) && (
              <View style={[styles.validationMessage, styles.validationSuccess]}>
                <CheckCircle2 size={14} color="#10B981" />
                <Text style={[styles.validationText, styles.validationSuccessText]}>
                  Valid email address
                </Text>
              </View>
            )}
          </View>

          {/* Information Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <AlertCircle size={20} color="#3A8AFF" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Important</Text>
              <Text style={styles.infoText}>
                A 6-digit verification code will be sent to your email. 
                This code is valid for 10 minutes.
              </Text>
            </View>
          </View>

          {/* Success State */}
          {isSubmitted && (
            <Animated.View 
              style={[
                styles.successCard,
                { opacity: fadeAnim }
              ]}
            >
              <View style={styles.successIcon}>
                <CheckCircle2 size={32} color="#10B981" />
              </View>
              <Text style={styles.successTitle}>Code Sent!</Text>
              <Text style={styles.successText}>
                Check your inbox at{'\n'}
                <Text style={styles.successEmail}>{email}</Text>
              </Text>
            </Animated.View>
          )}

          {/* Action Button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                (!email.trim() || !isEmailValid(email) || isLoading) && styles.buttonDisabled,
                pressed && styles.buttonPressed,
                isSubmitted && styles.buttonSuccess,
              ]}
              disabled={!email.trim() || !isEmailValid(email) || isLoading || isSubmitted}
              onPress={handleSubmit}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <View style={styles.loadingSpinner} />
                  <Text style={[styles.buttonText, styles.buttonTextLoading]}>
                    Sending Code...
                  </Text>
                </View>
              ) : isSubmitted ? (
                <>
                  <CheckCircle2 size={20} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Code Sent Successfully</Text>
                </>
              ) : (
                <>
                  <Send size={20} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Send Recovery Code</Text>
                </>
              )}
            </Pressable>
          </Animated.View>

          {/* Security Note */}
          <View style={styles.securityNote}>
            <Text style={styles.securityTitle}>Security Note</Text>
            <Text style={styles.securityText}>
              Your email is only used to send the verification code. 
              We respect your privacy and do not share your information.
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
  formContainer: {
    flex: 1,
    marginTop: 24,
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 56,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 48,
    paddingVertical: 16,
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
  },
  inputValid: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  inputInvalid: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  validIcon: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  invalidIcon: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  validationMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  validationSuccess: {
    marginTop: 8,
  },
  validationText: {
    fontSize: 13,
    color: '#EF4444',
    fontWeight: '500',
  },
  validationSuccessText: {
    color: '#10B981',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#3A8AFF',
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#3A8AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#E2E8F0',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonSuccess: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loadingSpinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderTopColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  buttonTextLoading: {
    opacity: 0.9,
  },
  successCard: {
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    color: '#047857',
    textAlign: 'center',
    lineHeight: 20,
  },
  successEmail: {
    fontWeight: '600',
  },
  securityNote: {
    backgroundColor: '#FEFCE8',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FEF08A',
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#713F12',
    marginBottom: 8,
  },
  securityText: {
    fontSize: 13,
    color: '#854D0E',
    lineHeight: 18,
  },
});