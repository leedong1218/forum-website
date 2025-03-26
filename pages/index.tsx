import React, { useState } from 'react';
import Layout from "@/components/layout/Layout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { 
  Divider, 
  Modal, 
  Button, 
  IconButton, 
  Chip, 
  Avatar,
  Fade,
  Backdrop,
} from "@mui/material";
import { 
  NotificationsActive, 
  Close, 
  Visibility, 
  Campaign, 
  NewReleases, 
  Security, 
  AccessTime 
} from '@mui/icons-material';

// 增強的主題色彩
const accentColor = "#0ea5e9"; // 亮藍色
const accentColorLight = "#e0f2fe"; // 淺藍背景色
const accentColorDark = "#0284c7"; // 深藍色用於懸停狀態
const gradientBg = "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)"; // 藍色漸變
const warningColor = "#f59e0b"; // 警告顏色
const securityColor = "#dc2626"; // 安全警告顏色
const successColor = "#10b981"; // 成功顏色

// 公告類型配置
const announcementTypes = {
  "系統維護": {
    icon: <Campaign />,
    color: warningColor,
    lightColor: "#fef3c7"
  },
  "新功能上線": {
    icon: <NewReleases />,
    color: successColor,
    lightColor: "#d1fae5"
  },
  "安全提醒": {
    icon: <Security />,
    color: securityColor,
    lightColor: "#fee2e2"
  }
};

// 擴充公告數據，添加類型
const posts = [
  {
    id: 1,
    title: "系統維護",
    description: "本系統將於2025/1/1 18:00~2025/1/1 20:00 進行系統維護",
    fullContent: "系統維護詳細說明：\n1. 維護時間：2025年1月1日 18:00 至 20:00\n2. 預計影響服務：所有線上系統將暫時停止運作\n3. 維護目的：更新系統安全性和效能\n4. 給用戶的建議：請於維護期間儲存所有未完成的工作",
    views: 1287,
    timestamp: "2 hours ago",
    date: "2025/01/01",
    type: "系統維護",
    priority: "高"
  },
  {
    id: 2,
    title: "新功能上線",
    description: "全新報表功能現已推出！",
    fullContent: "我們很高興宣布全新報表功能已經上線：\n1. 支援多種圖表類型\n2. 可自訂報表樣式\n3. 即時數據分析\n4. 導出PDF和Excel格式",
    views: 856,
    timestamp: "1 day ago",
    date: "2025/01/10",
    type: "新功能上線",
    priority: "中"
  },
  {
    id: 3,
    title: "安全提醒",
    description: "重要安全更新提醒",
    fullContent: "安全提醒：\n1. 請立即更新您的帳戶密碼\n2. 啟用雙重驗證\n3. 避免在公共網路使用帳戶\n4. 定期檢查帳戶活動",
    views: 1542,
    timestamp: "3 hours ago",
    date: "2025/01/15",
    type: "安全提醒",
    priority: "高"
  }
];

export default function Home() {
  const [selectedPost, setSelectedPost] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpenModal = (post: number) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedPost(0);
  };

  // 獲取公告類型的配置
  const getTypeConfig = (type: string) => {
    return announcementTypes[type as keyof typeof announcementTypes] || {
      icon: <Campaign />,
      color: accentColor,
      lightColor: accentColorLight
    };
  };

  return (
    <Layout title="系統公告">
      {/* 增強的英雄區塊 */}
      <Box
        sx={{
          width: "100%",
          mb: 4,
          p: 4,
          borderRadius: 2,
          background: gradientBg,
          boxShadow: "0 4px 20px rgba(14, 165, 233, 0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 裝飾背景元素 */}
        <Box
          sx={{
            position: "absolute",
            right: -20,
            top: -10,
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            right: 50,
            bottom: -30,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
          }}
        />
        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <NotificationsActive sx={{ color: "white", mr: 2, fontSize: 32 }} />
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, color: "white" }}
          >
            系統公告
          </Typography>
        </Box>
        
        <Typography
          variant="subtitle1"
          sx={{ 
            color: "rgba(255, 255, 255, 0.9)", 
            mt: 1,
            fontWeight: 400,
            maxWidth: "70%"
          }}
        >
          查看所有系統通知、功能更新與安全提醒
        </Typography>
      </Box>

      {/* 公告列表 */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {posts.map((post) => {
            const typeConfig = getTypeConfig(post.type);
            
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
                  border: `1px solid ${typeConfig.lightColor}`,
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
                    background: typeConfig.color,
                    borderTopLeftRadius: 12,
                    borderBottomLeftRadius: 12,
                  }}
                />
                
                <CardActionArea 
                  onClick={() => handleOpenModal(post.id)}
                  sx={{ 
                    display: "flex",
                    alignItems: "stretch",
                    p: 0
                  }}
                >
                  <CardContent sx={{ p: 3, width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            bgcolor: typeConfig.lightColor,
                            color: typeConfig.color,
                            mr: 2,
                          }}
                        >
                          {typeConfig.icon}
                        </Avatar>
                        
                        <Box>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ 
                              fontWeight: 600, 
                              mb: 0.5, 
                              color: "#1e293b",
                              display: "flex",
                              alignItems: "center"
                            }}
                          >
                            {post.title}
                            {post.priority === "高" && (
                              <Chip 
                                label="重要" 
                                size="small" 
                                sx={{ 
                                  ml: 1, 
                                  bgcolor: securityColor,
                                  color: "white",
                                  fontWeight: 600,
                                  fontSize: "0.7rem",
                                  height: 20
                                }} 
                              />
                            )}
                          </Typography>
                          
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Chip 
                              label={post.type} 
                              size="small"
                              sx={{ 
                                bgcolor: typeConfig.lightColor,
                                color: typeConfig.color,
                                fontWeight: 500,
                                fontSize: "0.75rem"
                              }}
                            />
                            
                            <Box sx={{ 
                              display: "flex", 
                              alignItems: "center", 
                              color: "text.secondary",
                              fontSize: "0.75rem"
                            }}>
                              <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                              {post.timestamp}
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Chip 
                          label={post.date}
                          variant="outlined"
                          size="small"
                          sx={{ 
                            fontWeight: 400,
                            borderColor: "rgba(0,0,0,0.1)",
                            color: "text.secondary"
                          }}
                        />
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{ 
                        mb: 2, 
                        color: "#475569",
                        pl: 7
                      }}
                    >
                      {post.description}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center",
                        color: "text.secondary",
                        fontSize: "0.75rem",
                        fontWeight: 500
                      }}>
                        <Visibility sx={{ fontSize: 16, mr: 0.5 }} />
                        {post.views.toLocaleString()} 次查看
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>
      </Box>

      {/* 增強的公告詳情彈窗 */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{
          backdrop: Backdrop
        }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
        aria-labelledby="announcement-modal-title"
        aria-describedby="announcement-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              width: '90%',
              maxWidth: 550,
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              p: 0,
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative'
            }}
          >
            {posts.filter(item => item.id === selectedPost).map(item => {
              const typeConfig = getTypeConfig(item.type);
              
              return (
                <React.Fragment key={item.id}>
                  {/* 標題區域帶顏色背景 */}
                  <Box
                    sx={{
                      p: 3,
                      background: typeConfig.lightColor,
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      position: 'relative',
                      borderBottom: `1px solid ${typeConfig.color}20`,
                    }}
                  >
                    <IconButton
                      onClick={handleCloseModal}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: typeConfig.color,
                      }}
                    >
                      <Close />
                    </IconButton>
                    
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: "white",
                          color: typeConfig.color,
                          mr: 2,
                          width: 48,
                          height: 48,
                          boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
                        }}
                      >
                        {typeConfig.icon}
                      </Avatar>
                      
                      <Box>
                        <Typography 
                          id="announcement-modal-title" 
                          variant="h5" 
                          component="h2" 
                          sx={{ 
                            fontWeight: 700,
                            color: "#1e293b"
                          }}
                        >
                          {item.title}
                        </Typography>
                        
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          <Chip 
                            label={item.type} 
                            size="small"
                            sx={{ 
                              bgcolor: "white",
                              color: typeConfig.color,
                              fontWeight: 600,
                              fontSize: "0.75rem"
                            }}
                          />
                          
                          <Box sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            color: typeConfig.color,
                            fontSize: "0.75rem",
                            fontWeight: 500
                          }}>
                            <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                            {item.date}
                          </Box>
                          
                          {item.priority === "高" && (
                            <Chip 
                              label="重要" 
                              size="small" 
                              sx={{ 
                                bgcolor: "white",
                                color: securityColor,
                                fontWeight: 600,
                                fontSize: "0.7rem",
                                height: 20,
                                border: `1px solid ${securityColor}30`
                              }} 
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  
                  {/* 內容區域 */}
                  <Box sx={{ p: 3 }}>
                    <Typography 
                      id="announcement-modal-description" 
                      variant="body1" 
                      sx={{ 
                        mb: 4, 
                        whiteSpace: 'pre-line',
                        color: '#475569',
                        lineHeight: 1.8
                      }}
                    >
                      {item.fullContent}
                    </Typography>
                    
                    <Divider sx={{ mb: 3 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center",
                        color: "text.secondary",
                        fontSize: "0.85rem",
                      }}>
                        <Visibility sx={{ fontSize: 18, mr: 0.5 }} />
                        {item.views.toLocaleString()} 次查看
                      </Box>
                      
                      <Button 
                        onClick={handleCloseModal} 
                        variant="contained" 
                        color="primary"
                        sx={{
                          bgcolor: accentColor,
                          "&:hover": {
                            bgcolor: accentColorDark
                          },
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          px: 3
                        }}
                      >
                        關閉
                      </Button>
                    </Box>
                  </Box>
                </React.Fragment>
              );
            })}
          </Box>
        </Fade>
      </Modal>
    </Layout>
  );
}