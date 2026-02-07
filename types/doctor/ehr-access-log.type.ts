export type EHRAccessAction = 'VIEW' | 'DOWNLOAD' | 'UPDATE';
export type VerifyStatus = 'PASS' | 'FAIL';

export interface EHRAccessLog {
  access_id: string;
  ehr_id: string;
  version: number;
  accessed_by: string;
  access_action: EHRAccessAction;
  consent_id?: string | null;
  ip_address: string;
  verify_status: VerifyStatus;
  accessed_at: string;
}
