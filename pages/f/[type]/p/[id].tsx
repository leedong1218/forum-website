import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  Menu,
  MenuItem,
  TextField,
  Paper,
  Tooltip,
  Card,
  Backdrop,
  Modal,
  Fade,
  Collapse,
} from "@mui/material";
import {
  Bookmark,
  Favorite,
  FavoriteBorderOutlined,
  MoreVert,
  Send,
  Share,
  TurnedInNot,
  AccessTime,
  Reply,
  Flag,
  ContentCopy,
  Facebook,
  Twitter,
  Instagram,
  WhatsApp,
  Close,
  ChatBubbleOutline,
  EmojiEmotions,
  Image as ImageIcon,
  InsertLink,
  Cancel,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";

// Theme color definitions
const accentColor = "#0ea5e9"; // Main blue
const accentColorLight = "#e0f2fe"; // Light blue background
const accentColorDark = "#0284c7"; // Dark blue for hover

// Sample image data
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
];

// Reply interface definition
interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  parentId: number; // Parent comment ID
}

// Comment interface definition
interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Reply[]; // Reply list
}

// Sample comment data
const sampleComments: Comment[] = [
  {
    id: 1,
    author: "陳小華",
    avatar: "陳",
    content: "哈哈哈，第五個笑死我啦！鐵粉那個太好笑了！",
    timestamp: "30分鐘前",
    likes: 15,
    isLiked: false,
    replies: [
      {
        id: 101,
        author: "李小明",
        avatar: "李",
        content: "我也覺得！鐵粉真的很妙，超有梗的！",
        timestamp: "20分鐘前",
        likes: 5,
        isLiked: false,
        parentId: 1
      },
      {
        id: 102,
        author: "王大同",
        avatar: "王",
        content: "哈哈真的很好笑，我還想到以前有個鐵棒冰，是不是暖暖包也可以做成冰淇淋啊 XD",
        timestamp: "15分鐘前",
        likes: 3,
        isLiked: false,
        parentId: 1
      }
    ]
  },
  {
    id: 2,
    author: "林大偉",
    avatar: "林",
    content: "我最喜歡第七個，冰塊那個冷笑話真的很「冷」！",
    timestamp: "1小時前",
    likes: 8,
    isLiked: false,
    replies: []
  },
  {
    id: 3,
    author: "張美玲",
    avatar: "張",
    content: "告白氣球那個也太有創意了，笑到肚子痛XD",
    timestamp: "2小時前",
    likes: 23,
    isLiked: false,
    replies: [
      {
        id: 301,
        author: "陳大明",
        avatar: "陳",
        content: "想到氣球就想到周董的歌，但這個梗更好笑！",
        timestamp: "1小時前",
        likes: 7,
        isLiked: false,
        parentId: 3
      }
    ]
  },
];

// Get random background color
const getRandomColor = (seed: string) => {
  const colors = [
    "#0284c7", // Blue
    "#db2777", // Pink
    "#16a34a", // Green
    "#d97706", // Orange
    "#9333ea", // Purple
    "#dc2626", // Red
  ];
  
  // Use simple string hash to select color
  let sum = 0;
  for (let i = 0; i < seed.length; i++) {
    sum += seed.charCodeAt(i);
  }
  
  return colors[sum % colors.length];
};

export default function Post() {
  // Client-side rendering flag
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Interaction state management
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(87);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  
  // Share menu state
  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null);
  const shareOpen = Boolean(shareAnchorEl);
  
  // Image modal state
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Comment-related states
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  
  // Menu state
  const [commentMenuAnchorEl, setCommentMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const commentMenuOpen = Boolean(commentMenuAnchorEl);

  // Handle like event
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  // Handle bookmark event
  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Handle share button click
  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    setShareAnchorEl(event.currentTarget);
  };

  // Close share menu
  const handleShareClose = () => {
    setShareAnchorEl(null);
  };

  // Open image modal
  const handleImageClick = (imgSrc: string) => {
    setSelectedImage(imgSrc);
    setImageModalOpen(true);
  };

  // Close image modal
  const handleImageModalClose = () => {
    setImageModalOpen(false);
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Math.max(...comments.map(c => c.id), 0) + 1,
        author: "訪客用戶",
        avatar: "訪",
        content: commentText,
        timestamp: "剛剛",
        likes: 0,
        isLiked: false,
        replies: []
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };

  // Handle reply submission
  const handleReplySubmit = (commentId: number) => {
    if (replyText.trim()) {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          const newReply: Reply = {
            id: Date.now(),
            author: "訪客用戶",
            avatar: "訪",
            content: replyText,
            timestamp: "剛剛",
            likes: 0,
            isLiked: false,
            parentId: commentId
          };
          
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        }
        return comment;
      });
      
      setComments(updatedComments);
      setReplyText("");
      setActiveReplyId(null);
      
      // Ensure replies for this comment are expanded
      if (!expandedComments.includes(commentId)) {
        setExpandedComments([...expandedComments, commentId]);
      }
    }
  };

  // Cancel reply
  const handleCancelReply = () => {
    setActiveReplyId(null);
    setReplyText("");
  };

  // Start replying to a comment
  const handleStartReply = (commentId: number) => {
    setActiveReplyId(commentId);
    // If replies for this comment aren't expanded yet, expand them
    if (!expandedComments.includes(commentId) && comments.find(c => c.id === commentId)?.replies?.length) {
      setExpandedComments([...expandedComments, commentId]);
    }
  };

  // Toggle expand/collapse replies
  const toggleReplies = (commentId: number) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments(expandedComments.filter(id => id !== commentId));
    } else {
      setExpandedComments([...expandedComments, commentId]);
    }
  };

  // Handle comment like
  const handleCommentLike = (commentId: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        return comment;
      })
    );
  };

  // Handle reply like
  const handleReplyLike = (commentId: number, replyId: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          const updatedReplies = comment.replies?.map((reply) => {
            if (reply.id === replyId) {
              return {
                ...reply,
                isLiked: !reply.isLiked,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
              };
            }
            return reply;
          });
          
          return {
            ...comment,
            replies: updatedReplies,
          };
        }
        return comment;
      })
    );
  };

  // Open comment menu
  const handleCommentMenuOpen = (event: React.MouseEvent<HTMLElement>, commentId: number) => {
    setActiveCommentId(commentId);
    setCommentMenuAnchorEl(event.currentTarget);
  };

  // Close comment menu
  const handleCommentMenuClose = () => {
    setCommentMenuAnchorEl(null);
    setActiveCommentId(null);
  };

  // Format number display
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Get total comment count (including replies)
  const getTotalCommentCount = (): number => {
    return comments.reduce((total, comment) => {
      return total + 1 + (comment.replies?.length || 0);
    }, 0);
  };

  return (
    <Layout>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
          mb: 4,
        }}
      >
        {/* Top info section */}
        <Box
          sx={{
            width: "100%",
            p: 3,
            background: "#fff",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
          }}
        >
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
              label="搞笑版"
              sx={{
                backgroundColor: accentColorLight,
                color: accentColor,
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
              2022/1/1
            </Box>
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: getRandomColor("王小明"),
                fontSize: "1rem",
                mr: 1.5,
                fontWeight: 600,
              }}
            >
              王
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                王小明
              </Typography>
              <Typography variant="caption" color="text.secondary">
                笑話達人
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Article content section */}
        <Box sx={{ p: 3, pt: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ 
              fontWeight: 700, 
              mb: 3, 
              color: "#1e293b",
              fontSize: { xs: "1.75rem", md: "2rem" }
            }}
          >
            超好笑的拉!!!
          </Typography>
          
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              bgcolor: "#f8fafc",
              border: "1px dashed rgba(0,0,0,0.1)",
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                color: "#475569", 
                lineHeight: 1.8,
                '& br': {
                  display: 'block',
                  content: '""',
                  marginBottom: '0.5em',
                },
              }}
            >
              1. 草跟蛋誰比較高？：『蛋比較高，因為草莓蛋糕』 <br />
              2. 蛤蜊擺久了會變什麼？：『白酒蛤蜊』 <br />
              3. 為什麼螃蟹明明沒有感冒卻一直咳嗽？： 『因為牠是甲殼(假咳)類動物』
              <br />
              4. 白氣球揍了黑氣球一頓後，黑氣球很生氣，於是決定：『 告白氣球』
              <br />
              5. 為什麼暖暖包到現在還一堆人在用？ ：『因為他有鐵粉』
              <br />
              6. 警衛在笑什麼?： 『在校門口』 
              <br />
              7. 達文西密碼上面是什麼？：『達文西帳號』
              <br />
              8. 達文西密碼下面是什麼？：『忘記密碼』 
              <br />
              9. 老王姓什麼？：『法，法老王』
              <br />
              10. 冰塊最想做什麼事？：『退伍，因為他當冰（兵）當很久了』
              <br />
              11. 壞事一定要在中午做，為什麼？：『因為～早晚會有報應』
              <br />
              12. 為什麼蠶寶寶很有錢？：『因為牠會節儉（結繭）』
            </Typography>
          </Paper>
          
          {/* Enhanced image gallery */}
          <Box sx={{ mb: 3 }}>
            <ImageList
              variant="quilted"
              cols={3}
              gap={12}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {itemData.map((item) => (
                <ImageListItem 
                  key={item.img}
                  sx={{ 
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      "& img": {
                        transform: "scale(1.05)",
                      }
                    }
                  }}
                  onClick={() => handleImageClick(item.img)}
                >
                  <img
                    srcSet={item.img}
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      transition: "transform 0.5s",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Box>

        {/* Interaction section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            pt: 0,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title={isLiked ? "取消讚" : "讚"}>
              <IconButton
                sx={{ 
                  color: isLiked ? "#f43f5e" : "text.secondary",
                  bgcolor: isLiked ? "#fee2e2" : "transparent",
                  mr: 1,
                  "&:hover": {
                    bgcolor: isLiked ? "#fee2e2" : "rgba(0,0,0,0.04)",
                  },
                }}
                onClick={handleLikeClick}
              >
                {isLiked ? <Favorite /> : <FavoriteBorderOutlined />}
              </IconButton>
            </Tooltip>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 500,
                color: isLiked ? "#f43f5e" : "text.secondary",
                mr: 3,
              }}
            >
              {formatNumber(likeCount)}
            </Typography>
            
            <Tooltip title="查看評論">
              <Box 
                sx={{ 
                  display: "flex", 
                  alignItems: "center",
                  color: "text.secondary",
                }}
              >
                <ChatBubbleOutline sx={{ mr: 0.5, fontSize: 20 }} />
                <Typography variant="body2" fontWeight={500}>
                  {formatNumber(getTotalCommentCount())}
                </Typography>
              </Box>
            </Tooltip>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title={isBookmarked ? "取消收藏" : "收藏"}>
              <IconButton
                sx={{ 
                  color: isBookmarked ? accentColor : "text.secondary",
                  bgcolor: isBookmarked ? accentColorLight : "transparent",
                  "&:hover": {
                    bgcolor: isBookmarked ? accentColorLight : "rgba(0,0,0,0.04)",
                  },
                }}
                onClick={handleBookmarkClick}
              >
                {isBookmarked ? <Bookmark /> : <TurnedInNot />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="分享">
              <IconButton 
                onClick={handleShareClick}
                sx={{
                  color: shareOpen ? accentColor : "text.secondary",
                  bgcolor: shareOpen ? accentColorLight : "transparent",
                  ml: 1,
                  "&:hover": {
                    bgcolor: shareOpen ? accentColorLight : "rgba(0,0,0,0.04)",
                  },
                }}
              >
                <Share />
              </IconButton>
            </Tooltip>
            
            <Menu
              anchorEl={shareAnchorEl}
              open={shareOpen}
              onClose={handleShareClose}
              PaperProps={{
                sx: {
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }
              }}
            >
              <MenuItem onClick={handleShareClose}>
                <ContentCopy sx={{ mr: 1, fontSize: 18, color: "text.secondary" }} />
                複製連結
              </MenuItem>
              <MenuItem onClick={handleShareClose}>
                <Facebook sx={{ mr: 1, fontSize: 18, color: "#1877f2" }} />
                Facebook
              </MenuItem>
              <MenuItem onClick={handleShareClose}>
                <Twitter sx={{ mr: 1, fontSize: 18, color: "#1da1f2" }} />
                Twitter
              </MenuItem>
              <MenuItem onClick={handleShareClose}>
                <Instagram sx={{ mr: 1, fontSize: 18, color: "#e4405f" }} />
                Instagram
              </MenuItem>
              <MenuItem onClick={handleShareClose}>
                <WhatsApp sx={{ mr: 1, fontSize: 18, color: "#25d366" }} />
                LINE
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Card>

      {/* Comment section */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          p: 3,
          mb: 4,
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3, 
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            color: "#1e293b"
          }}
        >
          <ChatBubbleOutline sx={{ mr: 1, color: accentColor }} />
          留言區 ({getTotalCommentCount()})
        </Typography>

        {/* Comment input */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 2,
            border: "1px solid rgba(0,0,0,0.1)",
            bgcolor: "#f8fafc",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Avatar 
              sx={{ 
                mr: 2, 
                bgcolor: getRandomColor("訪客用戶"),
                fontWeight: 600,
              }}
            >
              訪
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="留下您的評論..."
                multiline
                rows={2}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                sx={{ 
                  mb: 1.5,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "white",
                  }
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex" }}>
                  <Tooltip title="添加表情">
                    <IconButton size="small" sx={{ color: "text.secondary" }}>
                      <EmojiEmotions />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="添加圖片">
                    <IconButton size="small" sx={{ color: "text.secondary" }}>
                      <ImageIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="添加連結">
                    <IconButton size="small" sx={{ color: "text.secondary" }}>
                      <InsertLink />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Button
                  variant="contained"
                  endIcon={<Send />}
                  onClick={handleCommentSubmit}
                  disabled={!commentText.trim()}
                  sx={{
                    borderRadius: 6,
                    px: 3,
                    bgcolor: accentColor,
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "0 4px 14px rgba(14, 165, 233, 0.3)",
                    "&:hover": {
                      bgcolor: accentColorDark,
                    },
                    "&:disabled": {
                      bgcolor: "rgba(0,0,0,0.12)",
                      color: "rgba(0,0,0,0.26)",
                    }
                  }}
                >
                  發佈
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Comment list */}
        {mounted && comments.map((comment) => (
          <Paper
            key={comment.id}
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              border: "1px solid rgba(0,0,0,0.06)",
              transition: "all 0.2s",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                borderColor: "rgba(0,0,0,0.12)",
              }
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Avatar
                sx={{ 
                  mr: 2, 
                  bgcolor: getRandomColor(comment.author),
                  fontWeight: 600,
                }}
              >
                {comment.avatar}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 600,
                      color: "#1e293b", 
                    }}
                  >
                    {comment.author}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box 
                      sx={{ 
                        display: "flex", 
                        alignItems: "center",
                        color: "text.secondary",
                        fontSize: "0.75rem",
                        mr: 1,
                      }}
                    >
                      <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                      {comment.timestamp}
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => handleCommentMenuOpen(e, comment.id)}
                      sx={{ color: "text.secondary" }}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mt: 0.5, 
                    mb: 1.5,
                    color: "#475569",
                    lineHeight: 1.6,
                  }}
                >
                  {comment.content}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box 
                    sx={{ 
                      display: "flex", 
                      alignItems: "center",
                      color: comment.isLiked ? "#f43f5e" : "text.secondary",
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 0.8,
                      }
                    }}
                    onClick={() => handleCommentLike(comment.id)}
                  >
                    {comment.isLiked ? (
                      <Favorite sx={{ fontSize: 16, mr: 0.5 }} />
                    ) : (
                      <FavoriteBorderOutlined sx={{ fontSize: 16, mr: 0.5 }} />
                    )}
                    <Typography 
                      variant="caption" 
                      fontWeight={500} 
                      sx={{ 
                        color: comment.isLiked ? "#f43f5e" : "inherit"
                      }}
                    >
                      {comment.likes}
                    </Typography>
                  </Box>
                  
                  {/* Reply button */}
                  <Box 
                    sx={{ 
                      display: "flex", 
                      alignItems: "center",
                      color: activeReplyId === comment.id ? accentColor : "text.secondary",
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 0.8,
                        color: accentColor,
                      }
                    }}
                    onClick={() => handleStartReply(comment.id)}
                  >
                    <Reply sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography 
                      variant="caption" 
                      fontWeight={500}
                      sx={{
                        color: activeReplyId === comment.id ? accentColor : "inherit",
                      }}
                    >
                      回覆
                    </Typography>
                  </Box>
                  
                  {/* Show reply count and toggle expand/collapse */}
                  {comment.replies && comment.replies.length > 0 && (
                    <Box 
                      sx={{ 
                        display: "flex", 
                        alignItems: "center",
                        color: "text.secondary",
                        cursor: "pointer",
                        ml: "auto",
                        "&:hover": {
                          color: accentColor,
                        }
                      }}
                      onClick={() => toggleReplies(comment.id)}
                    >
                      <Typography variant="caption" fontWeight={500}>
                        {expandedComments.includes(comment.id) ? "收合" : "顯示"} {comment.replies.length} 則回覆
                      </Typography>
                      {expandedComments.includes(comment.id) ? (
                        <ExpandLess sx={{ fontSize: 16, ml: 0.5 }} />
                      ) : (
                        <ExpandMore sx={{ fontSize: 16, ml: 0.5 }} />
                      )}
                    </Box>
                  )}
                </Box>
                
                {/* Reply input box */}
                <Collapse in={activeReplyId === comment.id}>
                  <Box 
                    sx={{ 
                      mt: 2,
                      display: "flex",
                      borderLeft: `2px solid ${accentColorLight}`,
                      pl: 2,
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        mr: 1.5, 
                        width: 32, 
                        height: 32,
                        bgcolor: getRandomColor("訪客用戶"),
                        fontSize: "0.8rem",
                        fontWeight: 600,
                      }}
                    >
                      訪
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder={`回覆 ${comment.author}...`}
                        multiline
                        rows={1}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        autoFocus
                        sx={{ 
                          mb: 1,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            fontSize: "0.875rem",
                          }
                        }}
                      />
                      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                        <Button
                          variant="outlined"
                          startIcon={<Cancel />}
                          onClick={handleCancelReply}
                          sx={{
                            borderRadius: 6,
                            borderColor: "rgba(0,0,0,0.2)",
                            color: "text.secondary",
                            textTransform: "none",
                            fontWeight: 500,
                            "&:hover": {
                              borderColor: "rgba(0,0,0,0.3)",
                              bgcolor: "rgba(0,0,0,0.02)",
                            }
                          }}
                        >
                          取消
                        </Button>
                        <Button
                          variant="contained"
                          endIcon={<Send />}
                          onClick={() => handleReplySubmit(comment.id)}
                          disabled={!replyText.trim()}
                          sx={{
                            borderRadius: 6,
                            bgcolor: accentColor,
                            textTransform: "none",
                            fontWeight: 600,
                            boxShadow: "0 4px 14px rgba(14, 165, 233, 0.3)",
                            "&:hover": {
                              bgcolor: accentColorDark,
                            },
                          }}
                        >
                          回覆
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Collapse>
                
                {/* Reply list */}
                <Collapse in={expandedComments.includes(comment.id)}>
                  <Box 
                    sx={{ 
                      mt: 2,
                      pl: 1,
                      borderLeft: `2px solid ${accentColorLight}`,
                    }}
                  >
                    {comment.replies?.map((reply) => (
                      <Box 
                        key={reply.id} 
                        sx={{ 
                          mt: 2,
                          display: "flex",
                        }}
                      >
                        <Avatar
                          sx={{ 
                            mr: 1.5, 
                            width: 28, 
                            height: 28,
                            bgcolor: getRandomColor(reply.author),
                            fontSize: "0.7rem",
                            fontWeight: 600,
                          }}
                        >
                          {reply.avatar}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography 
                              variant="subtitle2" 
                              sx={{ 
                                fontWeight: 600,
                                color: "#1e293b",
                                fontSize: "0.85rem", 
                              }}
                            >
                              {reply.author}
                            </Typography>
                            <Box 
                              sx={{ 
                                display: "flex", 
                                alignItems: "center",
                                color: "text.secondary",
                                fontSize: "0.7rem",
                              }}
                            >
                              <AccessTime sx={{ fontSize: 12, mr: 0.5 }} />
                              {reply.timestamp}
                            </Box>
                          </Box>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              mt: 0.5, 
                              mb: 1,
                              color: "#475569",
                              lineHeight: 1.5,
                              fontSize: "0.85rem",
                            }}
                          >
                            {reply.content}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box 
                              sx={{ 
                                display: "flex", 
                                alignItems: "center",
                                color: reply.isLiked ? "#f43f5e" : "text.secondary",
                                cursor: "pointer",
                                "&:hover": {
                                  opacity: 0.8,
                                },
                                fontSize: "0.75rem",
                              }}
                              onClick={() => handleReplyLike(comment.id, reply.id)}
                            >
                              {reply.isLiked ? (
                                <Favorite sx={{ fontSize: 14, mr: 0.5 }} />
                              ) : (
                                <FavoriteBorderOutlined sx={{ fontSize: 14, mr: 0.5 }} />
                              )}
                              <Typography 
                                variant="caption" 
                                fontWeight={500} 
                                sx={{ 
                                  color: reply.isLiked ? "#f43f5e" : "inherit",
                                  fontSize: "0.75rem",
                                }}
                              >
                                {reply.likes}
                              </Typography>
                            </Box>
                            
                            <Box 
                              sx={{ 
                                display: "flex", 
                                alignItems: "center",
                                color: "text.secondary",
                                cursor: "pointer",
                                "&:hover": {
                                  opacity: 0.8,
                                  color: accentColor,
                                },
                                fontSize: "0.75rem",
                              }}
                              onClick={() => handleStartReply(comment.id)}
                            >
                              <Reply sx={{ fontSize: 14, mr: 0.5 }} />
                              <Typography 
                                variant="caption" 
                                fontWeight={500}
                                sx={{
                                  fontSize: "0.75rem",
                                }}
                              >
                                回覆
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              </Box>
            </Box>
          </Paper>
        ))}
      </Card>

      {/* Comment menu */}
      <Menu
        anchorEl={commentMenuAnchorEl}
        open={commentMenuOpen}
        onClose={handleCommentMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }
        }}
      >
        <MenuItem 
          onClick={() => {
            handleCommentMenuClose();
            if (activeCommentId) {
              handleStartReply(activeCommentId);
            }
          }}
        >
          <Reply sx={{ mr: 1, fontSize: 18, color: "text.secondary" }} />
          回覆
        </MenuItem>
        <MenuItem onClick={handleCommentMenuClose}>
          <Flag sx={{ mr: 1, fontSize: 18, color: "#f43f5e" }} />
          檢舉
        </MenuItem>
      </Menu>

      {/* Image view modal */}
      <Modal
        open={imageModalOpen}
        onClose={handleImageModalClose}
        closeAfterTransition
        slots={{
          backdrop: Backdrop,
        }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            }
          },
        }}
      >
        <Fade in={imageModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "900px",
              maxHeight: "90vh",
              outline: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={handleImageModalClose}
              sx={{
                position: "absolute",
                top: -50,
                right: 0,
                color: "white",
                bgcolor: "rgba(0, 0, 0, 0.5)",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.7)",
                },
                zIndex: 10,
              }}
            >
              <Close />
            </IconButton>
            
            <Box
              component="img"
              src={selectedImage}
              alt="Enlarged view"
              sx={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: 2,
              }}
            />
          </Box>
        </Fade>
      </Modal>
    </Layout>
  );
}