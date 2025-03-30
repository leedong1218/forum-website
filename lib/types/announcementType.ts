export type AnnouncementType = '系統維護' | '功能更新' | '重要通知' | '安全警告' | '服務中斷';

export type AnnouncementPriority = '高' | '中' | '低';

export interface SystemAnnouncement {
    id: number;
    title: string;
    description: string;
    fullContent: string;
    views: number;
    timestamp: string;
    date: string;
    type: string;
    priority: string;
  }