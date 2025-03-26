import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  IconButton,
  Badge,
  Tooltip,
  Paper,
  InputBase,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  TurnedInNot,
  Bookmark,
  Search,
  TrendingUp,
  NewReleases,
  ViewModule,
  ViewList,
  Forum,
  AccessTime,
  Visibility,
  Sort,
  Add,
  NotificationsActive,
} from "@mui/icons-material";
import Link from "next/link";

// 主題色彩定義
const accentColor = "#0ea5e9"; // 主色調藍色
const accentColorLight = "#e0f2fe"; // 淺藍背景色
const accentColorDark = "#0284c7"; // 深藍色用於懸停
const gradientBg = "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)"; // 藍色漸變

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

// 文章資料類型
interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
  avatar: string;
  category: string;
  comments: number;
  views: number;
  likes?: number;
  bookmarks?: number;
  timestamp: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
}

// 擴充範例文章資料
const samplePosts: Post[] = [
  {
    id: 1,
    title: "Quantum Computing Breakthroughs",
    description:
      "Discussing the latest advancements in quantum computing and their implications for cybersecurity. This post explores how quantum supremacy affects our current encryption standards.",
    author: "TechExplorer",
    avatar: "T",
    category: "Technology",
    comments: 42,
    views: 1287,
    likes: 156,
    bookmarks: 89,
    timestamp: "2 hours ago",
    isLiked: true,
    isBookmarked: false,
    isTrending: true,
  },
  {
    id: 2,
    title: "AI Model Architecture Design",
    description:
      "Share your experiences with different AI model architectures and optimization techniques. What are the key considerations when designing transformer-based models?",
    author: "DataScientist",
    avatar: "D",
    category: "AI & ML",
    comments: 28,
    views: 956,
    likes: 118,
    bookmarks: 72,
    timestamp: "5 hours ago",
    isLiked: false,
    isBookmarked: true,
    isNew: true,
  },
  {
    id: 3,
    title: "Future of Web Development",
    description:
      "Exploring emerging technologies that will shape the future of web applications. WebAssembly, server components, and edge computing are changing how we build for the web.",
    author: "CodeCrafter",
    avatar: "C",
    category: "Development",
    comments: 36,
    views: 1105,
    likes: 203,
    bookmarks: 97,
    timestamp: "8 hours ago",
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: 4,
    title: "Blockchain Implementation Challenges",
    description:
      "Discussion thread for solving common blockchain implementation issues in enterprise applications. Let's address scalability, performance, and integration hurdles.",
    author: "BlockchainDev",
    avatar: "B",
    category: "Blockchain",
    comments: 19,
    views: 672,
    likes: 87,
    bookmarks: 54,
    timestamp: "1 day ago",
    isLiked: false,
    isBookmarked: false,
    isTrending: true,
  },
  {
    id: 5,
    title: "Modern CSS Techniques for 2025",
    description:
      "A comprehensive guide on using modern CSS features like Container Queries, CSS Layers, and Subgrid. These powerful features are changing how we approach responsive design.",
    author: "FrontendWizard",
    avatar: "F",
    category: "Development",
    comments: 32,
    views: 945,
    likes: 176,
    bookmarks: 108,
    timestamp: "1 day ago",
    isLiked: false,
    isBookmarked: true,
    isNew: true,
  },
  {
    id: 6,
    title: "Cybersecurity Best Practices",
    description:
      "Essential security practices every technology professional should implement. From zero-trust architecture to secure coding patterns and threat modeling.",
    author: "SecurityGuru",
    avatar: "S",
    category: "Technology",
    comments: 47,
    views: 1356,
    likes: 241,
    bookmarks: 173,
    timestamp: "2 days ago",
    isLiked: true,
    isBookmarked: false,
  },
];

// 排序類型
type SortType = "熱門" | "最新";
type ViewMode = "grid" | "list";

export default function Article() {
  // 修正：避免初始化狀態時使用客戶端特定邏輯
  const [sortType, setSortType] = useState<SortType>("熱門");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  
  // 初始化時使用空數組，等客戶端掛載後再填充數據
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  // 掛載後再初始化客戶端狀態
  useEffect(() => {
    setPosts(samplePosts);
    setLikedPosts(samplePosts.filter(post => post.isLiked).map(post => post.id));
    setBookmarkedPosts(samplePosts.filter(post => post.isBookmarked).map(post => post.id));
    setMounted(true);
  }, []);

  // Handle sort change
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortType(event.target.value as SortType);
  };

  // Handle view mode change
  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewMode: ViewMode | null
  ) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle like toggle
  const handleLike = (postId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  // Handle bookmark toggle
  const handleBookmark = (postId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (bookmarkedPosts.includes(postId)) {
      setBookmarkedPosts(bookmarkedPosts.filter(id => id !== postId));
    } else {
      setBookmarkedPosts([...bookmarkedPosts, postId]);
    }
  };

  // Filter and sort posts
  const getFilteredAndSortedPosts = () => {
    if (!mounted) return [];

    // Apply search filter
    const filteredPosts = posts.filter(post => 
      searchTerm === "" ? true : 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Apply sorting
    return filteredPosts.sort((a, b) => {
      switch (sortType) {
        case "熱門":
          return b.views - a.views;
        case "最新":
          // Simple sort by timestamp (in a real app, you'd use actual dates)
          return a.timestamp.includes("day") && !b.timestamp.includes("day") ? 1 : 
                 !a.timestamp.includes("day") && b.timestamp.includes("day") ? -1 :
                 parseInt(b.timestamp.split(" ")[0]) - parseInt(a.timestamp.split(" ")[0]);
        default:
          return 0;
      }
    });
  };

  // Format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const filteredAndSortedPosts = getFilteredAndSortedPosts();

  return (
    <Layout>
      {/* Hero section */}
      <Box
        sx={{
          width: "100%",
          p: 4,
          pt: 5,
          pb: 5,
          borderRadius: 3,
          background: gradientBg,
          boxShadow: "0 4px 20px rgba(14, 165, 233, 0.15)",
          mb: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background elements */}
        <Box
          sx={{
            position: "absolute",
            right: -20,
            top: -10,
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            right: 80,
            bottom: -30,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
          }}
        />
        
        <Typography
          variant="h4"
          component="h1"
          sx={{ 
            fontWeight: 700, 
            mb: 1, 
            color: "white",
            position: "relative",
            zIndex: 1,
          }}
        >
          Technology
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ 
            color: "rgba(255, 255, 255, 0.9)",
            maxWidth: "700px",
            position: "relative",
            zIndex: 1,
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          Connect with developers, designers, and tech enthusiasts. Discover
          cutting-edge discussions across AI, blockchain, cybersecurity, and
          more.
        </Typography>
        
        <Box sx={{ 
          display: "flex", 
          gap: 1, 
          mt: 2,
          position: "relative",
          zIndex: 1,
        }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              bgcolor: "white",
              color: accentColor,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.9)",
              },
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(14, 165, 233, 0.3)",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
            }}
          >
            發布新文章
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<NotificationsActive />}
            sx={{
              borderColor: "rgba(255,255,255,0.5)",
              color: "white",
              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,0.1)",
              },
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            訂閱通知
          </Button>
        </Box>
      </Box>

      {/* Control bar - search, filter, sort, view toggle */}
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between", 
          alignItems: { xs: "stretch", md: "center" },
          mb: 4,
          gap: 2
        }}
      >
        {/* Search bar */}
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: { xs: "100%", md: 300 },
            borderRadius: 3,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="搜尋文章..."
            inputProps={{ 'aria-label': '搜尋文章' }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>

        {/* Filter and view controls */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {/* Sort dropdown */}
          <FormControl 
            size="small"
            sx={{ 
              minWidth: 150,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: accentColor,
                },
              },
            }}
          >
            <InputLabel 
              id="sort-select-label"
              sx={{ 
                fontSize: "0.9rem",
                color: "text.secondary",
              }}
            >
              排序方式
            </InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortType}
              label="排序方式"
              onChange={handleSortChange}
              sx={{ fontSize: "0.9rem" }}
              startAdornment={
                <Sort sx={{ fontSize: 18, color: accentColor, mr: 0.5 }} />
              }
            >
              <MenuItem value={"熱門"}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TrendingUp sx={{ fontSize: 18, mr: 1, color: accentColor }} />
                  熱門文章
                </Box>
              </MenuItem>
              <MenuItem value={"最新"}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <NewReleases sx={{ fontSize: 18, mr: 1, color: accentColor }} />
                  最新文章
                </Box>
              </MenuItem>
            </Select>
          </FormControl>

          {/* View mode toggle */}
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="view mode"
            sx={{ 
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              '& .MuiToggleButton-root': {
                border: '1px solid rgba(0,0,0,0.08)',
                '&.Mui-selected': {
                  backgroundColor: accentColorLight,
                  color: accentColor,
                  '&:hover': {
                    backgroundColor: accentColorLight,
                  },
                },
              },
            }}
          >
            <ToggleButton value="grid" aria-label="grid view" sx={{ borderRadius: "8px 0 0 8px" }}>
              <ViewModule />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view" sx={{ borderRadius: "0 8px 8px 0" }}>
              <ViewList />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Empty state */}
      {mounted && filteredAndSortedPosts.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: 'center', 
            mt: 6, 
            p: 6, 
            borderRadius: 3, 
            backgroundColor: 'rgba(0,0,0,0.02)',
            border: '1px dashed rgba(0,0,0,0.1)',
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <Forum sx={{ fontSize: 60, color: 'rgba(0,0,0,0.1)', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#334155", mb: 1 }}>
            找不到符合的文章
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            請嘗試使用不同的關鍵字，或清除搜尋條件查看所有文章
          </Typography>
          {searchTerm && (
            <Button 
              variant="outlined"
              onClick={() => setSearchTerm("")}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                borderColor: accentColor,
                color: accentColor,
                "&:hover": {
                  borderColor: accentColorDark,
                  bgcolor: accentColorLight,
                },
              }}
            >
              清除搜尋
            </Button>
          )}
        </Box>
      ) : (
        // 客戶端掛載前不渲染內容，避免水合錯誤
        mounted && (
          // Grid view or List view of posts
          viewMode === "grid" ? (
            <Grid container spacing={3}>
              {filteredAndSortedPosts.map((post) => {
                const isLiked = likedPosts.includes(post.id);
                const isBookmarked = bookmarkedPosts.includes(post.id);
                const categoryColor = getCategoryColor(post.category);
                
                return (
                  <Grid item xs={12} sm={6} md={4} key={post.id}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                        },
                        border: "1px solid #eaeaea",
                        backgroundColor: "#fff",
                        overflow: "visible",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                      }}
                    >
                      {/* Next.js Link 組件處理為客戶端組件 */}
                      <Box 
                        component={Link}
                        href={`/f/1/p/${post.id}`}
                        sx={{
                          textDecoration: "none", 
                          color: "inherit",
                          display: "flex",
                          flexDirection: "column",
                          height: "100%"
                        }}
                      >  
                        <CardContent sx={{ 
                          p: 3, 
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          "&:last-child": { 
                            pb: 3 
                          }
                        }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <Chip
                              size="small"
                              label={post.category}
                              sx={{
                                backgroundColor: categoryColor.bg,
                                color: categoryColor.text,
                                fontWeight: 600,
                                borderRadius: 1.5,
                                px: 1,
                                height: 24,
                              }}
                            />
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

                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: categoryColor.text,
                                fontSize: "0.8rem",
                                mr: 1,
                                fontWeight: 600,
                              }}
                            >
                              {post.avatar}
                            </Avatar>
                            <Typography 
                              variant="body2" 
                              sx={{
                                fontWeight: 500,
                                color: "text.primary",
                              }}
                            >
                              {post.author}
                            </Typography>
                          </Box>

                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ 
                              fontWeight: 600, 
                              mb: 1.5,
                              fontSize: "1.1rem",
                              color: "#1e293b",
                              lineHeight: 1.3,
                            }}
                          >
                            {post.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              mb: 3,
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 3,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              lineHeight: 1.6,
                              flexGrow: 1,
                              color: "#64748b",
                            }}
                          >
                            {post.description}
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              pt: 2,
                              borderTop: "1px solid rgba(0,0,0,0.06)",
                              mt: "auto",
                            }}
                          >
                            <Box sx={{ display: "flex", gap: 2 }}>
                              {/* Like button */}
                              <Tooltip title={isLiked ? "取消讚" : "讚"}>
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
                              
                              {/* Comment button */}
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
                              
                              {/* Bookmark button */}
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
                            
                            {/* View count */}
                            <Box 
                              sx={{ 
                                display: "flex", 
                                alignItems: "center",
                                color: "text.secondary",
                                fontSize: "0.75rem",
                              }}
                            >
                              <Visibility sx={{ fontSize: 16, mr: 0.5 }} />
                              {formatNumber(post.views)}
                            </Box>
                          </Box>
                        </CardContent>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            // List view
            <Box sx={{ mb: 3 }}>
              {filteredAndSortedPosts.map((post) => {
                const isLiked = likedPosts.includes(post.id);
                const isBookmarked = bookmarkedPosts.includes(post.id);
                const categoryColor = getCategoryColor(post.category);
                
                return (
                  <Card
                    key={post.id}
                    sx={{
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.06)",
                      },
                      border: "1px solid #eaeaea",
                      backgroundColor: "#fff",
                      overflow: "hidden",
                      mb: 2,
                      position: "relative",
                    }}
                  >
                    {/* Next.js Link 組件處理為客戶端組件 */}
                    <Box 
                      component={Link}
                      href={`/f/1/p/${post.id}`}
                      sx={{
                        textDecoration: "none", 
                        color: "inherit",
                        display: "block"
                      }}
                    > 
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              bgcolor: categoryColor.text,
                              fontSize: "1.2rem",
                              mr: 2,
                              fontWeight: 600,
                            }}
                          >
                            {post.avatar}
                          </Avatar>
                          
                          <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ 
                              display: "flex", 
                              alignItems: "center", 
                              mb: 0.5,
                              flexWrap: "wrap",
                              gap: 1,
                            }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 700,
                                  color: "#1e293b",
                                  fontSize: "1.1rem",
                                  mr: 1.5,
                                }}
                              >
                                {post.title}
                              </Typography>
                              
                              <Chip
                                size="small"
                                label={post.category}
                                sx={{
                                  backgroundColor: categoryColor.bg,
                                  color: categoryColor.text,
                                  fontWeight: 600,
                                  borderRadius: 1.5,
                                  px: 1,
                                  height: 24,
                                  mr: 1,
                                }}
                              />
                              
                              <Box 
                                sx={{ 
                                  display: "flex", 
                                  alignItems: "center",
                                  color: "text.secondary",
                                  fontSize: "0.75rem",
                                  ml: "auto",
                                  flexShrink: 0,
                                }}
                              >
                                <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                                {post.timestamp}
                              </Box>
                            </Box>
                            
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              <Typography 
                                variant="body2" 
                                sx={{
                                  fontWeight: 500,
                                  color: "text.primary",
                                }}
                              >
                                {post.author}
                              </Typography>
                            </Box>
                            
                            <Typography
                              variant="body2"
                              sx={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                lineHeight: 1.6,
                                color: "#64748b",
                                mb: 1.5,
                                pr: { xs: 0, sm: 8 },
                              }}
                            >
                              {post.description}
                            </Typography>
                            
                            <Box sx={{ 
                              display: "flex", 
                              alignItems: "center",
                              justifyContent: "flex-start",
                              gap: { xs: 1, sm: 2 },
                              flexWrap: "wrap",
                            }}>
                              {/* Like button */}
                              <Box 
                                sx={{ 
                                  display: "flex", 
                                  alignItems: "center",
                                  color: isLiked ? "#f43f5e" : "text.secondary",
                                  cursor: "pointer",
                                  "&:hover": {
                                    opacity: 0.8,
                                  }
                                }}
                                onClick={(e) => handleLike(post.id, e)}
                              >
                                {isLiked ? (
                                  <Favorite sx={{ fontSize: 16, mr: 0.5 }} />
                                ) : (
                                  <FavoriteBorder sx={{ fontSize: 16, mr: 0.5 }} />
                                )}
                                <Typography 
                                  variant="caption" 
                                  fontWeight={500} 
                                  sx={{ 
                                    color: isLiked ? "#f43f5e" : "inherit"
                                  }}
                                >
                                  {formatNumber(post.likes || 0)}
                                </Typography>
                              </Box>
                              
                              {/* Comment count */}
                              <Box 
                                sx={{ 
                                  display: "flex", 
                                  alignItems: "center",
                                  color: "text.secondary",
                                }}
                              >
                                <ChatBubbleOutline sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="caption" fontWeight={500}>
                                  {formatNumber(post.comments)}
                                </Typography>
                              </Box>
                              
                              {/* Bookmark button */}
                              <Box 
                                sx={{ 
                                  display: "flex", 
                                  alignItems: "center",
                                  color: isBookmarked ? accentColor : "text.secondary",
                                  cursor: "pointer",
                                  "&:hover": {
                                    opacity: 0.8,
                                  }
                                }}
                                onClick={(e) => handleBookmark(post.id, e)}
                              >
                                {isBookmarked ? (
                                  <Bookmark sx={{ fontSize: 16, mr: 0.5 }} />
                                ) : (
                                  <TurnedInNot sx={{ fontSize: 16, mr: 0.5 }} />
                                )}
                                <Typography 
                                  variant="caption" 
                                  fontWeight={500}
                                  sx={{ 
                                    color: isBookmarked ? accentColor : "inherit"
                                  }}
                                >
                                  {formatNumber(post.bookmarks || 0)}
                                </Typography>
                              </Box>
                              
                              {/* View count */}
                              <Box 
                                sx={{ 
                                  display: "flex", 
                                  alignItems: "center",
                                  color: "text.secondary",
                                  ml: { xs: 0, sm: "auto" },
                                }}
                              >
                                <Visibility sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="caption" fontWeight={500}>
                                  {formatNumber(post.views)}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Box>
                  </Card>
                );
              })}
            </Box>
          )
        )
      )}
    </Layout>
  );
}