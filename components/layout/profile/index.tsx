import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Forum } from "@mui/icons-material";
import { EmptyStateType } from '@/lib/types/emptyStateType';
import { colors } from "@/styles/theme"; // Import colors from theme file

const EmptyState = ({ searchTerm, onClearSearch } : EmptyStateType) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 6,
        p: 6,
        borderRadius: 3,
        backgroundColor: "rgba(0,0,0,0.02)",
        border: "1px dashed rgba(0,0,0,0.1)",
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Forum sx={{ fontSize: 60, color: "rgba(0,0,0,0.1)", mb: 2 }} />
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: colors.textPrimary, mb: 1 }}
      >
        找不到符合的文章
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        請嘗試使用不同的關鍵字，或清除搜尋條件查看所有文章
      </Typography>
      {searchTerm && (
        <Button
          variant="outlined"
          onClick={onClearSearch}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            borderColor: colors.accent,
            color: colors.accent,
            "&:hover": {
              borderColor: colors.accentDark,
              bgcolor: colors.accentLight,
            },
          }}
        >
          清除搜尋
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;