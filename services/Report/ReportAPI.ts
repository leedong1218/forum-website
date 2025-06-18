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

  getReportList: (): Promise<Response<ReportItem[]>> =>
    API.get('/report/admin/list'),

  reviewReport: (report_id: string, status: 'approved' | 'rejected'): Promise<Response<unknown>> =>
    API.patch(`/report/admin/${report_id}/review`, { status }),
};

export default ReportAPI;