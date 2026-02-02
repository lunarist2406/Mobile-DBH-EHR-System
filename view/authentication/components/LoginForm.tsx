import { Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';

interface Props {
  onForgot: () => void;
  onRegister: () => void;
  onSuccess: () => void;
}

export default function LoginForm({ onForgot, onRegister, onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(logoRotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const logoRotateInterpolate = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const canSubmit = email && password;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={{ 
        flex: 1, 
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'ios' ? 70 : 50,
        paddingBottom: 24,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
      }}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Logo Header with Animation */}
          <View style={{ marginBottom: 48, alignItems: 'center' }}>
            <Animated.View
              style={{
                width: 80,
                height: 80,
                backgroundColor: '#F3F7FF',
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                borderWidth: 3,
                borderColor: '#3A8AFF',
                transform: [
                  { scale: logoScale },
                  { rotate: logoRotateInterpolate }
                ],
                shadowColor: '#3A8AFF',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <ShieldCheck size={40} color="#3A8AFF" strokeWidth={2.5} />
            </Animated.View>
            
            <Text style={{
              fontSize: 32,
              fontWeight: '900',
              color: '#000D28',
              marginBottom: 8,
              letterSpacing: -0.5,
            }}>
              Welcome Back
            </Text>
            <Text style={{
              fontSize: 15,
              color: '#6B7280',
              textAlign: 'center',
            }}>
              Sign in to access your health records
            </Text>
          </View>

          {/* Email Input with Icon */}
          <View style={{ marginBottom: 20 }}>
            <Text style={labelStyle}>Email</Text>
            <View style={{ position: 'relative' }}>
              <View style={{
                position: 'absolute',
                left: 16,
                top: 18,
                zIndex: 1,
              }}>
                <Mail size={20} color={emailFocused ? '#3A8AFF' : '#9CA3AF'} />
              </View>
              <TextInput 
                placeholder="Enter your email" 
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                style={[
                  inputStyle,
                  { paddingLeft: 48 },
                  emailFocused && focusedInputStyle
                ]} 
              />
            </View>
          </View>

          {/* Password Input with Icon and Toggle */}
          <View style={{ marginBottom: 12 }}>
            <Text style={labelStyle}>Password</Text>
            <View style={{ position: 'relative' }}>
              <View style={{
                position: 'absolute',
                left: 16,
                top: 18,
                zIndex: 1,
              }}>
                <Lock size={20} color={passwordFocused ? '#3A8AFF' : '#9CA3AF'} />
              </View>
              <TextInput 
                placeholder="Enter your password" 
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                style={[
                  inputStyle,
                  { paddingLeft: 48, paddingRight: 48 },
                  passwordFocused && focusedInputStyle
                ]} 
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 16,
                  top: 18,
                  zIndex: 1,
                }}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#9CA3AF" />
                ) : (
                  <Eye size={20} color="#9CA3AF" />
                )}
              </Pressable>
            </View>
          </View>

          {/* Forgot Password */}
          <Pressable onPress={onForgot} style={{ marginBottom: 32 }}>
            <Text style={{ 
              textAlign: 'right', 
              color: '#3A8AFF',
              fontSize: 14,
              fontWeight: '600',
            }}>
              Forgot password?
            </Text>
          </Pressable>

          {/* Sign In Button */}
          <Pressable 
            style={({ pressed }) => [
              btnStyle,
              !canSubmit && { opacity: 0.5, backgroundColor: '#E5E7EB' },
              pressed && canSubmit && { 
                opacity: 0.9,
                transform: [{ scale: 0.98 }]
              }
            ]}
            disabled={!canSubmit}
            onPress={onSuccess}
          >
            <Text style={[
              btnTextStyle,
              !canSubmit && { color: '#9CA3AF' }
            ]}>
              Sign In
            </Text>
          </Pressable>
        </Animated.View>

        {/* Footer */}
        <Animated.View 
          style={{ 
            alignItems: 'center',
            opacity: fadeAnim,
          }}
        >
          <View style={{
            height: 1,
            width: '100%',
            backgroundColor: '#E5E7EB',
            marginBottom: 24,
          }} />
          <Text style={{ color: '#6B7280', marginBottom: 12, fontSize: 14 }}>
            Don't have an account?
          </Text>
          <Pressable 
            onPress={onRegister}
            style={({ pressed }) => [
              {
                paddingVertical: 14,
                paddingHorizontal: 32,
                borderWidth: 2,
                borderColor: '#3A8AFF',
                borderRadius: 16,
              },
              pressed && { opacity: 0.7, backgroundColor: '#F3F7FF' }
            ]}
          >
            <Text style={{ 
              color: '#3A8AFF',
              fontSize: 16,
              fontWeight: '700',
            }}>
              Create Account
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const labelStyle = {
  fontSize: 14,
  fontWeight: '600' as const,
  color: '#374151',
  marginBottom: 8,
};

const inputStyle = {
  borderWidth: 1.5,
  borderColor: '#E5E7EB',
  borderRadius: 16,
  padding: 16,
  fontSize: 16,
  color: '#000D28',
  backgroundColor: '#FAFAFA',
};

const focusedInputStyle = {
  borderColor: '#3A8AFF',
  backgroundColor: '#F3F7FF',
  shadowColor: '#3A8AFF',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 2,
};

const btnStyle = {
  backgroundColor: '#3A8AFF',
  paddingVertical: 18,
  borderRadius: 16,
  shadowColor: '#3A8AFF',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.3,
  shadowRadius: 12,
  elevation: 6,
};

const btnTextStyle = { 
  color: '#FFFFFF', 
  textAlign: 'center' as const, 
  fontSize: 16,
  fontWeight: '700' as const,
  letterSpacing: 0.5,
};