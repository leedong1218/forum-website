import Layout from "@/components/layout/Layout";
import {
  Box,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
  Chip,
  Card,
  CardContent,
  Badge,
  Tooltip,
  Switch,
} from "@mui/material";
import { useState } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AccessAlarm,
  CalendarMonth,
  Edit,
  Camera,
  AlternateEmail,
  Person as PersonEditIcon,
  LocationOn,
  Cake,
  Description,
  ThumbUp,
  Save,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  TurnedInNot,
  Bookmark,
  Visibility,
  PhotoCamera,
  Groups,
  VerifiedUser,
  Notifications,
  Security,
  Language,
  Close,
  ContentCopy,
  Check,
  Lock,
  DarkMode,
  Forum,
  AccessTime,
  Email,
} from "@mui/icons-material";
import Link from "next/link";

// 主題色彩定義
const accentColor = "#0ea5e9"; // 主藍色
const accentColorLight = "#e0f2fe"; // 淺藍背景色
const accentColorDark = "#0284c7"; // 深藍色
const gradientOverlay = "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.2) 100%)"; // 漸變覆蓋

// 定義使用者資料的型別
interface UserProfile {
  username: string;
  email: string;
  displayName: string;
  birthday: string;
  location: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  joinDate: string;
  verified: boolean;
}

// 獲取分類顏色
const getCategoryColor = (category: string) => {
  const categoryColors: { [key: string]: { bg: string; text: string } } = {
    "Technology": { bg: "#e0f2fe", text: "#0284c7" },
    "AI & ML": { bg: "#fce7f3", text: "#db2777" },
    "Development": { bg: "#dcfce7", text: "#16a34a" },
    "Blockchain": { bg: "#fef3c7", text: "#d97706" },
  };
  
  return categoryColors[category] || { bg: "#f1f5f9", text: "#64748b" };
};

// 樣本文章數據
const posts = [
  {
    id: 1,
    title: "Quantum Computing Breakthroughs",
    description:
      "Discussing the latest advancements in quantum computing and their implications for cybersecurity. This post looks at recent findings and their potential impact on encryption standards.",
    author: "TechExplorer",
    avatar: "T",
    category: "Technology",
    comments: 42,
    views: 1287,
    likes: 95,
    bookmarks: 32,
    timestamp: "2 hours ago",
    isLiked: true,
    isBookmarked: false,
    link: "/post/1",
  },
  {
    id: 2,
    title: "AI Model Architecture Design",
    description:
      "Share your experiences with different AI model architectures and optimization techniques. I've been experimenting with transformer models and found some interesting performance tradeoffs.",
    author: "DataScientist",
    avatar: "D",
    category: "AI & ML",
    comments: 28,
    views: 956,
    likes: 73,
    bookmarks: 27,
    timestamp: "5 hours ago",
    isLiked: false,
    isBookmarked: true,
    link: "/post/2",
  },
  {
    id: 3,
    title: "Future of Web Development",
    description:
      "Exploring emerging technologies that will shape the future of web applications. WebAssembly, edge computing, and new JavaScript frameworks are changing how we build for the web.",
    author: "CodeCrafter",
    avatar: "C",
    category: "Development",
    comments: 36,
    views: 1105,
    likes: 82,
    bookmarks: 41,
    timestamp: "1 day ago",
    isLiked: true,
    isBookmarked: false,
    link: "/post/3",
  },
];

// 樣本看板數據
const boards = [
  {
    id: 1,
    name: "Technology",
    description: "討論最新科技趨勢、產品和創新，分享科技新聞及見解。",
    members: 12480,
    posts: 4235,
    icon: "T",
    color: "#0284c7",
    isFollowing: true,
    activityLevel: "高",
  },
  {
    id: 2,
    name: "Programming",
    description: "程式設計師社群，分享程式技巧、專案經驗和學習資源。",
    members: 9750,
    posts: 3678,
    icon: "P",
    color: "#16a34a",
    isFollowing: true,
    activityLevel: "高",
  },
  {
    id: 3,
    name: "AI & Machine Learning",
    description: "人工智能與機器學習的討論區，交流最新研究和應用。",
    members: 8320,
    posts: 2789,
    icon: "A",
    color: "#db2777",
    isFollowing: true,
    activityLevel: "中",
  },
  {
    id: 4,
    name: "Blockchain",
    description: "區塊鏈技術與加密貨幣的專業討論，包括開發和應用案例。",
    members: 6450,
    posts: 1876,
    icon: "B",
    color: "#d97706",
    isFollowing: true,
    activityLevel: "中",
  },
];

export default function Personal() {
  const [tabValue, setTabValue] = useState(0);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [openCoverDialog, setOpenCoverDialog] = useState(false);
  const [userCopied, setUserCopied] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>(
    posts.filter(post => post.isLiked).map(post => post.id)
  );
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>(
    posts.filter(post => post.isBookmarked).map(post => post.id)
  );

  // 初始使用者資料
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: "giahow",
    email: "giahow@example.com",
    displayName: "陳家豪",
    birthday: "1990-01-01",
    location: "台北市",
    bio: "資深軟體工程師｜人工智能愛好者｜喜歡分享心得和閱讀各種有趣的討論｜TechForum 活躍貢獻者",
    avatarUrl: "/api/placeholder/200/200",
    coverUrl: "/api/placeholder/1200/400",
    joinDate: "2025-03-15",
    verified: true,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // 更新個人資料的函數
  const handleProfileUpdate = (field: keyof UserProfile, value: string) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 儲存變更
  const handleSaveProfile = () => {
    // 在實際應用中，這裡會呼叫 API 來儲存資料
    console.log("儲存的使用者資料:", userProfile);
    setIsEditingProfile(false);
  };

  // 點讚功能處理
  const handleLike = (postId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  // 收藏功能處理
  const handleBookmark = (postId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (bookmarkedPosts.includes(postId)) {
      setBookmarkedPosts(bookmarkedPosts.filter(id => id !== postId));
    } else {
      setBookmarkedPosts([...bookmarkedPosts, postId]);
    }
  };

  // 複製使用者名稱
  const handleCopyUsername = () => {
    navigator.clipboard.writeText(`@${userProfile.username}`);
    setUserCopied(true);
    setTimeout(() => setUserCopied(false), 2000);
  };

  // 更換大頭照的對話框
  const AvatarUploadDialog = () => (
    <Dialog 
      open={openAvatarDialog} 
      onClose={() => setOpenAvatarDialog(false)}
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 1, 
        fontWeight: 600,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        更換大頭照
        <IconButton onClick={() => setOpenAvatarDialog(false)} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 2,
          }}
        >
          <Avatar
            src={userProfile.avatarUrl}
            sx={{ 
              width: 150, 
              height: 150, 
              mb: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)" 
            }}
          />
          <Button 
            variant="contained" 
            component="label" 
            startIcon={<Camera />}
            sx={{
              bgcolor: accentColor,
              "&:hover": {
                bgcolor: accentColorDark,
              },
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            選擇圖片
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    handleProfileUpdate("avatarUrl", reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </Button>
          <Typography variant="caption" sx={{ mt: 2, color: "text.secondary" }}>
            支援 JPG、GIF 或 PNG 檔案。檔案大小上限為 10MB。
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={() => setOpenAvatarDialog(false)}
          sx={{ 
            borderRadius: 2,
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          取消
        </Button>
        <Button 
          onClick={() => setOpenAvatarDialog(false)} 
          variant="contained"
          sx={{
            bgcolor: accentColor,
            "&:hover": {
              bgcolor: accentColorDark,
            },
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          套用變更
        </Button>
      </DialogActions>
    </Dialog>
  );

  // 更換封面照片對話框
  const CoverUploadDialog = () => (
    <Dialog 
      open={openCoverDialog} 
      onClose={() => setOpenCoverDialog(false)}
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 1, 
        fontWeight: 600,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        更換封面照片
        <IconButton onClick={() => setOpenCoverDialog(false)} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 150,
              backgroundImage: `url(${userProfile.coverUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
              mb: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          />
          <Button 
            variant="contained" 
            component="label" 
            startIcon={<Camera />}
            sx={{
              bgcolor: accentColor,
              "&:hover": {
                bgcolor: accentColorDark,
              },
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            選擇圖片
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    handleProfileUpdate("coverUrl", reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </Button>
          <Typography variant="caption" sx={{ mt: 2, color: "text.secondary" }}>
            建議使用寬度至少 1200 像素的橫向圖片。檔案大小上限為 10MB。
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={() => setOpenCoverDialog(false)}
          sx={{ 
            borderRadius: 2,
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          取消
        </Button>
        <Button 
          onClick={() => setOpenCoverDialog(false)} 
          variant="contained"
          sx={{
            bgcolor: accentColor,
            "&:hover": {
              bgcolor: accentColorDark,
            },
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          套用變更
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Layout showProfileCard={false}>
      {/* 上半部區塊：背景照、大頭照、暱稱等 */}
      <Box
        sx={{
          width: "100%",
          mb: 3,
          borderRadius: 3,
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.08)",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        {/* 背景照片 */}
        <Box
          sx={{
            height: 240,
            backgroundImage: `url(${userProfile.coverUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: gradientOverlay,
            }
          }}
        >
          {/* 封面照片編輯按鈕 */}
          <Tooltip title="更換封面照片">
            <IconButton
              sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
                bgcolor: "rgba(255,255,255,0.9)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                "&:hover": {
                  bgcolor: "white",
                },
                zIndex: 1,
              }}
              onClick={() => setOpenCoverDialog(true)}
            >
              <PhotoCamera />
            </IconButton>
          </Tooltip>
        </Box>

        {/* 個人資訊區域 */}
        <Box sx={{ p: 4, pt: 0, position: "relative" }}>
          {/* 大頭照 */}
          <Box sx={{ position: "relative", width: "fit-content" }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                userProfile.verified && (
                  <Tooltip title="已驗證用戶">
                    <Avatar
                      sx={{
                        bgcolor: accentColor,
                        width: 28,
                        height: 28,
                        border: "3px solid white",
                      }}
                    >
                      <VerifiedUser sx={{ fontSize: 16, color: "white" }} />
                    </Avatar>
                  </Tooltip>
                )
              }
            >
              <Avatar
                sx={{
                  width: 140,
                  height: 140,
                  border: "4px solid white",
                  position: "relative",
                  top: -70,
                  marginBottom: -8,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
                src={userProfile.avatarUrl}
                alt="Profile Picture"
              />
            </Badge>
            
            {/* 頭像編輯按鈕 */}
            <Tooltip title="更換大頭照">
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: accentColor,
                  color: "white",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  "&:hover": {
                    bgcolor: accentColorDark,
                  },
                  border: "2px solid white",
                }}
                onClick={() => setOpenAvatarDialog(true)}
              >
                <Camera sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* 暱稱與簡短介紹 */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: "#1e293b",
                }}
              >
                {userProfile.displayName}
              </Typography>
              
              {/* 編輯資料按鈕 */}
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setIsEditingProfile(true)}
                sx={{
                  ml: 2,
                  borderRadius: 6,
                  textTransform: "none",
                  borderColor: "rgba(0,0,0,0.2)",
                  color: "text.secondary",
                  fontWeight: 500,
                  px: 2,
                  "&:hover": {
                    borderColor: accentColor,
                    color: accentColor,
                    bgcolor: "transparent",
                  },
                }}
              >
                編輯個人資料
              </Button>
            </Box>
            
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography 
                variant="subtitle1" 
                color="text.secondary"
                sx={{ 
                  display: "flex", 
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": {
                    color: accentColor,
                  }
                }}
                onClick={handleCopyUsername}
              >
                @{userProfile.username}
                <Tooltip title={userCopied ? "已複製" : "複製用戶名稱"}>
                  <IconButton size="small" sx={{ ml: 0.5 }}>
                    {userCopied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Typography>
              
              <Tooltip title="查看位置">
                <Chip 
                  icon={<LocationOn sx={{ fontSize: 16 }} />}
                  label={userProfile.location}
                  size="small"
                  sx={{ 
                    ml: 2,
                    fontSize: "0.8rem",
                    bgcolor: "rgba(0,0,0,0.04)",
                    "& .MuiChip-icon": {
                      color: "text.secondary"
                    }
                  }}
                  clickable
                />
              </Tooltip>
              
              <Tooltip title="加入日期">
                <Chip 
                  icon={<CalendarMonth sx={{ fontSize: 16 }} />}
                  label={new Date(userProfile.joinDate).toLocaleDateString('zh-TW', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                  size="small"
                  sx={{ 
                    ml: 1,
                    fontSize: "0.8rem",
                    bgcolor: "rgba(0,0,0,0.04)",
                    "& .MuiChip-icon": {
                      color: "text.secondary"
                    }
                  }}
                  clickable
                />
              </Tooltip>
            </Box>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3, 
                maxWidth: "100%",
                color: "#475569",
                lineHeight: 1.6,
              }}
            >
              {userProfile.bio}
            </Typography>

            {/* 追蹤數據卡片 */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 2,
              }}
            >
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  minWidth: 120,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    borderColor: "rgba(0,0,0,0.12)",
                  }
                }}
              >
                <Groups sx={{ color: accentColor, mr: 1.5, fontSize: 24 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    142
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    追蹤者
                  </Typography>
                </Box>
              </Paper>
              
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  minWidth: 120,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    borderColor: "rgba(0,0,0,0.12)",
                  }
                }}
              >
                <Groups sx={{ color: accentColor, mr: 1.5, fontSize: 24 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    98
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    正在追蹤
                  </Typography>
                </Box>
              </Paper>
              
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  minWidth: 120,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    borderColor: "rgba(0,0,0,0.12)",
                  }
                }}
              >
                <ArticleIcon sx={{ color: accentColor, mr: 1.5, fontSize: 24 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    56
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    文章
                  </Typography>
                </Box>
              </Paper>
              
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  minWidth: 120,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    borderColor: "rgba(0,0,0,0.12)",
                  }
                }}
              >
                <ThumbUp sx={{ color: accentColor, mr: 1.5, fontSize: 24 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    1.2K
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    獲得讚數
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 下半部區塊：分頁內容 */}
      <Box
        sx={{
          width: "100%",
          borderRadius: 3,
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.08)",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        {/* 分頁標籤 */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ 
            borderBottom: 1, 
            borderColor: "divider",
            "& .MuiTabs-indicator": {
              backgroundColor: accentColor,
              height: 3,
              borderRadius: "3px 3px 0 0",
            },
          }}
        >
          <Tab 
            icon={<ArticleIcon />} 
            iconPosition="start"
            label="發布的文章" 
            sx={{ 
              textTransform: "none", 
              fontWeight: tabValue === 0 ? 600 : 400,
              fontSize: "0.95rem",
              color: tabValue === 0 ? accentColor : "text.secondary",
              minHeight: 56,
            }} 
          />
          <Tab 
            icon={<BookmarkIcon />} 
            iconPosition="start"
            label="追蹤的看板" 
            sx={{ 
              textTransform: "none", 
              fontWeight: tabValue === 1 ? 600 : 400,
              fontSize: "0.95rem",
              color: tabValue === 1 ? accentColor : "text.secondary",
              minHeight: 56,
            }} 
          />
          <Tab 
            icon={<PersonIcon />} 
            iconPosition="start"
            label="個人資訊" 
            sx={{ 
              textTransform: "none", 
              fontWeight: tabValue === 2 ? 600 : 400,
              fontSize: "0.95rem",
              color: tabValue === 2 ? accentColor : "text.secondary",
              minHeight: 56,
            }} 
          />
          <Tab 
            icon={<SettingsIcon />} 
            iconPosition="start"
            label="設定" 
            sx={{ 
              textTransform: "none", 
              fontWeight: tabValue === 3 ? 600 : 400,
              fontSize: "0.95rem",
              color: tabValue === 3 ? accentColor : "text.secondary",
              minHeight: 56,
            }} 
          />
        </Tabs>

        {/* 發布的文章 */}
        <TabPanel value={tabValue} index={0}>
          <List sx={{ width: "100%" }}>
            {posts.map((post, index) => {
              const isLiked = likedPosts.includes(post.id);
              const isBookmarked = bookmarkedPosts.includes(post.id);
              const categoryColor = getCategoryColor(post.category);
              
              return (
                <Card
                  component={Link}
                  href={post.link || `/post/${post.id}`}
                  key={index}
                  sx={{
                    mb: 3,
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                    },
                    border: "1px solid #f0f0f0",
                    textDecoration: "none",
                    overflow: "hidden",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Chip
                          size="small"
                          label={post.category}
                          sx={{
                            backgroundColor: categoryColor.bg,
                            color: categoryColor.text,
                            fontWeight: 600,
                            borderRadius: 1.5,
                            fontSize: "0.75rem",
                            height: 24,
                            mr: 2,
                          }}
                        />

                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ 
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            color: "#1e293b",
                          }}
                        >
                          {post.title}
                        </Typography>
                      </Box>

                      <Box 
                        sx={{ 
                          display: "flex", 
                          alignItems: "center",
                          color: "text.secondary",
                          fontSize: "0.75rem",
                        }}
                      >
                        <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                        {post.timestamp}
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "#64748b",
                        lineHeight: 1.6,
                      }}
                    >
                      {post.description}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                        pt: 2,
                        borderTop: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 2 }}>
                        {/* 點讚 */}
                        <Tooltip title={isLiked ? "取消點讚" : "點讚"}>
                          <IconButton
                            onClick={(e) => handleLike(post.id, e)}
                            size="small"
                            sx={{ 
                              p: 0.5,
                              color: isLiked ? "#f43f5e" : "text.secondary",
                            }}
                          >
                            <Badge 
                              badgeContent={post.likes} 
                              color="default"
                              sx={{
                                "& .MuiBadge-badge": {
                                  bgcolor: isLiked ? "#fee2e2" : "rgba(0,0,0,0.06)",
                                  color: isLiked ? "#f43f5e" : "text.secondary",
                                  fontWeight: 600,
                                  fontSize: "0.7rem",
                                  right: -16,
                                },
                              }}
                            >
                              {isLiked ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
                            </Badge>
                          </IconButton>
                        </Tooltip>
                        
                        {/* 評論 */}
                        <Tooltip title="查看評論">
                          <IconButton
                            size="small"
                            sx={{ 
                              p: 0.5,
                              color: "text.secondary",
                            }}
                          >
                            <Badge 
                              badgeContent={post.comments} 
                              color="default"
                              sx={{
                                "& .MuiBadge-badge": {
                                  bgcolor: "rgba(0,0,0,0.06)",
                                  color: "text.secondary",
                                  fontWeight: 600,
                                  fontSize: "0.7rem",
                                  right: -16,
                                },
                              }}
                            >
                              <ChatBubbleOutline fontSize="small" />
                            </Badge>
                          </IconButton>
                        </Tooltip>
                        
                        {/* 收藏 */}
                        <Tooltip title={isBookmarked ? "取消收藏" : "收藏"}>
                          <IconButton
                            onClick={(e) => handleBookmark(post.id, e)}
                            size="small"
                            sx={{ 
                              p: 0.5,
                              color: isBookmarked ? accentColor : "text.secondary",
                            }}
                          >
                            <Badge 
                              badgeContent={post.bookmarks} 
                              color="default"
                              sx={{
                                "& .MuiBadge-badge": {
                                  bgcolor: isBookmarked ? accentColorLight : "rgba(0,0,0,0.06)",
                                  color: isBookmarked ? accentColor : "text.secondary",
                                  fontWeight: 600,
                                  fontSize: "0.7rem",
                                  right: -16,
                                },
                              }}
                            >
                              {isBookmarked ? <Bookmark fontSize="small" /> : <TurnedInNot fontSize="small" />}
                            </Badge>
                          </IconButton>
                        </Tooltip>
                      </Box>
                      
                      {/* 檢視次數 */}
                      <Box 
                        sx={{ 
                          display: "flex", 
                          alignItems: "center",
                          color: "text.secondary",
                          fontSize: "0.75rem",
                        }}
                      >
                        <Visibility sx={{ fontSize: 16, mr: 0.5 }} />
                        {post.views.toLocaleString()}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </List>
        </TabPanel>

        {/* 追蹤的看板 */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {boards.map((board) => (
              <Grid item xs={12} sm={6} md={3} key={board.id}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
                      borderColor: "rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 3,
                      pb: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: board.color,
                          fontWeight: 600,
                          mr: 1.5,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {board.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                          {board.name}
                        </Typography>
                        <Chip 
                          label={`活躍度: ${board.activityLevel}`} 
                          size="small"
                          sx={{ 
                            height: 20,
                            fontSize: "0.65rem",
                            bgcolor: board.activityLevel === "高" ? "#dcfce7" : "#fef3c7",
                            color: board.activityLevel === "高" ? "#16a34a" : "#d97706",
                            fontWeight: 600,
                            mt: 0.5,
                          }}
                        />
                      </Box>
                    </Box>
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ 
                        mb: 2, 
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        flexGrow: 1,
                      }}
                    >
                      {board.description}
                    </Typography>
                    
                    <Box sx={{ pt: 2, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                      <Box sx={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        mb: 2,
                      }}>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            display: "flex", 
                            alignItems: "center",
                            color: "text.secondary",
                            fontWeight: 500,
                          }}
                        >
                          <Groups sx={{ mr: 0.5, fontSize: 14 }} />
                          {board.members.toLocaleString()} 成員
                        </Typography>
                        
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            display: "flex", 
                            alignItems: "center",
                            color: "text.secondary",
                            fontWeight: 500,
                          }}
                        >
                          <Forum sx={{ mr: 0.5, fontSize: 14 }} />
                          {board.posts.toLocaleString()} 文章
                        </Typography>
                      </Box>
                      
                      <Button 
                        fullWidth
                        variant="contained"
                        sx={{
                          bgcolor: board.isFollowing ? "transparent" : accentColor,
                          color: board.isFollowing ? "text.secondary" : "white",
                          border: board.isFollowing ? "1px solid rgba(0,0,0,0.12)" : "none",
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          "&:hover": {
                            bgcolor: board.isFollowing ? "rgba(0,0,0,0.04)" : accentColorDark,
                          },
                        }}
                      >
                        {board.isFollowing ? "已追蹤" : "追蹤"}
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* 個人資訊 */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: "flex", flexDirection: "column", maxWidth: 800, mx: "auto" }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                p: 3,
                mb: 3,
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 2,
                  color: "#1e293b", 
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PersonIcon sx={{ mr: 1, color: accentColor }} />
                基本資料
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    display: "flex", 
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}>
                    <PersonEditIcon sx={{ color: accentColor, mr: 2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        顯示名稱
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {userProfile.displayName}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    display: "flex", 
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}>
                    <AlternateEmail sx={{ color: accentColor, mr: 2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        使用者名稱
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        @{userProfile.username}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    display: "flex", 
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}>
                    <Email sx={{ color: accentColor, mr: 2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        電子郵件
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {userProfile.email}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    display: "flex", 
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}>
                    <Cake sx={{ color: accentColor, mr: 2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        生日
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {new Date(userProfile.birthday).toLocaleDateString('zh-TW')}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    display: "flex", 
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}>
                    <LocationOn sx={{ color: accentColor, mr: 2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        居住地
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {userProfile.location}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    display: "flex", 
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}>
                    <CalendarMonth sx={{ color: accentColor, mr: 2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        加入日期
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {new Date(userProfile.joinDate).toLocaleDateString('zh-TW', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() => setIsEditingProfile(true)}
                  sx={{
                    borderRadius: 6,
                    textTransform: "none",
                    borderColor: accentColor,
                    color: accentColor,
                    fontWeight: 500,
                    px: 3,
                    "&:hover": {
                      borderColor: accentColorDark,
                      bgcolor: accentColorLight,
                    },
                  }}
                >
                  編輯個人資料
                </Button>
              </Box>
            </Paper>
            
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                p: 3,
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 2,
                  color: "#1e293b", 
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArticleIcon sx={{ mr: 1, color: accentColor }} />
                活動統計
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ 
                    display: "flex", 
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}>
                    <ArticleIcon sx={{ color: accentColor, mr: 2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        發布文章數
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        56
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ 
                    display: "flex", 
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}>
                    <ThumbUp sx={{ color: accentColor, mr: 2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        被讚數
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        1,250
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ 
                    display: "flex", 
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "rgba(0,0,0,0.02)",
                  }}>
                    <AccessAlarm sx={{ color: accentColor, mr: 2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        最後上線時間
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        剛剛
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </TabPanel>

        {/* 設定 */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                p: 3,
                mb: 3,
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 3,
                  color: "#1e293b", 
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Security sx={{ mr: 1, color: accentColor }} />
                帳號與安全
              </Typography>
              
              <List disablePadding>
                <ListItem 
                  sx={{ 
                    mb: 1, 
                    py: 2, 
                    px: 3, 
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.02)",
                    },
                    transition: "background-color 0.2s",
                  }}
                >
                  <ListItemIcon>
                    <Lock sx={{ color: accentColor }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="密碼設定"
                    secondary="更改您的密碼和安全性設定"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: 6,
                      textTransform: "none",
                      borderColor: accentColor,
                      color: accentColor,
                      fontWeight: 500,
                      "&:hover": {
                        borderColor: accentColorDark,
                        bgcolor: accentColorLight,
                      },
                    }}
                  >
                    修改
                  </Button>
                </ListItem>
                
                <ListItem 
                  sx={{ 
                    mb: 1, 
                    py: 2, 
                    px: 3, 
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.02)",
                    },
                    transition: "background-color 0.2s",
                  }}
                >
                  <ListItemIcon>
                    <Email sx={{ color: accentColor }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="電子郵件設定"
                    secondary="更改或驗證您的電子郵件地址"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: 6,
                      textTransform: "none",
                      borderColor: accentColor,
                      color: accentColor,
                      fontWeight: 500,
                      "&:hover": {
                        borderColor: accentColorDark,
                        bgcolor: accentColorLight,
                      },
                    }}
                  >
                    修改
                  </Button>
                </ListItem>
              </List>
            </Paper>
            
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                p: 3,
                mb: 3,
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 3,
                  color: "#1e293b", 
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Notifications sx={{ mr: 1, color: accentColor }} />
                通知設定
              </Typography>
              
              <List disablePadding>
                <ListItem 
                  sx={{ 
                    py: 1.5, 
                    px: 3, 
                    borderRadius: 2,
                  }}
                >
                  <ListItemText
                    primary="新追蹤通知"
                    secondary="有人追蹤您時收到通知"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <Switch defaultChecked />
                </ListItem>
                
                <ListItem 
                  sx={{ 
                    py: 1.5, 
                    px: 3, 
                    borderRadius: 2,
                  }}
                >
                  <ListItemText
                    primary="點讚通知"
                    secondary="有人對您的文章點讚時收到通知"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <Switch defaultChecked />
                </ListItem>
                
                <ListItem 
                  sx={{ 
                    py: 1.5, 
                    px: 3, 
                    borderRadius: 2,
                  }}
                >
                  <ListItemText
                    primary="留言通知"
                    secondary="有人對您的文章留言時收到通知"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <Switch defaultChecked />
                </ListItem>
                
                <ListItem 
                  sx={{ 
                    py: 1.5, 
                    px: 3, 
                    borderRadius: 2,
                  }}
                >
                  <ListItemText
                    primary="系統通知"
                    secondary="接收重要的系統更新和公告"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <Switch defaultChecked />
                </ListItem>
              </List>
            </Paper>
            
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                p: 3,
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 3,
                  color: "#1e293b", 
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <DarkMode sx={{ mr: 1, color: accentColor }} />
                顯示與語言
              </Typography>
              
              <List disablePadding>
                <ListItem 
                  sx={{ 
                    py: 1.5, 
                    px: 3, 
                    borderRadius: 2,
                  }}
                >
                  <ListItemIcon>
                    <DarkMode sx={{ color: accentColor }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="深色模式"
                    secondary="切換深色主題以減輕眼睛負擔"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <Switch />
                </ListItem>
                
                <ListItem 
                  sx={{ 
                    py: 1.5, 
                    px: 3, 
                    borderRadius: 2,
                  }}
                >
                  <ListItemIcon>
                    <Language sx={{ color: accentColor }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="語言設定"
                    secondary="選擇您偏好的界面語言"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: 6,
                      textTransform: "none",
                      borderColor: "rgba(0,0,0,0.12)",
                      color: "text.secondary",
                      fontWeight: 500,
                      "&:hover": {
                        borderColor: accentColor,
                        color: accentColor,
                      },
                    }}
                  >
                    繁體中文
                  </Button>
                </ListItem>
              </List>
            </Paper>
          </Box>
        </TabPanel>
      </Box>

      {/* 編輯資料對話框 */}
      <Dialog
        open={isEditingProfile}
        onClose={() => setIsEditingProfile(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            pb: 1, 
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
          }}
        >
          編輯個人資料
          <IconButton onClick={() => setIsEditingProfile(false)} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={userProfile.avatarUrl}
                sx={{ 
                  width: 120, 
                  height: 120,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)" 
                }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: accentColor,
                  color: "white",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  "&:hover": {
                    bgcolor: accentColorDark,
                  },
                  border: "2px solid white",
                }}
                onClick={() => setOpenAvatarDialog(true)}
              >
                <Camera />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="使用者帳號"
                value={userProfile.username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmail />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                onChange={(e) =>
                  handleProfileUpdate("username", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="電子信箱"
                value={userProfile.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmail />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                onChange={(e) => handleProfileUpdate("email", e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="顯示名稱"
                value={userProfile.displayName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonEditIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                onChange={(e) =>
                  handleProfileUpdate("displayName", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="生日"
                type="date"
                value={userProfile.birthday}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Cake />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                onChange={(e) =>
                  handleProfileUpdate("birthday", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="居住地"
                value={userProfile.location}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                onChange={(e) =>
                  handleProfileUpdate("location", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="個人簡介"
                multiline
                rows={4}
                value={userProfile.bio}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setIsEditingProfile(false)}
            sx={{ 
              borderRadius: 2,
              color: "text.secondary",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            取消
          </Button>
          <Button
            onClick={handleSaveProfile}
            color="primary"
            startIcon={<Save />}
            variant="contained"
            sx={{
              bgcolor: accentColor,
              "&:hover": {
                bgcolor: accentColorDark,
              },
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            儲存變更
          </Button>
        </DialogActions>
      </Dialog>

      {/* 大頭照上傳對話框 */}
      <AvatarUploadDialog />

      {/* 封面照片上傳對話框 */}
      <CoverUploadDialog />
    </Layout>
  );
}

type Props = {
  children: React.ReactNode;
  value: number;
  index: number;
};

function TabPanel(props: Props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ padding: 24 }}
    >
      {value === index && children}
    </div>
  );
}