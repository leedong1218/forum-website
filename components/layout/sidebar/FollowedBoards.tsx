import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { MoreHoriz } from "@mui/icons-material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DevicesIcon from "@mui/icons-material/Devices";
import CodeIcon from "@mui/icons-material/Code";
import DataObjectIcon from "@mui/icons-material/DataObject";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import { colors } from "@/styles/theme"; // Import colors from theme file

// 脈衝動畫組件
const PulseBox = styled(Box)(({ }) => ({
  position: "absolute",
  top: 8,
  left: 8,
  width: 8,
  height: 8,
  borderRadius: "50%",
  bgcolor: colors.secondaryAccent, // Assuming warningColor is similar to secondaryAccent
  animation: "pulse 2s infinite",
  "@keyframes pulse": {
    "0%": {
      boxShadow: `0 0 0 0 rgba(245, 158, 11, 0.4)`,
    },
    "70%": {
      boxShadow: `0 0 0 6px rgba(245, 158, 11, 0)`,
    },
    "100%": {
      boxShadow: `0 0 0 0 rgba(245, 158, 11, 0)`,
    },
  },
}));

interface FollowedBoardsProps {
  title?: string;
  isMobile: boolean;
  isCompactView: boolean;
  handleDrawerToggle: () => void;
}

const FollowedBoards: React.FC<FollowedBoardsProps> = ({
  title,
  isMobile,
  isCompactView,
  handleDrawerToggle
}) => {
  // 追蹤看板資料
  const followedBoards = [
    {
      text: "Technology",
      icon: <DevicesIcon />,
      link: "/f/1",
      online: 42,
      hasNewContent: true,
    },
    {
      text: "Programming",
      icon: <CodeIcon />,
      link: "/f/2",
      online: 28,
      hasNewContent: false,
    },
    {
      text: "Data Science",
      icon: <DataObjectIcon />,
      link: "/f/3",
      online: 15,
      hasNewContent: true,
    },
    {
      text: "Trending",
      icon: <TrendingUpIcon />,
      link: "/f/4",
      online: 67,
      hasNewContent: false,
    },
  ];

  return (
    <>
      <Divider sx={{ my: 2.5 }} />

      {/* 追蹤看板標題 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
          mb: 1.5,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: colors.textSecondary,
            fontWeight: 600,
            fontSize: "0.75rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          追蹤看板
        </Typography>
        <Tooltip title="管理看板">
          <IconButton size="small" sx={{ color: colors.textSecondary }}>
            <MoreHoriz fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* 追蹤看板列表 */}
      <List disablePadding sx={{ flexGrow: 1 }}>
        {followedBoards.map((item) => (
          <Link 
            key={item.text} 
            href={item.link} 
            underline="none" 
            onClick={(isMobile || isCompactView) ? handleDrawerToggle : undefined}
          >
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  bgcolor:
                    title === item.text ? colors.accentLight : "transparent",
                  color:
                    title === item.text ? colors.accent : colors.textPrimary,
                  "&:hover": {
                    bgcolor:
                      title === item.text
                        ? colors.accentLight
                        : "rgba(0,0,0,0.04)",
                  },
                  transition: "all 0.2s",
                  py: 1.2,
                  position: "relative",
                  overflow: "visible",
                }}
              >
                {item.hasNewContent && <PulseBox />}
                <ListItemIcon
                  sx={{
                    color:
                      title === item.text
                        ? colors.accent
                        : colors.textSecondary,
                    minWidth: 42,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: title === item.text ? 600 : 500,
                    fontSize: "0.95rem",
                  }}
                  secondary={`${item.online} 人在線`}
                  secondaryTypographyProps={{
                    fontSize: "0.75rem",
                    color: colors.accentHover, // Assuming successColor is similar to accentHover
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default FollowedBoards;