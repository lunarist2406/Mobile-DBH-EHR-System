import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import AuthHeader from './AuthHeader';

interface Props {
  onOtp: (email: string) => void;
  onBack: () => void;
}

export default function RegisterForm({ onOtp, onBack }: Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = fullName && email && phone && password.length >= 6;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        style={{ flex: 1, backgroundColor: '#FFFFFF' }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: Platform.OS === 'ios' ? 60 : 40,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <AuthHeader
          title="Create Account"
          subtitle="Register your decentralized medical identity"
          onBack={onBack}
        />

        <View style={{ marginTop: 8 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={labelStyle}>Full Name</Text>
            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
              value={fullName}
              onChangeText={setFullName}
              style={inputStyle}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={labelStyle}>Email Address</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={inputStyle}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={labelStyle}>Phone Number</Text>
            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              style={inputStyle}
            />
          </View>

          <View style={{ marginBottom: 8 }}>
            <Text style={labelStyle}>Password</Text>
            <TextInput
              placeholder="Create a strong password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={inputStyle}
            />
            {password.length > 0 && password.length < 6 && (
              <Text style={{
                fontSize: 12,
                color: '#EF4444',
                marginTop: 6,
              }}>
                Password must be at least 6 characters
              </Text>
            )}
          </View>

          <View style={{
            backgroundColor: '#F3F7FF',
            padding: 16,
            borderRadius: 12,
            marginVertical: 24,
            borderLeftWidth: 4,
            borderLeftColor: '#3A8AFF',
          }}>
            <Text style={{
              fontSize: 13,
              color: '#374151',
              lineHeight: 20,
            }}>
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              buttonStyle,
              !canSubmit && { opacity: 0.5, backgroundColor: '#E5E7EB' },
              pressed && canSubmit && { opacity: 0.8 }
            ]}
            disabled={!canSubmit}
            onPress={() => onOtp(email)}
          >
            <Text style={[
              buttonTextStyle,
              !canSubmit && { color: '#9CA3AF' }
            ]}>
              Generate OTP
            </Text>
          </Pressable>

          <View style={{ 
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 24,
          }}>
            <Text style={{ color: '#6B7280', fontSize: 14 }}>
              Already have an account?{' '}
            </Text>
            <Pressable onPress={onBack}>
              <Text style={{ 
                color: '#3A8AFF',
                fontSize: 14,
                fontWeight: '700',
              }}>
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
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

const buttonStyle = {
  backgroundColor: '#3A8AFF',
  paddingVertical: 18,
  borderRadius: 16,
  shadowColor: '#3A8AFF',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 4,
};

const buttonTextStyle = {
  color: '#FFFFFF',
  textAlign: 'center' as const,
  fontSize: 16,
  fontWeight: '700' as const,
  letterSpacing: 0.5,
};