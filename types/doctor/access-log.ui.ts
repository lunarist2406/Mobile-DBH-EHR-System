import { ReportType } from "../types";
import { EHRAccessAction, VerifyStatus } from "./ehr-access-log.type";


export interface AccessLogUI {
  id: string;
  ehrId: string;
  reportType: ReportType;
  version: number;
  accessedByName: string;
  action: EHRAccessAction;
  verifyStatus: VerifyStatus;
  ipAddress: string;
  accessedAt: string;
}
