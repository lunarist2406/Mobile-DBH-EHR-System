import { PatientDashboardData } from "@/types/patient/patient";

export const MOCK_PATIENT_DASHBOARD: PatientDashboardData = {
  masterRecord: {
    ehr_id: '8a2b-c4d5-e6f7-g8h9',
    patient: {
      patient_id: 'p-9901',
      full_name: 'Jane Elizabeth Doe',
      dob: '1988-05-12',
      gender: 'Female',
      blood_type: 'O-',
    },
    doctor: {
      doctor_id: 'd-7721',
      full_name: 'Dr. Johnathan Smith',
      specialty: 'Cardiology',
      license_number: 'LIC-MD-102294',
    },
    hospital: {
      hospital_id: 'h-4401',
      name: 'Metropolitan Medical Center',
      license_number: 'HOSP-8821',
    },
    report_type: 'VITAL_SIGNS',
    current_version: 7,
    file_hash: 'sha256:xxxx',
    blockchain_tx_hash: '0xabc123',
    block_number: 19822455,
    created_at: '2024-10-24T09:12:00Z',
    integrity_status: 'PASS',
    metadata: { hr: '74', bp: '118/75' },
  },

  insights: [
    { id: 'billing', label: 'Billing', value: '$45.00', status: 'DUE' },
    { id: 'consent', label: 'Consents', value: '03', status: 'ACTIVE' },
  ],

  ledger: [
    {
      id: 'l1',
      date: '22 Oct',
      title: 'Consultation Hash',
      description: 'Metropolitan Health appended v7 node.',
      type: 'VISIT',
    },
    {
      id: 'l2',
      date: '15 Oct',
      title: 'Diagnostic Payload',
      description: 'Lab SHA-256 verification complete.',
      type: 'LAB',
    },
  ],
};
