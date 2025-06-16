import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import MenuIcon from "@mui/icons-material/Menu";
import { Edit } from "@mui/icons-material";
import Link from "@mui/material/Link";
import {
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { colors } from "@/styles/theme";
import NotificationPopover from "@/components/common/NotiPopup";
import { useNotification } from "@/lib/context/NotificationContext";

const SearchField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "40%",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
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
      borderColor: colors.accent,
      borderWidth: 1,
    },
  },
}));

interface NavbarProps {
  showProfileCard?: boolean;
  title?: string;
  handleDrawerToggle: () => void; // 接收來自父元件的函數
  isCompactView?: boolean; // 添加檢查是否為壓縮視圖的屬性
  isLogin?: boolean;
}

export default function Navbar({
  handleDrawerToggle,
  isCompactView = false,
  isLogin = false,
}: NavbarProps) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [firstName, setFirstName] = useState<string | null>();
  const open = Boolean(anchorEl);
  const { notifications } = useNotification();

  useEffect(() => {
    setFirstName(localStorage.getItem('firstName'))
  }, [])

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchClick = () => {
    handleDrawerToggle();
  };

  const [notiAnchorEl, setNotiAnchorEl] = useState<null | HTMLElement>(null);
  const notiOpen = Boolean(notiAnchorEl);

  const handleToggleNoti = (event: React.MouseEvent<HTMLElement>) => {
    if (notiAnchorEl) {
      setNotiAnchorEl(null);
    } else {
      setNotiAnchorEl(event.currentTarget);
    }
  };

  const handleCloseNoti = () => {
    setNotiAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: 9999,
        bgcolor: colors.cardBg,
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side with menu icon on mobile or compact view */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {(isMobile || isCompactView) && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, color: colors.textPrimary }}
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
              color: colors.textPrimary,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              onClick={() => router.push('/')}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "8px",
                background: colors.gradient,
                mr: 1.5,
                boxShadow: "0 2px 8px rgba(14, 165, 233, 0.3)",
              }}
            >
              <ForumIcon sx={{ color: "white" }} />
            </Box>
            {!isMobile && "TechForum"}
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
                <SearchIcon sx={{ color: colors.textSecondary }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Mobile search button now triggers drawer toggle */}
        {(isMobile || isCompactView) && (
          <IconButton
            onClick={handleSearchClick}
            sx={{ color: colors.textSecondary }}
          >
            <SearchIcon />
          </IconButton>
        )}

        {/* Enhanced right side user controls */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!isMobile && isLogin && (
            <Tooltip title="新增貼文">
              <IconButton
                sx={{
                  mr: 1,
                  color: colors.textSecondary,
                  "&:hover": {
                    color: colors.accent,
                    bgcolor: colors.accentLight,
                  },
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          )}
          {isLogin && (
            <Tooltip title="通知">
              <IconButton
                sx={{
                  mr: isMobile ? 1 : 2,
                  "&:hover": {
                    color: colors.accent,
                    bgcolor: colors.accentLight,
                  },
                }}
                onClick={e => handleToggleNoti(e)}
              >
            <Badge
              badgeContent={notifications.length > 5 ? '5+' : notifications.length}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.7rem",
                  boxShadow: "0 2px 5px rgba(14, 165, 233, 0.3)",
                },
              }}
            >
              <NotificationsIcon sx={{ color: colors.textSecondary }} />
            </Badge>

              </IconButton>
            </Tooltip>
          )}

          {isLogin && (
            <>
              <Tooltip title="個人選單">
                <IconButton
                  onClick={handleMenuClick}
                  sx={{
                    p: 0.5,
                    border: `2px solid ${open ? colors.accent : "transparent"}`,
                    transition: "all 0.2s",
                    "&:hover": {
                      border: `2px solid ${colors.accentLight}`,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: open ? colors.accent : colors.gradient,
                      boxShadow: open
                        ? `0 0 0 2px ${colors.accentLight}`
                        : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {firstName}
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
                        bgcolor: colors.accent,
                        fontSize: "0.8rem",
                      }}
                    >
                      {firstName}
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
                  <ListItemText
                    primary="登出"
                    onClick={() => router.push("/login")}
                  />
                </MenuItem>
              </Menu>
            </>
          )}
          {!isLogin && (
            <MenuItem onClick={handleMenuClose}>
              <ListItemText
                sx={{ color: "#000" }}
                primary="登入"
                onClick={() => router.push("/login")}
              />
            </MenuItem>
          )}
        </Box>
      </Toolbar>
      <NotificationPopover
        anchorEl={notiAnchorEl}
        open={notiOpen}
        onClose={handleCloseNoti}
        notifications={notifications}
      />
    </AppBar>
  );
}
