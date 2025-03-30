import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { PeopleAlt, Circle } from "@mui/icons-material";
import { colors } from "@/styles/theme"; // Import colors from theme file

const OnlineUsers: React.FC = () => {
  // 在線用戶數據
  const onlineUsers = [
    {
      name: "王小明",
      username: "@xiaoming",
      avatar: "W",
      status: "活躍中",
      lastActive: "剛剛",
      color: "#3b82f6",
    },
    {
      name: "林美玲",
      username: "@meiling",
      avatar: "L",
      status: "忙碌中",
      lastActive: "5分鐘前",
      color: "#ec4899",
    },
    {
      name: "張志豪",
      username: "@zhihao",
      avatar: "Z",
      status: "活躍中",
      lastActive: "2分鐘前",
      color: "#10b981",
    },
    {
      name: "黃雅琪",
      username: "@yaqi",
      avatar: "H",
      status: "離開",
      lastActive: "30分鐘前",
      color: "#f59e0b",
    },
  ];

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: colors.cardBg,
        borderRadius: 2,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.08)",
        width: "100%",
      }}
    >
      {/* 標題區 */}
      <Box
        sx={{
          fontWeight: 600,
          mb: 1,
          color: colors.textPrimary,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PeopleAlt sx={{ mr: 1, color: colors.accent }} />
          在線成員
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body2"
            sx={{ color: colors.accentHover, mr: 1, fontWeight: 500 }}
          >
            {onlineUsers.length} 人在線
          </Typography>
          <Circle sx={{ fontSize: 12, color: colors.accentHover }} />
        </Box>
      </Box>

      {/* 在線用戶列表 */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {onlineUsers.map((user, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              p: 1,
              borderRadius: 2,
              bgcolor: "rgba(0,0,0,0.02)",
              transition: "all 0.2s",
              alignItems: "center",
              overflow: "hidden"
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: user.color,
                fontSize: "1rem",
                mr: 2,
                flexShrink: 0,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              {user.avatar}
            </Avatar>
            
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: colors.textPrimary,
                    mr: 1,
                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                  }}
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.textSecondary,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {user.username}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OnlineUsers;