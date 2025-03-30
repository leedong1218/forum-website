import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { Cake, Article, ThumbUp } from "@mui/icons-material";
import UserStats from "./UserStats";
import { Button } from "@mui/material";
import { colors } from "@/styles/theme"; // Import colors from theme file

// 響應式按鈕組件
const ResponsiveButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 8,
  fontWeight: 600,
  transition: 'all 0.2s',
  padding: theme.spacing(1, 2.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    padding: theme.spacing(0.8, 1.5),
  },
}));

// 浮動動畫組件
const FloatingBox = styled(Box)(({ }) => ({
  animation: "float 6s ease-in-out infinite",
  "@keyframes float": {
    "0%": {
      transform: "translateY(0px)",
    },
    "50%": {
      transform: "translateY(-10px)",
    },
    "100%": {
      transform: "translateY(0px)",
    },
  },
}));

const Profile: React.FC = () => {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: colors.cardBg,
        borderRadius: 2,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.08)",
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* 背景裝飾 */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          background: colors.gradient,
        }}
      />

      {/* 個人資訊頭部 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
          position: "relative",
          pt: 2,
        }}
      >
        <FloatingBox>
          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: colors.accent,
              mb: 2,
              border: "4px solid white",
              boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)",
            }}
          >
            U
          </Avatar>
        </FloatingBox>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: colors.textPrimary }}
        >
          陳家豪
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: colors.textSecondary,
              mr: 1,
            }}
          >
            @GIAHOW
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* 用戶統計信息 */}
      <UserStats />

      {/* 用戶詳細信息 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1.5,
          p: 1.5,
          borderRadius: 1.5,
          bgcolor: "rgba(0,0,0,0.02)",
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.04)",
          },
        }}
      >
        <Cake
          sx={{ fontSize: 18, color: colors.textSecondary, mr: 1.5 }}
        />
        <Typography variant="body2" sx={{ color: colors.textSecondary }}>
          加入日期
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: colors.textPrimary, ml: "auto" }}
        >
          2025 3月
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1.5,
          p: 1.5,
          borderRadius: 1.5,
          bgcolor: "rgba(0,0,0,0.02)",
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.04)",
          },
        }}
      >
        <Article
          sx={{ fontSize: 18, color: colors.textSecondary, mr: 1.5 }}
        />
        <Typography variant="body2" sx={{ color: colors.textSecondary }}>
          貼文數
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: colors.textPrimary, ml: "auto" }}
        >
          48
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          p: 1.5,
          borderRadius: 1.5,
          bgcolor: "rgba(0,0,0,0.02)",
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.04)",
          },
        }}
      >
        <ThumbUp
          sx={{ fontSize: 18, color: colors.textSecondary, mr: 1.5 }}
        />
        <Typography variant="body2" sx={{ color: colors.textSecondary }}>
          按讚數
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: colors.textPrimary, ml: "auto" }}
        >
          1,250
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ResponsiveButton
          href="/personal"
          sx={{
            bgcolor: colors.accentLight,
            color: colors.accent,
            "&:hover": {
              bgcolor: colors.accent,
              color: "white",
            },
          }}
        >
          個人檔案
        </ResponsiveButton>
      </Box>
    </Box>
  );
};

export default Profile;