export type Role = 'PATIENT' | 'DOCTOR';

export type AuthStep =
  | 'ROLE_SELECTION'
  | 'LOGIN'
  | 'REGISTER'
  | 'FORGOT_PASSWORD'
  | 'OTP';
