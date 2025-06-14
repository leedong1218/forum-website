import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ForumIcon from "@mui/icons-material/Forum";
import { Article, Warning } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { colors } from "@/styles/theme"; // Import colors from theme file

interface MainNavItemsProps {
  title?: string;
  isMobile: boolean;
  isCompactView: boolean;
  handleDrawerToggle: () => void;
  isLogin?: boolean;
}

const MainNavItems: React.FC<MainNavItemsProps> = ({
  title,
  isMobile,
  isCompactView,
  handleDrawerToggle,
  isLogin
}) => {
  // 主要導航項目定義
  const allNavItems = [
    { text: "系統公告", icon: <DashboardIcon />, link: "/" },
    { text: "所有看板", icon: <ForumIcon />, link: "/forum/all" },
    { text: "所有文章", icon: <Article />, link: "/forum" },
    { text: "檢舉管理", icon: <Warning />, link: "/reportManagement", requireLogin: true },
  ];

  // 根據登入狀態過濾導航項目
  const mainNavItems = allNavItems.filter(item => 
    !item.requireLogin || isLogin
  );

  return (
    <List disablePadding>
      {mainNavItems.map((item) => (
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
              }}
            >
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
              />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default MainNavItems;