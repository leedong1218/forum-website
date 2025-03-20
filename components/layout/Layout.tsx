import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ForumIcon from "@mui/icons-material/Forum";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DevicesIcon from "@mui/icons-material/Devices";
import CodeIcon from "@mui/icons-material/Code";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { Article, Circle } from "@mui/icons-material";
import Link from "@mui/material/Link";

const drawerWidth = 250;
const profileCardWidth = 300;

// Modern tech theme colors
const accentColor = "#0ea5e9"; // Bright blue
const bgColor = "#f8fafc"; // Light gray background
const cardBgColor = "#ffffff"; // White for cards
const textPrimaryColor = "#334155"; // Dark gray for text
const textSecondaryColor = "#64748b"; // Medium gray for secondary text

interface LayoutProps {
  children: React.ReactNode;
  showProfileCard?: boolean;
}

export default function Layout({
  children,
  showProfileCard = true,
}: LayoutProps) {
  const [activeItem, setActiveItem] = React.useState<string | null>("系統公告");

  const handleNavItemClick = (text: string) => {
    console.log(text);
    setActiveItem(text);
  };

  // Main sections for navigation
  const mainNavItems = [
    { text: "系統公告", icon: <DashboardIcon />, link: "/" },
    { text: "所有看板", icon: <ForumIcon />, link: "/boards" },
    { text: "所有文章", icon: <Article />, link: "/f/1" },
  ];

  // Followed boards
  const followedBoards = [
    { text: "Technology", icon: <DevicesIcon /> },
    { text: "Programming", icon: <CodeIcon /> },
    { text: "Data Science", icon: <DataObjectIcon /> },
    { text: "Trending", icon: <TrendingUpIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: bgColor }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: cardBgColor,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left side logo */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 700,
              color: textPrimaryColor,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ForumIcon sx={{ mr: 1, color: accentColor }} />
            TechForum
          </Typography>

          {/* Search bar, centered */}
          <TextField
            placeholder="Search topics, posts, users..."
            variant="outlined"
            size="small"
            sx={{
              width: "40%",
              bgcolor: "rgba(0,0,0,0.02)",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": {
                  borderColor: "rgba(0,0,0,0.08)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(0,0,0,0.15)",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: textSecondaryColor }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Right side user controls */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ mr: 1 }}>
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon sx={{ color: textSecondaryColor }} />
              </Badge>
            </IconButton>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: accentColor,
              }}
            >
              U
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: cardBgColor,
            borderRight: "1px solid rgba(0,0,0,0.08)",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", px: 2, py: 2 }}>
          <List disablePadding>
            {mainNavItems.map((item) => (
              <Link key={item.text} href={item.link} underline="none">
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => handleNavItemClick(item.text)}
                    sx={{
                      borderRadius: 1.5,
                      bgcolor:
                        activeItem === item.text
                          ? `${accentColor}12`
                          : "transparent",
                      color:
                        activeItem === item.text
                          ? accentColor
                          : textPrimaryColor,
                      "&:hover": {
                        bgcolor: `${accentColor}08`,
                      },
                      transition: "background-color 0.2s",
                      py: 1,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          activeItem === item.text
                            ? accentColor
                            : textSecondaryColor,
                        minWidth: 40,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: activeItem === item.text ? 600 : 500,
                        fontSize: "0.9rem",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Followed Boards section */}
          <Typography
            variant="subtitle2"
            sx={{
              px: 1,
              py: 1,
              color: textSecondaryColor,
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            追蹤看板
          </Typography>

          <List disablePadding>
            {followedBoards.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavItemClick(item.text)}
                  sx={{
                    borderRadius: 1.5,
                    bgcolor:
                      activeItem === item.text
                        ? `${accentColor}12`
                        : "transparent",
                    color:
                      activeItem === item.text ? accentColor : textPrimaryColor,
                    "&:hover": {
                      bgcolor: `${accentColor}08`,
                    },
                    transition: "background-color 0.2s",
                    py: 1,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        activeItem === item.text
                          ? accentColor
                          : textSecondaryColor,
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: activeItem === item.text ? 600 : 500,
                      fontSize: "0.9rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main content area + profile card */}
      <Box
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
          p: 3,
          mt: 8,
          position: "relative",
        }}
      >
        {/* Main content area */}
        <Box sx={{ flexGrow: 1, pr: showProfileCard ? 3 : 0 }}>{children}</Box>

        {/* Right side profile card */}
        {showProfileCard && (
          <Box sx={{ width: profileCardWidth }}>
            <Box
              sx={{
                p: 3,
                bgcolor: cardBgColor,
                borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.08)",
                mb: 2,
                width: 300,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: accentColor,
                    mb: 2,
                  }}
                >
                  U
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: textPrimaryColor }}
                >
                  陳家豪
                </Typography>
                <Typography variant="body2" sx={{ color: textSecondaryColor }}>
                  @GIAHOW
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" sx={{ color: textSecondaryColor }}>
                  加入日期
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: textPrimaryColor }}
                >
                  2025 3月
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" sx={{ color: textSecondaryColor }}>
                  貼文數
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: textPrimaryColor }}
                >
                  48
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ color: textSecondaryColor }}>
                  按讚數
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: textPrimaryColor }}
                >
                  1,250
                </Typography>
              </Box>

              <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <Link href="/personal">
                  個人檔案
                </Link>
              </Box>
            </Box>

            <Box
              sx={{
                p: 3,
                bgcolor: cardBgColor,
                borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: textPrimaryColor,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                在線
                <Circle sx={{ fontSize: 15, ml: 1, color: "green" }} />
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <BookmarkIcon
                    sx={{ fontSize: 18, color: accentColor, mr: 1 }}
                  />
                  <Typography variant="body2" sx={{ color: textPrimaryColor }}>
                    React 19 Feature Discussion
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <BookmarkIcon
                    sx={{ fontSize: 18, color: accentColor, mr: 1 }}
                  />
                  <Typography variant="body2" sx={{ color: textPrimaryColor }}>
                    Future of AI Development
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <BookmarkIcon
                    sx={{ fontSize: 18, color: accentColor, mr: 1 }}
                  />
                  <Typography variant="body2" sx={{ color: textPrimaryColor }}>
                    Quantum Computing Trends
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {/* Floating action button for new post */}
        <Link href="/create-post">
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              boxShadow: 3,
              bgcolor: accentColor,
              "&:hover": {
                bgcolor: "#0284c7",
              },
            }}
          >
            <AddIcon />
          </Fab>
        </Link>
      </Box>
    </Box>
  );
}
