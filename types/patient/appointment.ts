export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
export type EncounterStatus = 'admitted' | 'in-progress' | 'completed' | 'discharged' | 'cancelled';

export interface Appointment {
  appointment_id: string;
  patient_id: string;
  doctor_id: string;
  hospital_id: string;
  scheduled_at: string;
  status: AppointmentStatus;
  notes: string | null;
  created_at: string;
  doctor_name?: string;
  hospital_name?: string;
  specialty?: string;
  phone?: string;
  email?: string;
  estimated_duration?: number;
  appointment_type?: 'regular' | 'followup' | 'emergency';
  symptoms?: string[];
  documents?: string[];
}

export interface Encounter {
  encounter_id: string;
  patient_id: string;
  doctor_id: string;
  appointment_id: string | null;
  hospital_id: string;
  status: EncounterStatus;
  reason_for_visit: string;
  diagnosis: string | null;
  admitted_at: string;
  discharged_at: string | null;
  created_at: string;
  doctor_name?: string;
  hospital_name?: string;
  appointment_date?: string;
}

export interface Doctor {
  doctor_id: string;
  user_id: string;
  full_name: string;
  license_number: string;
  qualifications: string[];
  years_of_experience: number;
  biography: string | null;
  avatar_url: string | null;
  specialties: string[];
  average_rating: number;
  review_count: number;
  languages: string[];
  consultation_fee: number | null;
  available_hours: any[];
  hospitals: any[];
  created_at: string;
  updated_at: string;
}

export interface Hospital {
  hospital_id: string;
  name: string;
  address: string;
  license_number: string;
  status: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  hospital_type: 'PUBLIC' | 'PRIVATE' | 'SPECIALIZED';
  level: 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3';
  province: string;
  district: string;
  ward: string | null;
  latitude: number | null;
  longitude: number | null;
  specialties: string[];
  facilities: string[];
  description: string | null;
  image_url: string | null;
  operating_hours: Record<string, any>;
  average_rating: number;
  review_count: number;
  distance: number | null;
  created_at: string;
  updated_at: string;
}