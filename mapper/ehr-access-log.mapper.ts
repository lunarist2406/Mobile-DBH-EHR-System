import { AccessLogUI } from '@/types/doctor/access-log.ui';
import { EHRAccessLog } from '../types/doctor/ehr-access-log.type';

export function mapEHRAccessLogToUI(
  log: EHRAccessLog,
  ctx: { accessedByName: string; reportType: string }
): AccessLogUI {
  return {
    id: log.access_id,
    ehrId: log.ehr_id,
    version: log.version,
    accessedByName: ctx.accessedByName,
    reportType: ctx.reportType as any,
    action: log.access_action,
    verifyStatus: log.verify_status,
    ipAddress: log.ip_address,
    accessedAt: log.accessed_at,
  };
}
