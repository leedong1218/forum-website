import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { colors } from "@/styles/theme"; // Import colors from theme file

const SimplifiedProfile: React.FC = () => {
  return (
    <Box sx={{ 
      p: 2, 
      mt: 'auto', // 確保它固定在側邊欄的底部
      borderTop: "1px solid rgba(0,0,0,0.08)"
    }}>
      {/* 用戶基本信息 */}
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        mb: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: "rgba(0,0,0,0.02)",
      }}>
        <Avatar
          sx={{
            width: 50,
            height: 50,
            bgcolor: colors.accent,
            border: "3px solid white",
            boxShadow: "0 2px 8px rgba(14, 165, 233, 0.3)",
            mr: 2
          }}
        >
          U
        </Avatar>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: colors.textPrimary }}
          >
            陳家豪
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: colors.textSecondary }}
          >
            @GIAHOW
          </Typography>
        </Box>
      </Box>
      
      {/* 用戶數據統計 */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Box sx={{ 
          flex: 1, 
          p: 1, 
          bgcolor: "rgba(0,0,0,0.02)",
          borderRadius: 1,
          textAlign: "center" 
        }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>48</Typography>
          <Typography variant="caption" sx={{ color: colors.textSecondary }}>貼文</Typography>
        </Box>
        <Box sx={{ 
          flex: 1, 
          p: 1, 
          bgcolor: "rgba(0,0,0,0.02)",
          borderRadius: 1,
          textAlign: "center" 
        }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>86</Typography>
          <Typography variant="caption" sx={{ color: colors.textSecondary }}>追蹤者</Typography>
        </Box>
        <Box sx={{ 
          flex: 1, 
          p: 1, 
          bgcolor: "rgba(0,0,0,0.02)",
          borderRadius: 1,
          textAlign: "center" 
        }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>1,250</Typography>
          <Typography variant="caption" sx={{ color: colors.textSecondary }}>按讚</Typography>
        </Box>
      </Box>
      
      {/* 個人檔案按鈕 */}
      <Button
        fullWidth
        href="/personal"
        sx={{
          textTransform: "none",
          borderRadius: 2,
          bgcolor: colors.accentLight,
          color: colors.accent,
          fontWeight: 600,
          "&:hover": {
            bgcolor: colors.accent,
            color: "white",
          },
        }}
      >
        個人檔案
      </Button>
    </Box>
  );
};

export default SimplifiedProfile;