import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import ForgotPasswordForm from './components/ForgotPasswordForm';
import LoginForm from './components/LoginForm';
import OTPForm from './components/OTPForm';
import RegisterForm from './components/RegisterForm';

import { AuthStep, RoleName } from '@/types/types';

export default function AuthView() {
  const [step, setStep] = useState<AuthStep>('LOGIN');
  const [email, setEmail] = useState('');

  const handleLoginSuccess = (role: RoleName) => {
    if (role === 'PATIENT') {
      router.replace('patient' as any);   // đúng với app/(patient)/index.tsx
    } else {
      router.replace('doctor' as any);    // đúng với app/(doctor)/index.tsx
    }
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
          onVerified={() => handleLoginSuccess('PATIENT')}
          onBack={() => setStep('LOGIN')}
        />
      )}
    </View>
  );
}
