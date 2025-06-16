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
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  // 根據icon字符串返回對應的圖標組件
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType } = {
      'info': Info,
      'warning': Warning,
      'success': CheckCircle,
      'error': Error,
      'forum': Forum,
      'edit': Edit,
    };
    return iconMap[iconName] || Info;
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

  const fetchNotifications = async (pageParam = 0, append = false) => {
    try {
      setIsLoading(true);

      // 這裡假設你的API支持分頁參數，如果不支持，可以移除page參數
      const res: NotificationResponse = await notificationAPI.getAllUnread();

      if (res.request === "success") {
        const newNotifications = res.data.results || [];

        if (append) {
          setNotifications(prev => [...prev, ...newNotifications]);
        } else {
          setNotifications(newNotifications);
        }

        // 如果返回的數據少於預期，說明沒有更多數據了
        if (newNotifications.length < 5) { // 假設每頁5條數據
          setHasMore(false);
        }
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
    fetchNotifications(0, false);

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
          // 重新載入通知列表
          fetchNotifications(0, false);
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
    } catch (error) {
      console.error('取消通知失敗:', error);
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {notifications.map((notification, index) => {
                const IconComponent = getIconComponent(notification.icon);
                const isLastItem = index === notifications.length - 1;

                return (
                  <Card
                    key={notification.id}
                    ref={isLastItem ? setupObserver : null}
                    onClick={() => handleNotificationClick(notification)}
                    sx={{
                      p: '1rem 0 .5rem',
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      cursor: notification.link ? 'pointer' : 'default',
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
                      },
                      border: `1px solid ${colors.accentLight}`,
                      backgroundColor: notification.is_read ? "rgb(255, 255, 255)" : "white",
                      overflow: "visible",
                      position: "relative",
                      opacity: notification.is_read ? 0.7 : 1,
                    }}
                  >
                    {/* 左側類型標記 */}
                    <Box
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        background: notification.color || colors.accent,
                        borderTopLeftRadius: 12,
                        borderBottomLeftRadius: 12,
                      }}
                    />

                    {/* 未讀指示器 */}
                    {!notification.is_read && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 15,
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: colors.accent,
                        }}
                      />
                    )}

                    <IconButton sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                    }}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleCancel(notification.id);
                      }}>
                      <Cancel sx={{ color: 'red' }} />
                    </IconButton>

                    <CardContent sx={{ p: "1rem 2rem", width: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                          <Avatar sx={{
                            bgcolor: notification.color || colors.accent,
                            mr: 2,
                            width: 40,
                            height: 40,
                          }}>
                            {React.createElement(IconComponent as React.ElementType, { sx: { fontSize: 20 } })}
                          </Avatar>

                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                              component="div"
                              sx={{
                                fontWeight: notification.is_read ? 400 : 600,
                                color: colors.textPrimary,
                                fontSize: '0.95rem',
                                lineHeight: 1.4,
                                wordBreak: 'break-word',
                              }}
                            >
                              {notification.message}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{
                          display: "flex",
                          alignItems: "center",
                          ml: 2,
                          flexShrink: 0,
                        }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              color: "text.secondary",
                              fontSize: "0.75rem",
                            }}
                          >
                            <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                            {formatTimestamp(notification.created_at)}
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
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
                已載入所有通知
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Notify;