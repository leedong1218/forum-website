import API from '@/system/API';
import { Response } from '@/system/Request.type';
import { NotificationItem } from '@/lib/types/notificationType';

const notificationAPI = {
  getPreview: (): Promise<Response<NotificationItem[]>> =>
    API.get('/notifications/unread/preview'),

  getAllUnread: (params?: { page?: number; }): Promise<Response<NotificationItem[]>> =>
    API.get('/notifications/unread/all', { params }),

  markAsRead: (id: number): Promise<Response<unknown>> =>
    API.post(`/notifications/read/${id}`),

  delete: (id: number): Promise<Response<unknown>> =>
    API.delete(`/notifications/delete/${id}`)
};

export default notificationAPI;
