import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography
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

const notification: Notification[] = [
  {
    id: 1,
    title: "新的回覆",
    description: "有人回覆了你的貼文",
    timestamp: "2分鐘前",
    avatar: { type: 'icon', content: Forum, bgcolor: colors.accent }

  },
  {
    id: 2,
    title: "新的追蹤者",
    description: "John 開始追蹤你",
    timestamp: "1小時前",
    avatar: { type: 'text', content: 'J', bgcolor: colors.gradient }
  },
  {
    id: 3,
    title: "貼文被讚",
    description: "你的貼文獲得了10個讚",
    timestamp: "3小時前",
    avatar: { type: 'icon', content: Edit, bgcolor: '#ff9800' }
  },
];

const Notify = () => {
  const title = "通知";

  return (
    <Layout title={title}>
      <Box>
        <Banner
          title={title}
          content={""}
          avatarUrl={""}
          textColor={""}
          icon={NotificationAddOutlined}
        >
        </Banner>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {notification.map((post) => {
              const IconComponent = post.avatar.content;

              return (
                <Card
                  key={post.id}
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
                        <Avatar sx={{ bgcolor: post.avatar.bgcolor, mr: 2 }}>
                          {post.avatar.type === 'icon' ? (
                            <IconComponent sx={{ fontSize: 18 }} />
                          ) : (
                            <Typography>{post.avatar.content}</Typography>
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
                            {post.title}
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
                          {post.timestamp}
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
                      {post.description}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Notify;