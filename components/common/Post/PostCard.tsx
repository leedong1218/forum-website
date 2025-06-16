import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  TurnedInNot,
  AccessTime,
} from "@mui/icons-material";
import { PostType } from "@/lib/types/postListType";

interface PostCardProps {
  post: PostType;
  getCategoryColor: (category: string) => { bg: string; text: string };
}

// 工具函式：移除 HTML + 限制長度
const getTextPreview = (html: string, maxLength = 60): string => {
  const text = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const PostCard: React.FC<PostCardProps> = ({ post, getCategoryColor }) => {
  const categoryColor = getCategoryColor(post.boardUrl);
  const preview = getTextPreview(post.content);

  return (
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
        component={Link}
        href={`/forum/${post.boardUrl}/post/${post.id}`}
        sx={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <CardContent
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            "&:last-child": { pb: 3 },
          }}
        >
          {/* 分類 + 時間 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
        <Chip
          {...(post.boardAvatar
            ? { avatar: <Avatar src={post.boardAvatar} /> }
            : {})}
          size="small"
          label={post.boardName}
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
              }}
            >
              <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
              {new Date(post.createdAt).toLocaleDateString()}
            </Box>
          </Box>

          {/* 作者 */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
            <Avatar
              src={post.authorAvatar || undefined}
              sx={{
                width: 25,
                height: 25,
                bgcolor: categoryColor.text,
                fontSize: "0.8rem",
                mr: 0.5,
                fontWeight: 600,
              }}
            >
              {!post.authorAvatar && post.authorName?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: "text.primary" }}
            >
              {post.authorName}
            </Typography>
          </Box>

          {/* 標題 */}
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

          {/* 摘要內容 */}
          <Typography
            variant="body2"
            sx={{
              mb: 2,
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
            {preview}
          </Typography>

          {/* 底部統計數據 */}
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
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "text.secondary",
                  fontSize: "0.75rem",
                }}
              >
                <FavoriteBorder sx={{ fontSize: 16, mr: 0.5 }} />
                {post.likesCount ?? 0}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "text.secondary",
                  fontSize: "0.75rem",
                }}
              >
                <ChatBubbleOutline sx={{ fontSize: 16, mr: 0.5 }} />
                {post.commentsCount ?? 0}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "text.secondary",
                  fontSize: "0.75rem",
                }}
              >
                <TurnedInNot sx={{ fontSize: 16, mr: 0.5 }} />
                {post.bookmarksCount ?? 0}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PostCard;
