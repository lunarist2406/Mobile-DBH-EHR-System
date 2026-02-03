import { Role } from '@/types/types';

interface MockUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

const mockUsers: MockUser[] = [
  {
    id: 'user-patient-001',
    fullName: 'Nguyen Van Patient',
    email: 'patient@test.com',
    password: '123456',
    role: 'PATIENT',
  },
  {
    id: 'user-doctor-001',
    fullName: 'Tran Thi Doctor',
    email: 'doctor@test.com',
    password: '123456',
    role: 'DOCTOR',
  },
];

export function mockLogin(email: string, password: string): MockUser {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error('Invalid email or password');
  }

  return user;
}
