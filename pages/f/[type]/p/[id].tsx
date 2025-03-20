import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import {
  Button,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  Bookmark,
  Favorite,
  FavoriteBorderOutlined,
  MoreVert,
  Send,
  Share,
  TurnedInNot,
} from "@mui/icons-material";

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

// 範例留言資料
const sampleComments = [
  {
    id: 1,
    author: "陳小華",
    avatar: "陳",
    content: "哈哈哈，第五個笑死我啦！鐵粉那個太好笑了！",
    timestamp: "30分鐘前",
    likes: 15,
    isLiked: false,
  },
  {
    id: 2,
    author: "林大偉",
    avatar: "林",
    content: "我最喜歡第七個，冰塊那個冷笑話真的很「冷」！",
    timestamp: "1小時前",
    likes: 8,
    isLiked: false,
  },
  {
    id: 3,
    author: "張美玲",
    avatar: "張",
    content: "告白氣球那個也太有創意了，笑到肚子痛XD",
    timestamp: "2小時前",
    likes: 23,
    isLiked: false,
  },
];

export default function Post() {
  // 互動狀態管理
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(87);
  const [isBookmarked, setIsBookmarked] = useState(false);
  // 分享選單狀態
  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null);
  const shareOpen = Boolean(shareAnchorEl);

  // 處理按讚事件
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  // 處理收藏事件
  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  // 處理分享按鈕點擊
  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    setShareAnchorEl(event.currentTarget);
  };

  // 關閉分享選單
  const handleShareClose = () => {
    setShareAnchorEl(null);
  };

  // 評論相關狀態
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(sampleComments);
  const [commentMenuAnchorEl, setCommentMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const commentMenuOpen = Boolean(commentMenuAnchorEl);

  // 處理留言提交
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: "訪客用戶",
        avatar: "訪",
        content: commentText,
        timestamp: "剛剛",
        likes: 0,
        isLiked: false,
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };

  // 處理留言按讚
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

  // 打開評論選單
  const handleCommentMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCommentMenuAnchorEl(event.currentTarget);
  };

  // 關閉評論選單
  const handleCommentMenuClose = () => {
    setCommentMenuAnchorEl(null);
  };

  return (
    <Layout>
      {/* Hero section */}
      <Box
        sx={{
          width: "100%",
          mb: 4,
          p: 4,
          borderRadius: 2,
          background: "#fff",
          border: "1px solid rgba(25,118,210,0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Chip
            size="small"
            label={"搞笑版"}
            sx={{
              backgroundColor: "rgba(25,118,210,0.1)",
              color: "#1976d2",
              fontWeight: 500,
              borderRadius: 1,
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {"2022/1/1"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
          <Avatar
            sx={{
              width: 28,
              height: 28,
              bgcolor: "primary.main",
              fontSize: "0.8rem",
              mr: 1,
            }}
          >
            {"王"}
          </Avatar>
          <Typography variant="body1" color="text.primary">
            {"王小明"}
          </Typography>
        </Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 600, mb: 3, color: "#263238" }}
        >
          超好笑的拉!!!
        </Typography>
        <Typography variant="body1" sx={{ color: "#546e7a", mb: 3 }}>
          1. 草跟蛋誰比較高？：『蛋比較高，因為草莓蛋糕』 <br />
          2. 蛤蜊擺久了會變什麼？：『白酒蛤蜊』 <br />
          3. 為什麼螃蟹明明沒有感冒卻一直咳嗽？： 『因為牠是甲殼(假咳)類動物』
          <br />
          4. 白氣球揍了黑氣球一頓後，黑氣球很生氣，於是決定：『 告白氣球』
          <br />
          5. 為什麼暖暖包到現在還一堆人在用？ ：『因為他有鐵粉』
          <br />
          6. 警衛在笑什麼?： 『在校門口』 達文西密碼上面是什麼？：『達文西帳號』
          <br />
          7. 達文西密碼下面是什麼？：『忘記密碼』 老王姓什麼？：【法，法老王】
          <br />
          8. 冰塊最想做什麼事？：【退伍，因為他當冰（兵）當很久了】
          <br />
          9. 壞事一定要在中午做，為什麼？：【因為～早晚會有報應】
          <br />
          10. 為什麼蠶寶寶很有錢？：【因為牠會節儉（結繭）】
          <br />
          11. 什麼帽子流行又性感？：【流行性感冒（帽）】
          <br />
          12. 有一天小明走著進超商，坐著輪椅出來，知道為什麼嗎？【因為他繳費了】
        </Typography>
        <ImageList>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={item.img}
                src={item.img}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      {/* 新增按讚分享收藏區 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
          pt: 2,
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
            <IconButton
              color={isLiked ? "primary" : "default"}
              onClick={handleLikeClick}
            >
              {isLiked ? <Favorite /> : <FavoriteBorderOutlined />}
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {likeCount}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color={isBookmarked ? "primary" : "default"}
            onClick={handleBookmarkClick}
          >
            {isBookmarked ? <Bookmark /> : <TurnedInNot />}
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleShareClick}>
              <Share />
            </IconButton>
            <Menu
              anchorEl={shareAnchorEl}
              open={shareOpen}
              onClose={handleShareClose}
            >
              <MenuItem onClick={handleShareClose}>複製連結</MenuItem>
              <MenuItem onClick={handleShareClose}>Facebook</MenuItem>
              <MenuItem onClick={handleShareClose}>LINE</MenuItem>
              <MenuItem onClick={handleShareClose}>Twitter</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>

      {/* 留言區 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          留言區 ({comments.length})
        </Typography>

        {/* 輸入留言 */}
        <Box sx={{ display: "flex", mb: 4 }}>
          <Avatar sx={{ mr: 2, bgcolor: "grey.300" }}>訪</Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="留下您的評論..."
              multiline
              rows={2}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                endIcon={<Send />}
                onClick={handleCommentSubmit}
                disabled={!commentText.trim()}
              >
                發佈
              </Button>
            </Box>
          </Box>
        </Box>

        {/* 留言列表 */}
        <Divider sx={{ mb: 3 }} />
        {comments.map((comment) => (
          <Box key={comment.id} sx={{ mb: 3 }}>
            <Box sx={{ display: "flex" }}>
              <Avatar
                sx={{ mr: 2, bgcolor: "primary.main", fontSize: "0.8rem" }}
              >
                {comment.avatar}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {comment.author}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mr: 1 }}
                    >
                      {comment.timestamp}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => handleCommentMenuOpen(e)}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ mt: 0.5, mb: 1 }}>
                  {comment.content}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    size="small"
                    color={comment.isLiked ? "primary" : "default"}
                    onClick={() => handleCommentLike(comment.id)}
                  >
                    {comment.isLiked ? (
                      <Favorite fontSize="small" />
                    ) : (
                      <FavoriteBorderOutlined fontSize="small" />
                    )}
                  </IconButton>
                  <Typography variant="caption" color="text.secondary">
                    {comment.likes}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* 評論選單 */}
      <Menu
        anchorEl={commentMenuAnchorEl}
        open={commentMenuOpen}
        onClose={handleCommentMenuClose}
      >
        <MenuItem onClick={handleCommentMenuClose}>回覆</MenuItem>
        <MenuItem onClick={handleCommentMenuClose}>檢舉</MenuItem>
      </Menu>
    </Layout>
  );
}
