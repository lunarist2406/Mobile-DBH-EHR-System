export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
export type EncounterStatus = 'admitted' | 'in-progress' | 'completed' | 'discharged';

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
  id: string;
  name: string;
  specialty: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
}