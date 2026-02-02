import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

import OTPForm from './components/OTPForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';

import { AuthStep } from '@/types/types';

export default function AuthView() {
  const [step, setStep] = useState<AuthStep>('LOGIN');
  const [email, setEmail] = useState('');

  const handleLoginSuccess = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {step === 'LOGIN' && (
        <LoginForm
          onForgot={() => setStep('FORGOT_PASSWORD')}
          onRegister={() => setStep('REGISTER')}
          onSuccess={handleLoginSuccess}
        />
      )}

      {step === 'REGISTER' && (
        <RegisterForm
          onOtp={(mail) => {
            setEmail(mail);
            setStep('OTP');
          }}
          onBack={() => setStep('LOGIN')}
        />
      )}

      {step === 'FORGOT_PASSWORD' && (
        <ForgotPasswordForm
          onOtp={(mail) => {
            setEmail(mail);
            setStep('OTP');
          }}
          onBack={() => setStep('LOGIN')}
        />
      )}

      {step === 'OTP' && (
        <OTPForm
          email={email}
          onVerified={handleLoginSuccess}
          onBack={() => setStep('LOGIN')}
        />
      )}
    </View>
  );
}
