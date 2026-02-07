import { EHRRecord } from "../types";

export type InsightItem = {
  id: string;
  label: string;
  value: string;
  status?: 'DUE' | 'ACTIVE';
};

export type LedgerEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'VISIT' | 'LAB';
};

export interface PatientDashboardData {
  masterRecord: EHRRecord;
  insights: InsightItem[];
  ledger: LedgerEvent[];
}
