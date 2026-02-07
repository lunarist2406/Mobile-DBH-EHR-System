import { mapEHRAccessLogToUI } from '@/mapper/ehr-access-log.mapper';
import { ConsentRequest } from '@/types/types';
import { EHRAccessLog } from '../../types/doctor/ehr-access-log.type';

const RAW_ACCESS_LOGS: EHRAccessLog[] = [
  {
    access_id: 'log-1',
    ehr_id: 'ehr-001',
    version: 3,
    accessed_by: 'user-001',
    access_action: 'VIEW',
    consent_id: null,
    ip_address: '192.168.1.45',
    verify_status: 'PASS',
    accessed_at: '2026-02-05T09:30:00Z',
  },
];

export const ACCESS_LOGS_UI = RAW_ACCESS_LOGS.map(log =>
  mapEHRAccessLogToUI(log, {
    accessedByName: 'Dr. John Smith',
    reportType: 'LAB',
  })
);

export const CONSENTS: ConsentRequest[] = [
  {
    id: 'consent-1',
    from: 'patient:jane-doe',
    recordType: 'LAB',
    status: 'pending',
  },
];
