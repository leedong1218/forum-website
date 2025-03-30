import Layout from "@/components/layout/Layout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  InputBase,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Search, Forum, Groups, List } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Banner from "@/components/common/Banner";
import { useLoading } from "@/lib/context/LoadingContext";
import { useMessageModal } from "@/lib/context/MessageModalContext";
import { ModalTypes } from "@/lib/types/modalType";
import { BoardsType, FilterType } from "@/lib/types/boardsType";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Sticker from "@/public/images/sticker.jpg";
import { colors } from "@/styles/theme"; // Import colors from theme file

const ForumPostList = [
  {
    id: 1,
    title: "Quantum Computing Breakthroughs",
    description:
      "Discussing the latest advancements in quantum computing and their implications for cybersecurity.",
    avatar: Sticker,
    category: "Technology",
    followers: 2842,
    isFollow: true,
    trending: true,
    postsCount: 342,
  },
  {
    id: 2,
    title: "AI Model Architecture Design",
    description:
      "Share your experiences with different AI model architectures and optimization techniques.",
    avatar: Sticker,
    category: "AI & ML",
    followers: 1928,
    isFollow: true,
    isNew: true,
    postsCount: 218,
  },
  {
    id: 3,
    title: "Future of Web Development",
    description:
      "Exploring emerging technologies that will shape the future of web applications.",
    avatar: Sticker,
    category: "Development",
    followers: 3625,
    isFollow: false,
    postsCount: 856,
  },
  {
    id: 4,
    title: "Blockchain Implementation Challenges",
    description:
      "Discussion thread for solving common blockchain implementation issues in enterprise applications.",
    avatar: Sticker,
    category: "Blockchain",
    followers: 1879,
    isFollow: true,
    trending: true,
    postsCount: 476,
  },
  {
    id: 5,
    title: "Machine Learning Ethics",
    description:
      "Exploring ethical considerations in AI and machine learning development.",
    avatar: Sticker,
    category: "AI & ML",
    followers: 2226,
    isFollow: false,
    postsCount: 385,
  },
  {
    id: 6,
    title: "DevOps Best Practices",
    description:
      "Share your DevOps workflows, CI/CD pipelines, and containerization strategies for efficient development.",
    avatar: Sticker,
    category: "Development",
    followers: 2560,
    isFollow: false,
    isNew: true,
    postsCount: 194,
  },
  {
    id: 7,
    title: "Frontend Frameworks Comparison",
    description:
      "Comparing React, Vue, Angular, and other frontend frameworks for modern web applications.",
    avatar: Sticker,
    category: "Development",
    followers: 3105,
    isFollow: true,
    postsCount: 675,
  },
  {
    id: 8,
    title: "Data Science Projects",
    description:
      "Showcasing real-world data science projects, methodologies, and insights across various domains.",
    avatar: Sticker,
    category: "AI & ML",
    followers: 1845,
    isFollow: false,
    postsCount: 289,
  },
];

export default function Board() {
  const router = useRouter();
  const { register } = useForm();
  const { setLoading } = useLoading();
  const { setIsShow, setModalProps } = useMessageModal();
  const [posts, setPosts] = useState<BoardsType[]>(ForumPostList);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const title = "所有看板";

  // Add this function before the return statement
  const filterPosts = (
    posts: BoardsType[],
    currentFilter: FilterType
  ): BoardsType[] => {
    switch (currentFilter) {
      case "followed":
        return posts.filter((post) => post.isFollow);
      case "unfollowed":
        return posts.filter((post) => !post.isFollow);
      case "all":
      default:
        return posts;
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        // const response = await api.fetchBoards() or similar

        // Apply initial filtering based on the filter state
        const allPosts = ForumPostList;
        const filteredPosts = filterPosts(allPosts, filter);
        setPosts(filteredPosts);
        setLoading(false);
      } catch (error: unknown) {
        setModalProps({
          type: ModalTypes.ERROR,
          message: String((error as { message: string }).message),
        });
        setIsShow(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [setIsShow, setLoading, setModalProps, filter]); // Add filter as dependency

  // Handle filter change
  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: FilterType | null
  ) => {
    setLoading(true);
    if (newFilter !== null) {
      setFilter(newFilter);

      const filteredPosts = filterPosts(ForumPostList, newFilter);
      setPosts(filteredPosts);
      setLoading(false);
    }
  };

  // Handle follow/unfollow toggle
  const handleFollowToggle = (postId: number, event: React.MouseEvent) => {
    // Stop propagation to prevent card click
    event.stopPropagation();

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isFollow: !post.isFollow,
              followers: post.isFollow
                ? post.followers - 1
                : post.followers + 1,
            }
          : post
      )
    );
  };

  // Format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <Layout title="所有看板">
      <Banner
        title={title}
        content="探索不同主題的技術社群，加入感興趣的看板參與討論"
        icon={List}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          mb: 4,
          gap: 2,
        }}
      >
        {/* Search bar */}
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: { xs: "100%", md: 300 },
            borderRadius: 3,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="搜尋看板..."
            inputProps={{ "aria-label": "搜尋看板" }}
            {...register("searchTerm")}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
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
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              "& .MuiToggleButton-root": {
                border: "1px solid rgba(0,0,0,0.08)",
                "&.Mui-selected": {
                  backgroundColor: colors.accentLight,
                  color: colors.accent,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: colors.accentLight,
                  },
                },
              },
            }}
          >
            <ToggleButton
              value="all"
              aria-label="all boards"
              sx={{ px: 2, borderRadius: "8px 0 0 8px" }}
            >
              全部看板
            </ToggleButton>
            <ToggleButton
              value="followed"
              aria-label="followed boards"
              sx={{ px: 2 }}
            >
              已追蹤看板
            </ToggleButton>
            <ToggleButton
              value="unfollowed"
              aria-label="unfollowed boards"
              sx={{ px: 2, borderRadius: "0 8px 8px 0" }}
            >
              未追蹤看板
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {posts.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            p: 6,
            borderRadius: 3,
            backgroundColor: "rgba(0,0,0,0.02)",
            border: "1px dashed rgba(0,0,0,0.1)",
            maxWidth: 600,
            mx: "auto",
          }}
        >
          <Forum sx={{ fontSize: 60, color: "rgba(0,0,0,0.1)", mb: 2 }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: colors.textPrimary, mb: 1 }}
          >
            {searchTerm
              ? "找不到符合的看板"
              : filter === "followed"
                ? "您尚未追蹤任何看板"
                : filter === "unfollowed"
                  ? "目前沒有未追蹤的看板"
                  : "暫無看板"}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 400, mx: "auto" }}
          >
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
                borderColor: colors.accent,
                color: colors.accent,
                "&:hover": {
                  borderColor: colors.accentDark,
                  bgcolor: colors.accentLight,
                },
              }}
            >
              清除搜尋
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={2} wrap="wrap">
          {posts.map((post) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={post.id}>
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
                <Box
                  onClick={() => router.push(`/f/${post.id}`)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    alignItems: "stretch",
                    padding: 0,
                  }}
                >
                  <CardContent
                    sx={{
                      p: 2,
                      pb: 0,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 1,
                        position: "relative",
                      }}
                    >
                      <Avatar
                        src={post.avatar.src}
                        alt={post.title}
                        sx={{
                          width: 80,
                          height: 80,
                          boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                          mb: 1,
                        }}
                      />

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          textAlign: "center",
                          color: colors.textPrimary,
                          fontSize: "1.1rem",
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
                        textAlign: "center",
                        lineHeight: 1.6,
                        flexGrow: 1,
                        color: colors.textSecondary,
                      }}
                    >
                      {post.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />
                  </CardContent>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 2,
                      pt: 0,
                    }}
                  >
                    <Button
                      variant={post.isFollow ? "contained" : "outlined"}
                      color="primary"
                      sx={{
                        width: "100%",
                        borderRadius: 1,
                        textTransform: "none",
                        fontWeight: 600,
                        boxShadow: post.isFollow
                          ? "0 4px 12px rgba(14, 165, 233, 0.3)"
                          : "none",
                        bgcolor: post.isFollow ? colors.accent : "transparent",
                        borderColor: post.isFollow
                          ? colors.accent
                          : "rgba(0,0,0,0.2)",
                        "&:hover": {
                          bgcolor: post.isFollow
                            ? colors.accentDark
                            : colors.accentLight,
                          borderColor: colors.accent,
                          boxShadow: post.isFollow
                            ? "0 6px 16px rgba(14, 165, 233, 0.4)"
                            : "none",
                        },
                      }}
                      onClick={(e) => handleFollowToggle(post.id, e)}
                    >
                      {post.isFollow ? "已追蹤" : "追蹤"}
                    </Button>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 1,
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
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}