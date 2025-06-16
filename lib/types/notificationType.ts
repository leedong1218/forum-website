export interface NotificationItem {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  link?: string;
  color?: string;
  icon?: string;
  created_at: Date;
  avatar: {
    type: 'icon' | 'text';
    content: any;
    bgcolor: string;
  };
}
