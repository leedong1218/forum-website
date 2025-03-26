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
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DevicesIcon from "@mui/icons-material/Devices";
import CodeIcon from "@mui/icons-material/Code";
import DataObjectIcon from "@mui/icons-material/DataObject";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  Article,
  Circle,
  MoreHoriz,
  Edit,
  Cake,
  ThumbUp,
  PeopleAlt,
  AccessTime,
} from "@mui/icons-material";
import Link from "@mui/material/Link";
import { Chip, Menu, MenuItem, Tooltip, useMediaQuery, useTheme, Collapse, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

// Responsive drawer width
const drawerWidth = 270;
const profileCardWidth = 320;

// Enhanced modern tech theme colors
const accentColor = "#0ea5e9"; // Bright blue
const accentColorDark = "#0284c7"; // Darker blue for hover states
const accentColorLight = "#e0f2fe"; // Very light blue for backgrounds
const bgColor = "#f8fafc"; // Light gray background
const cardBgColor = "#ffffff"; // White for cards
const textPrimaryColor = "#334155"; // Dark gray for text
const textSecondaryColor = "#64748b"; // Medium gray for secondary text
const successColor = "#10b981"; // Green for online status
const warningColor = "#f59e0b"; // Amber for warnings
const gradientBg = "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)"; // Blue gradient

// Custom styled component for responsive search bar
const SearchField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: '40%',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
  bgcolor: "rgba(0,0,0,0.02)",
  borderRadius: 8,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    "& fieldset": {
      borderColor: "rgba(0,0,0,0.08)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0,0,0,0.15)",
    },
    "&.Mui-focused fieldset": {
      borderColor: accentColor,
      borderWidth: 1,
    },
  },
}));

// Custom styled component for floating animation
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

// Custom styled component for pulse animation
const PulseBox = styled(Box)(({ }) => ({
  position: "absolute",
  top: 8,
  left: 8,
  width: 8,
  height: 8,
  borderRadius: "50%",
  bgcolor: warningColor,
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

// Responsive Button Component
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

interface LayoutProps {
  children: React.ReactNode;
  showProfileCard?: boolean;
  title?: string;
}

export default function Layout({
  children,
  showProfileCard = true,
  title,
}: LayoutProps) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [showMobileProfile, setShowMobileProfile] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const handleMobileProfileToggle = () => {
    setShowMobileProfile(!showMobileProfile);
  };

  // Main sections for navigation
  const mainNavItems = [
    { text: "系統公告", icon: <DashboardIcon />, link: "/" },
    { text: "所有看板", icon: <ForumIcon />, link: "/boards" },
    { text: "所有文章", icon: <Article />, link: "/f/0" },
  ];

  // Followed boards with custom icons and online indicators
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

  // Online users
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

  // Drawer content for reuse between permanent and temporary drawers
  const drawerContent = (
    <Box sx={{ overflow: "auto", px: 2, py: 3 }}>
      {isMobile && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      <List disablePadding>
        {mainNavItems.map((item) => (
          <Link key={item.text} href={item.link} underline="none" onClick={isMobile ? handleDrawerToggle : undefined}>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  bgcolor:
                    title === item.text ? accentColorLight : "transparent",
                  color:
                    title === item.text ? accentColor : textPrimaryColor,
                  "&:hover": {
                    bgcolor:
                      title === item.text
                        ? accentColorLight
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
                        ? accentColor
                        : textSecondaryColor,
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

      <Divider sx={{ my: 2.5 }} />

      {/* Enhanced Followed Boards section */}
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
            color: textSecondaryColor,
            fontWeight: 600,
            fontSize: "0.75rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          追蹤看板
        </Typography>
        <Tooltip title="管理看板">
          <IconButton size="small" sx={{ color: textSecondaryColor }}>
            <MoreHoriz fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <List disablePadding>
        {followedBoards.map((item) => (
          <Link key={item.text} href={item.link} underline="none" onClick={isMobile ? handleDrawerToggle : undefined}>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  bgcolor:
                    title === item.text ? accentColorLight : "transparent",
                  color:
                    title === item.text ? accentColor : textPrimaryColor,
                  "&:hover": {
                    bgcolor:
                      title === item.text
                        ? accentColorLight
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
                        ? accentColor
                        : textSecondaryColor,
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
                    color: successColor,
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  // Profile card content for reuse
  const profileCardContent = (
    <>
      <Box
        sx={{
          p: 3,
          bgcolor: cardBgColor,
          borderRadius: 2,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.08)",
          mb: 3,
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Background decoration */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 60,
            background: gradientBg,
          }}
        />

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
                bgcolor: accentColor,
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
            sx={{ fontWeight: 700, color: textPrimaryColor }}
          >
            陳家豪
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: textSecondaryColor,
                mr: 1,
              }}
            >
              @GIAHOW
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}
        >
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
            sx={{ fontSize: 18, color: textSecondaryColor, mr: 1.5 }}
          />
          <Typography variant="body2" sx={{ color: textSecondaryColor }}>
            加入日期
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: textPrimaryColor, ml: "auto" }}
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
            sx={{ fontSize: 18, color: textSecondaryColor, mr: 1.5 }}
          />
          <Typography variant="body2" sx={{ color: textSecondaryColor }}>
            貼文數
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: textPrimaryColor, ml: "auto" }}
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
            sx={{ fontSize: 18, color: textSecondaryColor, mr: 1.5 }}
          />
          <Typography variant="body2" sx={{ color: textSecondaryColor }}>
            按讚數
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: textPrimaryColor, ml: "auto" }}
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
              bgcolor: accentColorLight,
              color: accentColor,
              "&:hover": {
                bgcolor: accentColor,
                color: "white",
              },
            }}
          >
            個人檔案
          </ResponsiveButton>
        </Box>
      </Box>

      <Box
        sx={{
          p: 3,
          bgcolor: cardBgColor,
          borderRadius: 2,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.08)",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 3,
            color: textPrimaryColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PeopleAlt sx={{ mr: 1, color: accentColor }} />
            在線成員
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{ color: successColor, mr: 1, fontWeight: 500 }}
            >
              {onlineUsers.length} 人在線
            </Typography>
            <Circle sx={{ fontSize: 12, color: successColor }} />
          </Box>
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {onlineUsers.map((user, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                p: 2,
                borderRadius: 2,
                bgcolor: "rgba(0,0,0,0.02)",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.04)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                },
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
                <Box sx={{ display: "flex", alignItems: "center", mb: 0.5, flexWrap: "wrap" }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: textPrimaryColor,
                      mr: 1,
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                    }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: textSecondaryColor,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {user.username}
                  </Typography>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: user.status === "活躍中" ? successColor : 
                            user.status === "忙碌中" ? "#ec4899" : 
                            "#f59e0b",
                      fontWeight: 500,
                      mr: 1,
                    }}
                  >
                    {user.status}
                  </Typography>
                  <Circle 
                    sx={{ 
                      fontSize: 8, 
                      color: user.status === "活躍中" ? successColor : 
                             user.status === "忙碌中" ? "#ec4899" : 
                             "#f59e0b",
                      mr: 1, 
                    }} 
                  />
                  <AccessTime sx={{ fontSize: 12, color: textSecondaryColor, mr: 0.5 }} />
                  <Typography
                    variant="caption"
                    sx={{
                      color: textSecondaryColor,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {user.lastActive}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );

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
          {/* Left side with menu icon on mobile */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 1, color: textPrimaryColor }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo with animated gradient effect */}
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: "8px",
                  background: gradientBg,
                  mr: 1.5,
                  boxShadow: "0 2px 8px rgba(14, 165, 233, 0.3)",
                }}
              >
                <ForumIcon sx={{ color: "white" }} />
              </Box>
              {!isMobile && "TechForum"}
              {!isMobile && (
                <Chip
                  label="Beta"
                  size="small"
                  sx={{
                    ml: 1,
                    fontSize: "0.6rem",
                    height: 20,
                    bgcolor: accentColorLight,
                    color: accentColorDark,
                    fontWeight: 600,
                  }}
                />
              )}
            </Typography>
          </Box>

          {/* Enhanced search bar with animations */}
          <SearchField
            placeholder="Search topics, posts, users..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: textSecondaryColor }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Mobile search button */}
          {isMobile && (
            <IconButton 
              onClick={handleSearchToggle}
              sx={{ color: textSecondaryColor }}
            >
              <SearchIcon />
            </IconButton>
          )}

          {/* Enhanced right side user controls */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!isMobile && (
              <Tooltip title="新增貼文">
                <IconButton
                  sx={{
                    mr: 1,
                    color: textSecondaryColor,
                    "&:hover": {
                      color: accentColor,
                      bgcolor: accentColorLight,
                    },
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="通知">
              <IconButton
                sx={{
                  mr: isMobile ? 1 : 2,
                  "&:hover": {
                    color: accentColor,
                    bgcolor: accentColorLight,
                  },
                }}
              >
                <Badge
                  badgeContent={4}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.7rem",
                      boxShadow: "0 2px 5px rgba(14, 165, 233, 0.3)",
                    },
                  }}
                >
                  <NotificationsIcon sx={{ color: textSecondaryColor }} />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="個人選單">
              <IconButton
                onClick={handleMenuClick}
                sx={{
                  p: 0.5,
                  border: `2px solid ${open ? accentColor : "transparent"}`,
                  transition: "all 0.2s",
                  "&:hover": {
                    border: `2px solid ${accentColorLight}`,
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: open ? accentColor : gradientBg,
                    boxShadow: open ? `0 0 0 2px ${accentColorLight}` : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  U
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                  width: 200,
                },
              }}
            >
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                href="/personal"
              >
                <ListItemIcon>
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: accentColor,
                      fontSize: "0.8rem",
                    }}
                  >
                    U
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary="個人檔案" />
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                href="/settings"
              >
                <ListItemIcon>
                  <Edit fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="設置" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <ListItemText primary="登出" onClick={() => router.push('/login')} />
              </MenuItem>
              {isTablet && showProfileCard && (
                <MenuItem onClick={handleMobileProfileToggle}>
                  <ListItemText primary={showMobileProfile ? "隱藏個人資料" : "顯示個人資料"} />
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>

        {/* Mobile search bar */}
        <Collapse in={searchOpen}>
          <Box sx={{ px: 2, pb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search topics, posts, users..."
              variant="outlined"
              size="small"
              sx={{
                bgcolor: "rgba(0,0,0,0.02)",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
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
          </Box>
        </Collapse>
      </AppBar>

      {/* Drawer for desktop - permanent */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: { xs: 'none', sm: 'block' },
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: cardBgColor,
              borderRight: "1px solid rgba(0,0,0,0.08)",
            },
          }}
        >
          <Toolbar />
          {drawerContent}
        </Drawer>
      )}

      {/* Drawer for mobile - temporary */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: cardBgColor,
            borderRight: "1px solid rgba(0,0,0,0.08)",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main content area + profile card */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          mt: searchOpen && isMobile ? 16 : 8,
          position: "relative",
        }}
      >
        <Box sx={{ 
          display: "flex",
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          gap: { xs: 0, md: 3 }
        }}>
          {/* Main content area */}
          <Box sx={{ 
            flexGrow: 1, 
            width: '100%',
            mb: (showMobileProfile && (isMobile || isTablet)) ? 3 : 0
          }}>
            {children}
          </Box>

          {/* Mobile profile toggle button - REMOVED FOR MOBILE */}
          {isTablet && showProfileCard && !showMobileProfile && (
            <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleMobileProfileToggle}
                sx={{
                  borderColor: accentColor,
                  color: accentColor,
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: accentColorDark,
                    backgroundColor: accentColorLight,
                  }
                }}
              >
                顯示個人資料
              </Button>
            </Box>
          )}

          {/* Enhanced right side profile card - HIDDEN ON MOBILE */}
          {((showProfileCard && !isMobile) && 
            (!isTablet || (isTablet && showMobileProfile))) && (
            <Box sx={{ 
              width: { sm: '100%', md: profileCardWidth },
              flexShrink: 0,
              mb: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}>
              {profileCardContent}
              
              {/* Mobile profile hide button - ONLY FOR TABLET, NOT MOBILE */}
              {isTablet && showMobileProfile && (
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    onClick={handleMobileProfileToggle}
                    sx={{
                      borderColor: textSecondaryColor,
                      color: textSecondaryColor,
                      borderRadius: 2,
                      textTransform: 'none',
                      mb: 2,
                    }}
                  >
                    隱藏個人資料
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>

        {/* Enhanced floating action button for new post */}
        <Tooltip title="發布新貼文" placement="left">
          <Link href="/create-post" sx={{ textDecoration: "none" }}>
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                position: "fixed",
                bottom: { xs: 16, sm: 32 },
                right: { xs: 16, sm: 32 },
                bgcolor: accentColor,
                "&:hover": {
                  bgcolor: accentColorDark,
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
      </Box>
    </Box>
  );
}