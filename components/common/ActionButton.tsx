import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import { colors } from "@/styles/theme"; // Import colors from theme file

type ActionButtonProps = {
  isLogin: boolean;
};

const ActionButton: React.FC<ActionButtonProps> = ({ isLogin }) => {
  return (
    isLogin ? (
      <Tooltip title="發布新貼文" placement="left">
        <Link href="/create-post" sx={{ textDecoration: "none" }}>
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: { xs: 16, sm: 32 },
              right: { xs: 16, sm: 32 },
              bgcolor: colors.accent,
              "&:hover": {
                bgcolor: colors.accentDark,
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(14, 165, 233, 0.4)",
              },
              transition: "all 0.2s",
              boxShadow: "0 4px 14px rgba(14, 165, 233, 0.3)",
              zIndex: 1300,
            }}
          >
            <AddIcon />
          </Fab>
        </Link>
      </Tooltip>
    ) : null
  );
};

export default ActionButton;