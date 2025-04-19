import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Avatar,
  Button,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Cake, Article, ThumbUp } from "@mui/icons-material";
// import UserStats from "./UserStats";
import { colors } from "@/styles/theme";
import UserAPI, { UserSelfInfo } from "@/services/User/UserAPI";

const ResponsiveButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: 8,
  fontWeight: 600,
  transition: "all 0.2s",
  padding: theme.spacing(1, 2.5),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
    padding: theme.spacing(0.8, 1.5),
  },
}));

const FloatingBox = styled(Box)(() => ({
  animation: "float 6s ease-in-out infinite",
  "@keyframes float": {
    "0%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-10px)" },
    "100%": { transform: "translateY(0px)" },
  },
}));

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserSelfInfo | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserAPI.self()
      .then(res => {setUser(res.data); localStorage.setItem('firstName', res.data ? res.data.username?.[0]?.toUpperCase() : '')})
      .catch(err => console.error("取得用戶資料失敗", err))
      .finally(() => setLoading(false));
  }, []);

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

      {/* 頭像與名稱 */}
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
          {loading ? (
            <Skeleton variant="circular" width={90} height={90} />
          ) : (
            <Avatar
              src={user?.avatar}
              sx={{
                width: 90,
                height: 90,
                bgcolor: colors.accent,
                mb: 2,
                border: "4px solid white",
                boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)",
              }}
            >
              {user?.username?.[0]?.toUpperCase()}
            </Avatar>
          )}
        </FloatingBox>
<Typography
  variant="body2"
  component="span"
  sx={{
    fontWeight: 600,
    color: user?.groupColor,
    backgroundColor: user?.groupColor 
      ? `${user.groupColor}1A` 
      : 'transparent',
    borderRadius: '16px',
    border: user?.groupColor ? `1px solid ${user.groupColor}33` : 'none',
    px: 1.2,
    py: 0.3,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem',
    height: '28px',
    minHeight: '28px',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    '&:hover': {
      backgroundColor: user?.groupColor 
        ? `${user.groupColor}30` 
        : 'rgba(0, 0, 0, 0.04)',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    },
    transition: 'all 0.2s ease',
  }}
>
  {loading ? <Skeleton width={80} height={16} /> : user?.group}
</Typography>

        <Typography variant="h6" sx={{ fontWeight: 700, color: colors.textPrimary }}>
          {loading ? <Skeleton width={80} /> : user?.displayName}
        </Typography>

        <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
          {loading ? <Skeleton width={60} /> : `@${user?.username}`}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* <UserStats /> */}

      {/* 加入日期 */}
      <Box sx={infoBoxStyle}>
        <Cake sx={iconStyle} />
        <Typography variant="body2" sx={{ color: colors.textSecondary }}>
          加入日期
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: colors.textPrimary, ml: "auto" }}>
          {loading ? <Skeleton width={40} /> : user?.joinedDate || '未知'}
        </Typography>
      </Box>

      {/* 貼文數 */}
      <Box sx={infoBoxStyle}>
        <Article sx={iconStyle} />
        <Typography variant="body2" sx={{ color: colors.textSecondary }}>
          貼文數
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: colors.textPrimary, ml: "auto" }}>
          {loading ? <Skeleton width={30} /> : user?.postCount ?? 0}
        </Typography>
      </Box>

      {/* 按讚數 */}
      <Box sx={infoBoxStyle}>
        <ThumbUp sx={iconStyle} />
        <Typography variant="body2" sx={{ color: colors.textSecondary }}>
          按讚數
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: colors.textPrimary, ml: "auto" }}>
          {loading ? <Skeleton width={30} /> : user?.likeCount ?? 0}
        </Typography>
      </Box>

      {/* 查看個人檔案按鈕 */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
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

const infoBoxStyle = {
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
};

const iconStyle = {
  fontSize: 18,
  color: colors.textSecondary,
  mr: 1.5,
};

export default Profile;
