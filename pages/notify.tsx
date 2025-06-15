import React, { useState, useCallback } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress
} from '@mui/material';
import {
  AccessTime,
  NotificationAddOutlined,
  Forum,
  Edit
} from '@mui/icons-material';
import Banner from '@/components/common/Banner';
import Layout from '@/components/layout/Layout';
import { colors } from "@/styles/theme";
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll'; // 調整路徑根據你的項目結構

type Notification = {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  avatar: {
    type: 'icon' | 'text';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any;
    bgcolor: string;
  };
};

// 模擬更多通知數據
const generateNotifications = (page: number): Notification[] => {
  const baseNotifications = [
    {
      title: "新的回覆",
      description: "有人回覆了你的貼文",
      avatar: { type: 'icon' as const, content: Forum, bgcolor: colors.accent }
    },
    {
      title: "新的追蹤者",
      description: "有人開始追蹤你",
      avatar: { type: 'text' as const, content: 'U', bgcolor: colors.gradient }
    },
    {
      title: "貼文被讚",
      description: "你的貼文獲得了讚",
      avatar: { type: 'icon' as const, content: Edit, bgcolor: '#ff9800' }
    },
  ];

  return baseNotifications.map((notification, index) => ({
    ...notification,
    id: page * 10 + index + 1,
    timestamp: `${Math.floor(Math.random() * 24) + 1}小時前`,
    description: `${notification.description} (第${page + 1}頁)`,
  }));
};

const Notify = () => {
  const title = "通知";
  const [notifications, setNotifications] = useState<Notification[]>(() => 
    generateNotifications(0)
  );
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 模擬載入更多通知的函數
  const loadMoreNotifications = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // 模擬 API 調用延遲
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const nextPage = page + 1;
    const newNotifications = generateNotifications(nextPage);
    
    setNotifications(prev => [...prev, ...newNotifications]);
    setPage(nextPage);
    
    // 模擬在第5頁後沒有更多數據
    if (nextPage >= 4) {
      setHasMore(false);
    }
    
    setIsLoading(false);
  }, [page, isLoading, hasMore]);

  const { setupObserver } = useInfiniteScroll({
    hasMore,
    isLoading,
    onLoadMore: loadMoreNotifications,
  });

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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {notifications.map((notification, index) => {
              const IconComponent = notification.avatar.content;
              const isLastItem = index === notifications.length - 1;

              return (
                <Card
                  key={notification.id}
                  ref={isLastItem ? setupObserver : null}
                  sx={{
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
                    },
                    border: `1px solid ${colors.accentLight}`,
                    backgroundColor: "white",
                    overflow: "visible",
                    position: "relative",
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
                      background: colors.accent,
                      borderTopLeftRadius: 12,
                      borderBottomLeftRadius: 12,
                    }}
                  />
                  <CardContent sx={{ p: "1rem 2rem", width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: notification.avatar.bgcolor, mr: 2 }}>
                          {notification.avatar.type === 'icon' ? (
                            <IconComponent sx={{ fontSize: 18 }} />
                          ) : (
                            <Typography>{notification.avatar.content}</Typography>
                          )}
                        </Avatar>

                        <Box>
                          <Typography
                            component="div"
                            sx={{
                              fontWeight: 600,
                              color: colors.textPrimary,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {notification.title}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "text.secondary",
                            fontSize: "0.75rem",
                          }}
                        >
                          <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                          {notification.timestamp}
                        </Box>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.textSecondary,
                        pl: 7,
                      }}
                    >
                      {notification.description}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>

          {/* 載入指示器 */}
          {isLoading && (
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