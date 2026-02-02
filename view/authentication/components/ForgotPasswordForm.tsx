import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import AuthHeader from './AuthHeader';

interface Props {
  onOtp: (email: string) => void;
  onBack: () => void;
}

export default function ForgotPasswordForm({ onOtp, onBack }: Props) {
  const [email, setEmail] = useState('');

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
        <AuthHeader
          title="Account Recovery"
          subtitle="Reset access via your registered email"
          onBack={onBack}
        />

        <View style={{ marginTop: 8 }}>
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

        <Pressable
          style={({ pressed }) => [
            buttonStyle,
            !email && { opacity: 0.5 },
            pressed && { opacity: 0.8 }
          ]}
          disabled={!email}
          onPress={() => onOtp(email)}
        >
          <Text style={buttonTextStyle}>Send Recovery Code</Text>
        </Pressable>
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

const buttonStyle = {
  backgroundColor: '#3A8AFF',
  paddingVertical: 18,
  borderRadius: 16,
  marginTop: 32,
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