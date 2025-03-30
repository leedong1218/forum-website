import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// 主題色彩
const textPrimaryColor = "#334155"; // Dark gray for text
const textSecondaryColor = "#64748b"; // Medium gray for secondary text

const UserStats: React.FC = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
      {/* 貼文統計 */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: textPrimaryColor,
          }}
        >
          48
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: textSecondaryColor }}
        >
          貼文
        </Typography>
      </Box>

      {/* 按讚統計 */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: textPrimaryColor,
          }}
        >
          1,250
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: textSecondaryColor }}
        >
          按讚
        </Typography>
      </Box>

      {/* 追蹤者統計 */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: textPrimaryColor,
          }}
        >
          86
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: textSecondaryColor }}
        >
          追蹤者
        </Typography>
      </Box>
    </Box>
  );
};

export default UserStats;