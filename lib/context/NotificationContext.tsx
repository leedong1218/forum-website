import React, { createContext, useContext, useEffect, useState } from 'react';
import { NotificationItem } from '@/lib/types/notificationType';
import notificationAPI from '@/services/Notifications/NotificationsAPI';
import { toast } from 'react-toastify';

interface NotificationContextType {
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  fetchNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used inside NotificationProvider');
  return ctx;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const fetchNotifications = async () => {

    try {
      const res = await notificationAPI.getPreview();

      if (res.message) {
        setNotifications(res.data ?? []);
      } else {
        toast.error(res.message || '無法取得通知');
      }
    } catch (error) {
      console.error('Fetch notifications failed:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const token = localStorage.getItem('access_token');

    if (!token) return;

        const socket = new WebSocket(`ws://140.131.115.161:8000/ws/notifications/?token=${token}`);

    socket.onopen = () => {
      console.log('🔌 WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'notification') {
          toast.info(data.message);
          fetchNotifications();
        }
      } catch (err) {
        console.error('WebSocket JSON parsing error:', err);
      }
    };

    socket.onclose = () => {
      console.log('🧹 WebSocket disconnected');
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    return () => socket.close();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
