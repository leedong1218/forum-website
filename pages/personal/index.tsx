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
} from "@mui/material";
import { useEffect, useState } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";
import {
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
  Groups,
  Security,
  Close,
  ContentCopy,
  Check,
  Lock,
  Forum,
  AccessTime,
  Email,
} from "@mui/icons-material";
import Link from "next/link";
import UserAPI from "@/services/User/UserAPI";
import { StatCard } from "@/components/common/Personal/StatCard";
import Detail from "@/components/common/Personal/Detail";
import { posts, boards } from '@/lib/data/personal/detail';

// 主題色彩定義
const accentColor = "#0ea5e9"; // 主藍色
const accentColorLight = "#e0f2fe"; // 淺藍背景色
const accentColorDark = "#0284c7"; // 深藍色

// 定義使用者資料的型別
interface UserProfile {
  username?: string;
  email?: string;
  displayName?: string;
  birthday?: string;
  location?: string;
  avatarUrl?: string;
  coverUrl?: string;
  joinedDate?: string;
  verified?: boolean;
}

// 獲取分類顏色
const getCategoryColor = (category: string) => {
  const categoryColors: { [key: string]: { bg: string; text: string } } = {
    Technology: { bg: "#e0f2fe", text: "#0284c7" },
    "AI & ML": { bg: "#fce7f3", text: "#db2777" },
    Development: { bg: "#dcfce7", text: "#16a34a" },
    Blockchain: { bg: "#fef3c7", text: "#d97706" },
  };

  return categoryColors[category] || { bg: "#f1f5f9", text: "#64748b" };
};

export default function Personal() {
  const [tabValue, setTabValue] = useState(0);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [userCopied, setUserCopied] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>(
    posts.filter((post) => post.isLiked).map((post) => post.id)
  );
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>(
    posts.filter((post) => post.isBookmarked).map((post) => post.id)
  );

  // 初始使用者資料
  const [userProfile, setUserProfile] = useState<UserProfile | null>();
  // const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    UserAPI.self()
      .then(res => setUserProfile(res.data))
      .catch(err => console.error("取得用戶資料失敗", err))
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const STATS_CARDS = [
    { icon: Groups, label: '追蹤者', count: 142 },
    { icon: Groups, label: '正在追蹤', count: 98 },
    { icon: ArticleIcon, label: '文章', count: 56 },
    { icon: ThumbUp, label: '獲得讚數', count: '1.2K' }
  ];

  // 更新個人資料的函數
  const handleProfileUpdate = (p0: string, p1: string) => {
    console.log(p0 + p1);
  };

  // 收藏功能處理
  const handleBookmark = (postId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (bookmarkedPosts.includes(postId)) {
      setBookmarkedPosts(bookmarkedPosts.filter((id) => id !== postId));
    } else {
      setBookmarkedPosts([...bookmarkedPosts, postId]);
    }
  };

  // 複製使用者名稱
  const handleCopyUsername = () => {
    navigator.clipboard.writeText(`@${userProfile?.username}`);
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
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
            src={userProfile?.avatarUrl}
            sx={{
              width: 150,
              height: 150,
              mb: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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

  return (
    <Layout showProfileCard={false}>
      {/* 上半部區塊：背景照、大頭照、暱稱等 */}
      <Box sx={{
        width: '100%', mb: 3, borderRadius: 3, background: '#fff',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <Box sx={{
          p: 4,
          display: 'flex', flexWrap: 'wrap', gap: { xs: 3, md: 0 }
        }}>
          {/* 大頭照區域 */}
          <Box sx={{ mr: 4, position: 'relative' }}>
            <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <Avatar
                sx={{
                  width: 140, height: 140, border: '4px solid white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
                src={userProfile?.avatarUrl}
                alt="Profile Picture"
              />
            </Badge>
            <Tooltip title="更換大頭照">
              <IconButton
                sx={{
                  position: 'absolute', bottom: '50px', right: '-10px',
                  bgcolor: accentColor, color: 'white',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  '&:hover': { bgcolor: accentColorDark },
                  border: '2px solid white'
                }}
                onClick={() => setOpenAvatarDialog(true)}
              >
                <Camera sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* 用戶資訊區域 */}
          <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 0 }, mt: { xs: -8, md: 0 } }}>
            {/* 名稱與編輯按鈕 */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
                {userProfile?.displayName}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setIsEditingProfile(true)}
                sx={{
                  borderRadius: 6, textTransform: 'none',
                  borderColor: 'rgba(0,0,0,0.2)', color: 'text.secondary',
                  fontWeight: 500, px: 2,
                  '&:hover': {
                    borderColor: accentColor, color: accentColor,
                    bgcolor: 'transparent'
                  }
                }}
              >
                編輯個人資料
              </Button>
            </Box>

            {/* 用戶名與加入日期 */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  display: 'flex', alignItems: 'center', cursor: 'pointer',
                  '&:hover': { color: accentColor }
                }}
                onClick={handleCopyUsername}
              >
                @{userProfile?.username}
                <Tooltip title={userCopied ? "已複製" : "複製用戶名稱"}>
                  <IconButton size="small" sx={{ ml: 0.5 }}>
                    {userCopied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Typography>
              <Tooltip title="加入日期">
                <Chip
                  icon={<CalendarMonth sx={{ fontSize: 16 }} />}
                  label={userProfile?.joinedDate}
                  size="small"
                  sx={{
                    fontSize: '0.8rem',
                    bgcolor: 'rgba(0,0,0,0.04)',
                    '& .MuiChip-icon': { color: 'text.secondary' }
                  }}
                  clickable
                />
              </Tooltip>
            </Box>

            {/* 統計卡片 */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              {STATS_CARDS.map((card, index) => (
                <StatCard key={index} icon={card.icon} label={card.label} count={card.count} />
              ))}
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
                                  bgcolor: isLiked
                                    ? "#fee2e2"
                                    : "rgba(0,0,0,0.06)",
                                  color: isLiked ? "#f43f5e" : "text.secondary",
                                  fontWeight: 600,
                                  fontSize: "0.7rem",
                                  right: -16,
                                },
                              }}
                            >
                              {isLiked ? (
                                <Favorite fontSize="small" />
                              ) : (
                                <FavoriteBorder fontSize="small" />
                              )}
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
                              color: isBookmarked
                                ? accentColor
                                : "text.secondary",
                            }}
                          >
                            <Badge
                              badgeContent={post.bookmarks}
                              color="default"
                              sx={{
                                "& .MuiBadge-badge": {
                                  bgcolor: isBookmarked
                                    ? accentColorLight
                                    : "rgba(0,0,0,0.06)",
                                  color: isBookmarked
                                    ? accentColor
                                    : "text.secondary",
                                  fontWeight: 600,
                                  fontSize: "0.7rem",
                                  right: -16,
                                },
                              }}
                            >
                              {isBookmarked ? (
                                <Bookmark fontSize="small" />
                              ) : (
                                <TurnedInNot fontSize="small" />
                              )}
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
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, lineHeight: 1.2 }}
                        >
                          {board.name}
                        </Typography>
                        <Chip
                          label={`活躍度: ${board.activityLevel}`}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.65rem",
                            bgcolor:
                              board.activityLevel === "高"
                                ? "#dcfce7"
                                : "#fef3c7",
                            color:
                              board.activityLevel === "高"
                                ? "#16a34a"
                                : "#d97706",
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

                    <Box
                      sx={{ pt: 2, borderTop: "1px solid rgba(0,0,0,0.06)" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
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
                          bgcolor: board.isFollowing
                            ? "transparent"
                            : accentColor,
                          color: board.isFollowing ? "text.secondary" : "white",
                          border: board.isFollowing
                            ? "1px solid rgba(0,0,0,0.12)"
                            : "none",
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          "&:hover": {
                            bgcolor: board.isFollowing
                              ? "rgba(0,0,0,0.04)"
                              : accentColorDark,
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
          },
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
                src={userProfile?.avatarUrl}
                sx={{
                  width: 120,
                  height: 120,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
                value={userProfile?.username}
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
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="電子信箱"
                value={userProfile?.email}
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
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="顯示名稱"
                value={userProfile?.displayName}
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
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="生日"
                type="date"
                value={userProfile?.birthday}
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
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="居住地"
                value={userProfile?.location}
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
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="個人簡介"
                multiline
                rows={4}
                value={userProfile?.bio}
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
                  },
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
            onClick={handleProfileUpdate}
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
