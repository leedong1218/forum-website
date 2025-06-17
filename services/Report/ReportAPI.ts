import API from '@/system/API';
import { Response } from '@/system/Request.type';

export interface CreateReportType {
  target_type: 'post' | 'comment';
  target_id: number;
  reason: string;
  description?: string;
}

export interface CreateReportType {
  target_type: 'post' | 'comment';
  target_id: number;
  reason: string;
  description?: string;
}

export interface ReportItem {
  id: number;
  reporter: number;
  reporterName: string;
  reason: string;
  reasonLabel: string;
  description?: string;
  status: string;
  statusLabel: string;
  created_at: string;
  content_type: number;
  object_id: number;
  targetText: string;
  targetLink: string;
}

export interface PaginatedReportResponse {
  data: ReportItem[];
}

export const ReportAPI = {
  createReport: (data: CreateReportType): Promise<Response<unknown>> =>
    API.post('/report', data),

  getReportList: (params: {type: string; status?: string}): Promise<Response<ReportItem[]>> =>
    API.get('/reports', { params }),

  reviewReport: (id: number, decision: 'approved'|'rejected'): Promise<Response<unknown>> =>
    API.patch(`/reports/${id}/review`, { decision }),
};

export default ReportAPI;