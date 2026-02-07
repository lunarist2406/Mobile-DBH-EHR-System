export type RoleName =
  | 'ADMIN'
  | 'DOCTOR'
  | 'PATIENT'
  | 'HOSPITAL'
  | 'AUDITOR';

export interface Role {
  role_id: string;
  role_name: RoleName;
}
export type AuthStep =
  | 'ROLE_SELECTION'
  | 'LOGIN'
  | 'REGISTER'
  | 'FORGOT_PASSWORD'
  | 'OTP';


export type ReportType = 'LAB' | 'PRESCRIPTION' | 'VITAL_SIGNS' | 'IMAGING';

export interface PatientEntity {
  patient_id: string;
  full_name: string;
  dob: string;
  gender: string;
  blood_type: string;
}

export interface DoctorEntity {
  doctor_id: string;
  full_name: string;
  specialty: string;
  license_number: string;
}

export interface HospitalEntity {
  hospital_id: string;
  name: string;
  license_number: string;
}

export interface EHRRecord {
  ehr_id: string;
  patient: PatientEntity;
  doctor: DoctorEntity;
  hospital: HospitalEntity;
  report_type: ReportType;
  current_version: number;
  file_hash: string;
  blockchain_tx_hash: string;
  block_number: number;
  created_at: string;
  integrity_status: 'PASS' | 'FAIL';
  metadata: Record<string, any>;
}

export interface ConsentRequest {
  id: string;
  from: string;
  recordType: string;
  status: 'pending' | 'approved' | 'denied';
}
