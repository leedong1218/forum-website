import Layout from "@/components/layout/Layout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { 
  Button, 
  ToggleButton, 
  ToggleButtonGroup, 
  Divider, 
  CardActionArea,
  InputBase,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { 
  Search, 
  ViewModule, 
  ViewList, 
  Add, 
  Forum,
  Groups,
  TrendingUp,
  FiberNew
} from "@mui/icons-material";
import { useState, useEffect } from "react";

// 主題色彩定義
const accentColor = "#0ea5e9"; // 主色調藍色
const accentColorLight = "#e0f2fe"; // 淺藍背景色
const accentColorDark = "#0284c7"; // 深藍色用於懸停
const gradientBg = "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)"; // 藍色漸變

type ForumPost = {
  id: number;
  title: string;
  description: string;
  avatar: string;
  category: string;
  followers: number;
  isFollow: boolean;
  isNew?: boolean;
  trending?: boolean;
  postsCount?: number;
};

type FilterType = "all" | "followed" | "unfollowed";
type ViewMode = "grid" | "list";

// 強化看板數據
const initialPosts: ForumPost[] = [
  {
    id: 1,
    title: "Quantum Computing Breakthroughs",
    description:
      "Discussing the latest advancements in quantum computing and their implications for cybersecurity.",
    avatar: "T",
    category: "Technology",
    followers: 2842,
    isFollow: true,
    trending: true,
    postsCount: 342
  },
  {
    id: 2,
    title: "AI Model Architecture Design",
    description:
      "Share your experiences with different AI model architectures and optimization techniques.",
    avatar: "D",
    category: "AI & ML",
    followers: 1928,
    isFollow: true,
    isNew: true,
    postsCount: 218
  },
  {
    id: 3,
    title: "Future of Web Development",
    description:
      "Exploring emerging technologies that will shape the future of web applications.",
    avatar: "C",
    category: "Development",
    followers: 3625,
    isFollow: false,
    postsCount: 856
  },
  {
    id: 4,
    title: "Blockchain Implementation Challenges",
    description:
      "Discussion thread for solving common blockchain implementation issues in enterprise applications.",
    avatar: "B",
    category: "Blockchain",
    followers: 1879,
    isFollow: true,
    trending: true,
    postsCount: 476
  },
  {
    id: 5,
    title: "Machine Learning Ethics",
    description:
      "Exploring ethical considerations in AI and machine learning development.",
    avatar: "M",
    category: "AI & ML",
    followers: 2226,
    isFollow: false,
    postsCount: 385
  },
  {
    id: 6,
    title: "DevOps Best Practices",
    description:
      "Share your DevOps workflows, CI/CD pipelines, and containerization strategies for efficient development.",
    avatar: "D",
    category: "Development",
    followers: 2560,
    isFollow: false,
    isNew: true,
    postsCount: 194
  },
  {
    id: 7,
    title: "Frontend Frameworks Comparison",
    description:
      "Comparing React, Vue, Angular, and other frontend frameworks for modern web applications.",
    avatar: "F",
    category: "Development",
    followers: 3105,
    isFollow: true,
    postsCount: 675
  },
  {
    id: 8,
    title: "Data Science Projects",
    description:
      "Showcasing real-world data science projects, methodologies, and insights across various domains.",
    avatar: "D",
    category: "AI & ML",
    followers: 1845,
    isFollow: false,
    postsCount: 289
  },
];

export default function Board() {
  // Use state initialization with a check to prevent hydration errors
  const [posts, setPosts] = useState<ForumPost[]>(() => {
    if (typeof window !== 'undefined') {
      return initialPosts;
    }
    return [];
  });

  const [filter, setFilter] = useState<FilterType>(() => {
    if (typeof window !== 'undefined') {
      return "all";
    }
    return "all";
  });

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");

  // Hydration-safe client-side only state
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle filter change
  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: FilterType | null
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
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

  // Handle follow/unfollow toggle
  const handleFollowToggle = (postId: number, event: React.MouseEvent) => {
    // Stop propagation to prevent card click
    event.stopPropagation();
    
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isFollow: !post.isFollow,
              followers: post.isFollow ? post.followers - 1 : post.followers + 1 
            } 
          : post
      )
    );
  };

  // Navigate to forum page
  const navigateToForum = (postId: number) => {
    window.location.href = `/f/${postId}`;
  };

  // Filter and search posts
  const filteredPosts = isClient 
    ? posts.filter(post => {
        // Apply filter
        const filterMatch = 
          filter === "all" ? true : 
          filter === "followed" ? post.isFollow : 
          !post.isFollow;
        
        // Apply search
        const searchMatch = 
          searchTerm === "" ? true : 
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase());
        
        return filterMatch && searchMatch;
      })
    : [];

  // Get background color for avatar based on category
  const getAvatarColor = (category: string) => {
    const colors: {[key: string]: string} = {
      "Technology": "#3f51b5",
      "AI & ML": "#e91e63",
      "Development": "#009688",
      "Blockchain": "#ff9800",
    };
    return colors[category] || "#1976d2";
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

  return (
    <Layout title="所有看板">
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
          所有看板
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ 
            color: "rgba(255, 255, 255, 0.9)",
            maxWidth: "70%",
            position: "relative",
            zIndex: 1,
          }}
        >
          探索不同主題的技術社群，加入感興趣的看板參與討論
        </Typography>
      </Box>

      {/* Control bar - search, filter, view toggle */}
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
            placeholder="搜尋看板..."
            inputProps={{ 'aria-label': '搜尋看板' }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>

        {/* Filter and view controls */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {/* Filter toggle buttons */}
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilterChange}
            aria-label="board filter"
            sx={{ 
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              '& .MuiToggleButton-root': {
                border: '1px solid rgba(0,0,0,0.08)',
                '&.Mui-selected': {
                  backgroundColor: accentColorLight,
                  color: accentColor,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: accentColorLight,
                  },
                },
              },
            }}
          >
            <ToggleButton value="all" aria-label="all boards" sx={{ px: 2, borderRadius: "8px 0 0 8px" }}>
              全部看板
            </ToggleButton>
            <ToggleButton value="followed" aria-label="followed boards" sx={{ px: 2 }}>
              已追蹤看板
            </ToggleButton>
            <ToggleButton value="unfollowed" aria-label="unfollowed boards" sx={{ px: 2, borderRadius: "0 8px 8px 0" }}>
              未追蹤看板
            </ToggleButton>
          </ToggleButtonGroup>

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

          {/* Create new board button (for future functionality) */}
          <Tooltip title="建立新看板">
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                bgcolor: accentColor,
                "&:hover": {
                  bgcolor: accentColorDark,
                },
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(14, 165, 233, 0.3)",
                textTransform: "none",
                fontWeight: 600,
                px: 2,
              }}
            >
              建立看板
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Empty state */}
      {filteredPosts.length === 0 ? (
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
            {searchTerm 
              ? "找不到符合的看板" 
              : filter === "followed" 
              ? "您尚未追蹤任何看板" 
              : filter === "unfollowed" 
              ? "目前沒有未追蹤的看板" 
              : "暫無看板"}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
            {searchTerm 
              ? "請嘗試使用不同的關鍵字，或清除搜尋條件查看所有看板" 
              : filter === "followed" 
              ? "追蹤感興趣的看板以便快速訪問並接收更新通知" 
              : filter === "unfollowed" 
              ? "所有看板均已追蹤，您可以瀏覽全部看板查看更多內容" 
              : "目前系統中沒有可用的看板"}
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
        // Grid view 
        viewMode === "grid" ? (
          <Grid container spacing={3} wrap="wrap">
            {filteredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
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
                  
                  <CardActionArea 
                    onClick={() => navigateToForum(post.id)}
                    sx={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      height: "100%",
                      alignItems: "stretch",
                      padding: 0
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
                          mb: 2,
                        }}
                      >
                        <Chip
                          size="small"
                          label={post.category}
                          sx={{
                            backgroundColor: `${getAvatarColor(post.category)}15`,
                            color: getAvatarColor(post.category),
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
                            gap: 1, 
                          }}
                        >
                          <Tooltip title="文章數量">
                            <Box 
                              sx={{ 
                                display: "flex", 
                                alignItems: "center",
                                color: "text.secondary",
                              }}
                            >
                              <Forum sx={{ fontSize: 16, mr: 0.5 }} />
                              <Typography variant="caption" fontWeight={500}>
                                {formatNumber(post.postsCount || 0)}
                              </Typography>
                            </Box>
                          </Tooltip>
                          <Tooltip title="成員數">
                            <Box 
                              sx={{ 
                                display: "flex", 
                                alignItems: "center",
                                color: "text.secondary", 
                              }}
                            >
                              <Groups sx={{ fontSize: 16, mr: 0.5 }} />
                              <Typography variant="caption" fontWeight={500}>
                                {formatNumber(post.followers)}
                              </Typography>
                            </Box>
                          </Tooltip>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          mb: 2,
                          position: "relative"
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            bgcolor: getAvatarColor(post.category),
                            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                            mb: 2,
                            fontSize: "2rem",
                            fontWeight: "bold",
                          }}
                        >
                          {post.avatar}
                        </Avatar>

                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            textAlign: 'center',
                            mb: 1,
                            color: "#1e293b",
                            fontSize: "1.1rem",
                          }}
                        >
                          {post.title}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          mb: 3,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: 'center',
                          lineHeight: 1.6,
                          flexGrow: 1,
                          color: "#64748b",
                        }}
                      >
                        {post.description}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        mt: 'auto',
                      }}>
                        <Button 
                          variant={post.isFollow ? "contained" : "outlined"} 
                          color="primary"
                          sx={{ 
                            borderRadius: 6,
                            px: 3,
                            py: 0.75,
                            textTransform: "none",
                            fontWeight: 600,
                            boxShadow: post.isFollow ? "0 4px 12px rgba(14, 165, 233, 0.3)" : "none",
                            bgcolor: post.isFollow ? accentColor : "transparent",
                            borderColor: post.isFollow ? accentColor : "rgba(0,0,0,0.2)",
                            '&:hover': {
                              bgcolor: post.isFollow ? accentColorDark : accentColorLight,
                              borderColor: accentColor,
                              boxShadow: post.isFollow ? "0 6px 16px rgba(14, 165, 233, 0.4)" : "none",
                            }
                          }}
                          onClick={(e) => handleFollowToggle(post.id, e)}
                        >
                          {post.isFollow ? "已追蹤" : "追蹤"}
                        </Button>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          // List view
          <Box sx={{ mb: 3 }}>
            {filteredPosts.map((post) => (
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
                {/* New indicator badge */}
                {post.isNew && (
                  <Chip
                    icon={<FiberNew sx={{ fontSize: 14 }} />}
                    label="新看板"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      bgcolor: "#10b981",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      height: 24,
                      zIndex: 10,
                      "& .MuiChip-icon": {
                        color: "white",
                      }
                    }}
                  />
                )}
                
                {/* Trending indicator badge */}
                {post.trending && !post.isNew && (
                  <Chip
                    icon={<TrendingUp sx={{ fontSize: 14 }} />}
                    label="熱門"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      bgcolor: "#f59e0b",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      height: 24,
                      zIndex: 10,
                      "& .MuiChip-icon": {
                        color: "white",
                      }
                    }}
                  />
                )}
                
                <CardActionArea onClick={() => navigateToForum(post.id)}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: getAvatarColor(post.category),
                          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                          mr: 3,
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                        }}
                      >
                        {post.avatar}
                      </Avatar>
                      
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Chip
                            size="small"
                            label={post.category}
                            sx={{
                              backgroundColor: `${getAvatarColor(post.category)}15`,
                              color: getAvatarColor(post.category),
                              fontWeight: 600,
                              borderRadius: 1.5,
                              px: 1,
                              height: 24,
                              mr: 1.5,
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: "#1e293b",
                              fontSize: "1.1rem",
                              mr: "auto",
                            }}
                          >
                            {post.title}
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
                            mr: 10,
                            mb: { xs: 2, md: 0 },
                          }}
                        >
                          {post.description}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "flex-end",
                        gap: 1,
                        ml: 2,
                      }}>
                        <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                          <Tooltip title="文章數量">
                            <Box 
                              sx={{ 
                                display: "flex", 
                                alignItems: "center",
                                color: "text.secondary",
                              }}
                            >
                              <Forum sx={{ fontSize: 16, mr: 0.5 }} />
                              <Typography variant="caption" fontWeight={500}>
                                {formatNumber(post.postsCount || 0)}
                              </Typography>
                            </Box>
                          </Tooltip>
                          <Tooltip title="成員數">
                            <Box 
                              sx={{ 
                                display: "flex", 
                                alignItems: "center",
                                color: "text.secondary", 
                              }}
                            >
                              <Groups sx={{ fontSize: 16, mr: 0.5 }} />
                              <Typography variant="caption" fontWeight={500}>
                                {formatNumber(post.followers)}
                              </Typography>
                            </Box>
                          </Tooltip>
                        </Box>
                        
                        <Button 
                          variant={post.isFollow ? "contained" : "outlined"} 
                          color="primary"
                          size="small"
                          sx={{ 
                            borderRadius: 6,
                            px: 2.5,
                            textTransform: "none",
                            fontWeight: 600,
                            boxShadow: post.isFollow ? "0 4px 12px rgba(14, 165, 233, 0.3)" : "none",
                            bgcolor: post.isFollow ? accentColor : "transparent",
                            borderColor: post.isFollow ? accentColor : "rgba(0,0,0,0.2)",
                            minWidth: 100,
                            '&:hover': {
                              bgcolor: post.isFollow ? accentColorDark : accentColorLight,
                              borderColor: accentColor,
                              boxShadow: post.isFollow ? "0 6px 16px rgba(14, 165, 233, 0.4)" : "none",
                            }
                          }}
                          onClick={(e) => handleFollowToggle(post.id, e)}
                        >
                          {post.isFollow ? "已追蹤" : "追蹤"}
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )
      )}
    </Layout>
  );
}