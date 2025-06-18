import React, { useState, useCallback, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  IconButton
} from '@mui/material';
import {
  AccessTime,
  NotificationAddOutlined,
  Forum,
  Edit,
  Info,
  Warning,
  CheckCircle,
  Error,
  Cancel
} from '@mui/icons-material';
import Banner from '@/components/common/Banner';
import Layout from '@/components/layout/Layout';
import { colors } from "@/styles/theme";
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';
import notificationAPI from '@/services/Notifications/NotificationsAPI';
import { toast } from 'react-toastify';

// 更新通知類型定義以匹配API響應
type Notification = {
  id: number;
  type: string;
  message: string;
  link: string;
  icon: string;
  color: string;
  created_at: string;
  is_read: boolean;
};

type NotificationResults = {
  results: Notification[];
  total_pages: number; // 新增 total_pages 欄位
}

// API響應類型
type NotificationResponse = {
  request: string;
  errorCode: string;
  message: string;
  data: NotificationResults;
};

const Notify = () => {
  const title = "通知";
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1); // 從 1 開始
  const [totalPages, setTotalPages] = useState(1); // 新增總頁數狀態
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const getIconComponent = (iconName: string, color?: string) => {
    const iconMap: { [key: string]: React.ElementType } = {
      'info': Info,
      'warning': Warning,
      'success': CheckCircle,
      'error': Error,
      'forum': Forum,
      'edit': Edit,
    };

    const Icon = iconMap[iconName];

    if (Icon) {
      return (
        <Icon sx={{ fontSize: 20 }} />
      );
    } else {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconName}
          alt="icon"
          style={{
            width: 50,
            height: 50,
            objectFit: 'contain',
            borderRadius: '50%',
            backgroundColor: color || '#ccc',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/fallback-icon.png';
          }}
        />
      );
    }
  };

  // 格式化時間戳
  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMs = now.getTime() - notificationTime.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays}天前`;
    } else if (diffInHours > 0) {
      return `${diffInHours}小時前`;
    } else {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return diffInMinutes > 0 ? `${diffInMinutes}分鐘前` : '剛剛';
    }
  };

  const fetchNotifications = async (pageParam = 1, append = false) => {
    try {
      setIsLoading(true);

      const res: NotificationResponse = await notificationAPI.getAllUnread({ page: pageParam });

      if (res.request === "success") {
        const newNotifications = res.data.results || [];
        const totalPagesFromAPI = res.data.total_pages || 1;

        // 更新總頁數
        setTotalPages(totalPagesFromAPI);

        if (append) {
          setNotifications(prev => [...prev, ...newNotifications]);
        } else {
          setNotifications(newNotifications);
        }

        // 使用 total_pages 來判斷是否還有更多數據
        setHasMore(pageParam < totalPagesFromAPI);
      } else {
        toast.error(res.message || '無法取得通知');
      }
    } catch (error) {
      console.error('Fetch notifications failed:', error);
      toast.error('載入通知失敗');
    } finally {
      setIsLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(1, false);

    const token = localStorage.getItem('access_token');

    if (!token) return;

    const wsUrl = process.env.NEXT_PUBLIC_WEB_URL;
    const socket = new WebSocket(`${wsUrl}/ws/notifications/?token=${token}`);

    socket.onopen = () => {
      console.log('🔌 WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'notification') {
          toast.info(data.message);
          // 重新載入通知列表，重置到第一頁
          setPage(1);
          fetchNotifications(1, false);
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

  // 載入更多通知的函數
  const loadMoreNotifications = useCallback(async () => {
    if (isLoading || !hasMore) return;

    const nextPage = page + 1;
    await fetchNotifications(nextPage, true);
    setPage(nextPage);
  }, [page, isLoading, hasMore]);

  const { setupObserver } = useInfiniteScroll({
    hasMore,
    isLoading,
    onLoadMore: loadMoreNotifications,
  });

  // 處理通知點擊
  const handleNotificationClick = (notification: Notification) => {
    if (notification.link) {
      // 如果是外部鏈接
      if (notification.link.startsWith('http')) {
        window.open(notification.link, '_blank');
      } else {
        // 內部路由跳轉，這裡需要根據你的路由系統調整
        window.location.href = notification.link;
        (async () => {
          await notificationAPI.markAsRead(notification.id);
        })();
      }
    }
  };

  if (initialLoading) {
    return (
      <Layout title={title}>
        <Box>
          <Banner
            title={title}
            content={""}
            avatarUrl={""}
            textColor={""}
            icon={NotificationAddOutlined}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress size={40} />
          </Box>
        </Box>
      </Layout>
    );
  }

  const handleCancel = async (id: number) => {
    try {
      await notificationAPI.delete(id);
      toast.success('通知已刪除');
      // 刪除成功後，從本地狀態移除該通知
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    } catch (error) {
      console.error('取消通知失敗:', error);
      toast.error('刪除通知失敗');
    }
  }

  return (
    <Layout title={title}>
      <Box>
        <Banner
          title={title}
          content={""}
          avatarUrl={""}
          textColor={""}
          icon={NotificationAddOutlined}
        />

        <Box sx={{ mb: 2 }}>
          {notifications.length === 0 ? (
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
              flexDirection: 'column',
              gap: 2
            }}>
              <NotificationAddOutlined sx={{ fontSize: 48, color: 'text.secondary' }} />
              <Typography variant="body1" color="text.secondary">
                暫無通知
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {notifications.map((notification, index) => {
                const isLastItem = index === notifications.length - 1;

                return (
                  <Card
                    key={notification.id}
                    ref={isLastItem ? setupObserver : null}
                    onClick={() => handleNotificationClick(notification)}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      transition: "all 0.2s ease",
                      cursor: notification.link ? 'pointer' : 'default',
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                      },
                      border: `1px solid ${colors.accentLight}`,
                      position: "relative",
                      opacity: notification.is_read ? 0.7 : 1,
                    }}
                  >
                    {/* 左側標記線 */}
                    <Box
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        backgroundColor: notification.color || colors.accent,
                        borderRadius: "0 2px 2px 0",
                      }}
                    />

                    {/* 刪除按鈕 */}
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 24,
                        height: 24,
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleCancel(notification.id);
                      }}
                    >
                      <Cancel sx={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.4)' }} />
                    </IconButton>

                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, pr: 4 }}>
                      {/* 頭像和未讀指示器 */}
                      <Box sx={{ position: "relative" }}>
                        <Avatar
                          sx={{
                            bgcolor: notification.color || colors.accent,
                            width: 40,
                            height: 40,
                          }}
                        >
                          {getIconComponent(notification.icon, notification.color)}
                        </Avatar>
                        {!notification.is_read && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: -2,
                              right: -2,
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor: colors.accent,
                              border: "2px solid white",
                            }}
                          />
                        )}
                      </Box>

                      {/* 內容區域 */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontWeight: notification.is_read ? 400 : 600,
                            color: colors.textPrimary,
                            fontSize: '0.95rem',
                            lineHeight: 1.4,
                            mb: 1,
                          }}
                        >
                          {notification.message}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
                          <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                          <Typography variant="caption">
                            {formatTimestamp(notification.created_at)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                );
              })}
            </Box>
          )}

          {/* 載入指示器 */}
          {isLoading && !initialLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}

          {/* 沒有更多數據提示 */}
          {!hasMore && notifications.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                已載入所有通知 ({page}/{totalPages} 頁)
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Notify;